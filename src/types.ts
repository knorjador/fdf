
import type { Ref } from 'vue'

// ---- STORES ----
export type AuthStoreState = {
    authenticated: Ref<boolean>
    email: Ref<string>
    [key: string]: Ref<any>
}

export type ApiStoreState = {
    up: Ref<boolean>
    fail: Ref<boolean>
    redirect: Ref<boolean>
    companies: Ref<Company[]>
    payload: Ref<Payload>
    status: Ref<string>
    [key: string]: Ref<any>
}

// ---- API ----
export interface PerformRequestResponse {
    success: boolean;
    response?: any;
}

export interface RequestOptions {
    host?: string
    path?: string
    method?: string
    headers?: Record<string, string>
    data?: object
}

export interface Company {
    siret: string
    name: string
    address: string
    siren: string
    tva: string
}

export type Severity = 'warn' | 'success' | 'info' | 'error' | 'secondary' | 'contrast'

export interface Payload {
    severity?: Severity
    summary?: string
    detail?: string
}