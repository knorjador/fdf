
import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
    const 
        isAuthenticated = ref(false),
        _email = ref('')

    const login = async (email: string) => {
        try {
            const request = await fetch(`https://fdb.iaio.fr/api/login`, {
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify({ email })
            })

            console.log(request)

            if (request.ok) {
                const { success } = await request.json()

                console.log(success)

                isAuthenticated.value = success

                return success
            }
            
            return false
        } catch (fail) {
            console.log(fail)

            return false
        }
    }

    const checkAuth = async () => {
        try {
            const request = await fetch('https://fdb.iaio.fr/api/check', {
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify({ })
            })

            console.log(request)

            if (request.ok) {
                const { success, email } = await request.json()

                console.log('---- checkAuth ----')
                console.log(success)
                console.log(email)
                console.log('---- checkAuth ----')

                isAuthenticated.value = success
                _email.value = email

                return success
            }
            
            return false
        } catch (fail) {
            console.log(fail)

            return false
        }
    }

    const logout = async () => {
        try {
            const request = await fetch('https://fdb.iaio.fr/api/logout', {
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify({ })
            })

            console.log(request)

            if (request.ok) {
                const { success} = await request.json()

                console.log('---- logout ----')
                console.log(success)
                console.log('---- logout ----')

                isAuthenticated.value = success

                return success
            }
            
            return false
        } catch (fail) {
            console.log(fail)

            return false
        }
    }

    return { isAuthenticated, _email, login, checkAuth, logout }
})
