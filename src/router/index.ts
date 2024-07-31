
import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import WelcomeView from '@/views/WelcomeView.vue'
import LoginView from '@/views/LoginView.vue'
import HomeView from '@/views/HomeView.vue'
import NotFound from '@/views/404View.vue'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'welcome',
			component: WelcomeView
		},
		{
			path: '/login',
			name: 'login',
			component: LoginView
		},
		{
			path: '/home',
			name: 'home',
			component: HomeView,
			meta: { requiresAuth: true }
		},
		{
			path: '/:pathMatch(.*)*',
			name: '404View',
			component: NotFound,
			meta: { goBack: true }
		}
	]
})

router.beforeEach(async (to, from, next) => {
	const { authStates, check } = useAuthStore()
		
	await check()

	const authenticated = authStates.authenticated
	
	if (to.meta.requiresAuth && !authenticated) {
	  	next('/login')
	} else if (authenticated && (to.path === '/' || to.path === '/login')) {
	  	next('/home')
	} else {
		console.log('---- from ----')
		console.log(from)
		console.log('---- from ----')
		next()
	}
})

export default router
