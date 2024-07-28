
import { ref } from 'vue'
import type { Ref } from 'vue'
import { defineStore } from 'pinia'
import { CONFIG } from '../config'

type ApiStoreState = {
    up: Ref<boolean>;
    [key: string]: Ref<any>;
}

export const useApiStore = defineStore('api', () => {
    const apiStates: ApiStoreState = {
        up: ref(false)
    }
      
    const performRequest = async (uri: string, data = {}) => {

        try {
            const request = await fetch(`${CONFIG.API}/${uri}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(data)
            })

            console.log(request)

            if (request.ok) {
                const response = await request.json()

                console.log(response)

                for (const property in response) 
                    // if (property in apiStates)
                    apiStates[property].value = response[property]

                return true
            }

            return false
        } catch (fail) {
            console.log(fail)

            return false
        }
    }

    const up = async () => await performRequest('up')

    const add = async () => await performRequest('add', { siret: '' })

    return { apiStates, up, add }
})
