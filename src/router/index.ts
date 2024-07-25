
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

	const 
		authStore = useAuthStore(),
		isAuthenticated = await authStore.checkAuth()

	console.log('---- beforeEach ----')
	console.log(isAuthenticated)
	console.log('---- beforeEach ----')
	
	if (to.meta.requiresAuth && !isAuthenticated) {
	  	next('/login')
	} else if (isAuthenticated && (to.path === '/' || to.path === '/login')) {
	  	next('/home')
	} else {
	  	next()
	}
})

// router.beforeEach((to, from, next) => {
// 	const token = localStorage.getItem('bearer')

// 	if (to.meta.requiresAuth && !token) {
// 	  	next('/login')
// 	} else if (token && (to.path === '/' || to.path === '/login')) {
// 	  	next('/home')
// 	} else {
// 	  	next()
// 	}
// })

export default router
