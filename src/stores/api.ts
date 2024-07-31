
import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { ApiStoreState, RequestOptions, Company, Payload } from '@/types';
import performRequest from '@/utils/http';

export const useApiStore = defineStore('api_store', () => {
    const apiStates: ApiStoreState = {
        up: ref(false),
        fail: ref(false),
        redirect: ref(false),
        companies: ref([]),
        payload: ref<Payload>({}),
        status: ref('up')
    }

    const processResquest = async (options: RequestOptions) => {
        const up = await performRequest()

        if (up) {
            const { success, response } = await performRequest(options)
    
            if (success)
                for (const property in response) 
                    if (property in apiStates)
                        apiStates[property].value = response[property]

            if (apiStates.redirect.value === true)
                return location.reload()
    
            return success
        }

        apiStates.status.value = 'down'
    }

    const create = async (siret: string) => await processResquest({ 
        path: 'create',
        data: {
            siret 
        }
    })

    const read = async () => await processResquest({ 
        path: 'read',
        method: 'GET'
    })

    const update = async (data: Company) => await processResquest({ 
        path: 'update',
        method: 'PUT',
        data
    })

    const delete_ = async (siret: string) => await processResquest({ 
        path: `delete/${siret}`,
        method: 'DELETE'
    })

    return { apiStates, create, read, update, delete_ }
})

