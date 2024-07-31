
import { CONFIG } from '@/config'
import type { PerformRequestResponse, RequestOptions } from '@/types'

const performRequest = async (options: RequestOptions = {}): Promise<PerformRequestResponse> => {
    const defaultOptions: RequestOptions = {
        host: CONFIG.API,
        path: 'up',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        data: {}
    }

    options = { ...defaultOptions, ...options }
    options.method = options.method?.toUpperCase()

    try {
        const request = await fetch(`${options.host}/${options.path}`, {
            method: options.method,
            headers: options.headers,
            ...((options.method === 'POST' || options.method === 'PUT') && { body: JSON.stringify(options.data) }),
            credentials: 'include'
        })

        if (request.ok) {
            const { response } = await request.json()

            return {
                success: true,
                response
            }
        } else {
            if (request.status === 401) 
                location.reload()
        }

        return { success: false }
    } catch (fail) {
        return { success: false }
    }
}

export default performRequest