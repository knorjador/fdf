
import { createRouter, createWebHistory } from 'vue-router'

import { useAuthStore } from '@/stores/auth'

import WelcomeView from '../views/WelcomeView.vue'
import LoginView from '../views/LoginView.vue'
import HomeView from '../views/HomeView.vue'

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
	]

})

router.beforeEach(async (to, from, next) => {
	console.log(from)

	const { authStates, checkAuth } = useAuthStore()
		
	await checkAuth()

	const authenticated = authStates.authenticated

	console.log('---- beforeEach ----')
	console.log(authenticated)
	console.log('---- beforeEach ----')
	
	if (to.meta.requiresAuth && !authenticated) {
	  	next('/login')
	} else if (authenticated && (to.path === '/' || to.path === '/login')) {
	  	next('/home')
	} else {
	  	next()
	}
})

export default router
