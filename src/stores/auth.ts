
import { ref } from 'vue'
import { defineStore } from 'pinia'
import { CONFIG } from '@/config'
import type { AuthStoreState, RequestOptions } from '@/types';
import performRequest from '@/utils/http';

export const useAuthStore = defineStore('auth_store', () => {
    const authStates: AuthStoreState = {
        authenticated: ref(false),
        email: ref('')
    }

    const processResquest = async (options: RequestOptions) => {
        options.host = CONFIG.AUTH

        const { success, response } = await performRequest(options)

        console.log('---- processResquest AUTH ----')
        console.log('sucess', success)
        console.log(response)
        console.log('---- processResquest AUTH ----')

        if (success)
            for (const property in response) 
                if (property in authStates)
                    authStates[property].value = response[property]

        return success
    }

    const check = async () => await processResquest({
        path: 'check'
    })
      
    const login = async (email: string) => await processResquest({
        path: 'login',
        data : {
            email 
        }
    })

    const logout = async () => await processResquest({
        path: 'logout'
    })

    return { authStates, check, login, logout }
})
