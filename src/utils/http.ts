
import { CONFIG } from '@/config'
import type { RequestOptions } from '@/types'

const performRequest = async (options: RequestOptions = {}) => {
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

    console.log('---- performRequest RequestOptions ----')
    console.log('options', options)
    console.log('---- performRequest RequestOptions ----')

    try {
        const request = await fetch(`${options.host}/${options.path}`, {
            method: options.method,
            headers: options.headers,
            ...((options.method === 'POST' || options.method === 'PUT') && { body: JSON.stringify(options.data) }),
            credentials: 'include'
        })

        console.log(request)

        if (request.ok) {
            const { response } = await request.json()

            console.log(response)

            return {
                success: true,
                response
            }
        } else {
            if (request.status === 401) 
                return location.reload()
        }

        return { success: false }
    } catch (fail) {
        console.log(fail)

        return { success: false }
    }
}

export default performRequest