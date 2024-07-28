
import { ref } from 'vue'
import type { Ref } from 'vue'
import { defineStore } from 'pinia'
import { CONFIG } from '../config'

type AuthStoreState = {
    authenticated: Ref<boolean>;
    email: Ref<string>;
    [key: string]: Ref<any>;
}

export const useAuthStore = defineStore('auth', () => {
    const authStates: AuthStoreState = {
        authenticated: ref(false),
        email: ref('')
    }
      
    const performRequest = async (uri: string, data = {}) => {

        console.log(CONFIG)

        try {
            const request = await fetch(`${CONFIG.AUTH}/${uri}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(data)
            })

            console.log(request)

            if (request.ok) {
                const { response } = await request.json()

                console.log(response)

                for (const property in response) 
                    if (property in authStates)
                        authStates[property].value = response[property]

                return true
            }

            return false
        } catch (fail) {
            console.log(fail)

            return false
        }
    }

    const login = async (email: string) => await performRequest('login', { email })

    const checkAuth = async () => await performRequest('check')

    const logout = async () => await performRequest('logout')

    return { authStates, login, checkAuth, logout }
})
