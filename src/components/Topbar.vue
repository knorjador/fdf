
<script setup lang="ts">

import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

import Menubar from 'primevue/menubar'
import Button from 'primevue/button'

import AppName from './AppName.vue'

const 
    router = useRouter(),
    { authStates, logout } = useAuthStore()

const gotoLogin = () => {
    router.push('/login')
}

const processLogout = async () => {
    const success = await logout()

    if (success) {
        authStates.email = ''
        router.push('/')
    }
}

</script>

<template>

    <Menubar>
        <template #start>
            <AppName />
        </template>
         <template #end>
            <span class="c-email">
                {{ authStates.email }}
            </span>
            <Button
                v-if="!authStates.authenticated" 
                label="Connexion"
                class="p-button c-button-login" 
                @click="gotoLogin"
            />
            <Button
                v-else
                label="Déconnexion"
                class="p-button c-button-login"
                @click="processLogout"
            />
         </template>
     </Menubar>

 </template>

<style scoped>

.p-menubar {
    padding: 21px 64px;
}

.c-email {
    margin-right: 10px;
    font-size: 0.8rem;
    color: var(--normal-text);
}

.c-button-login {
    background: var(--white);
    border: 1px solid var(--secondary-color);
    color: var(--normal-text);
    font-weight: bold;
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
    transition: all 0.3s ease-in-out;
}

.c-button-login:hover {
    background: var(--secondary-color) !important;
    border: 1px solid var(--secondary-color) !important;
    color: var(--white) !important;
}

@media (max-width: 768px) {
    .p-menubar {
        padding: 21px 16px;
    }
}

</style>
 