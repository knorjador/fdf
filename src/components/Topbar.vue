
<script setup lang="ts">

import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

import Menubar from 'primevue/menubar'
import Button from 'primevue/button'

import AppName from './AppName.vue'

const 
    route = useRoute(),
    router = useRouter(),
    authStore = useAuthStore()

const gotoLogin = () => {
    router.push('/login')
}

const logout = async () => {
    const success = await authStore.logout()

    if (success)
        router.push('/')
}

</script>

<template>

    <Menubar>
        <template #start>
            <AppName />
        </template>
         <template #end>
            <span class="c-email">
                {{ authStore._email }}
            </span>
            <Button
                v-if="!authStore.isAuthenticated" 
                label="Connexion"
                class="p-button c-button-login" 
                @click="gotoLogin"
            />
            <Button
                v-else
                label="Déconnexion"
                class="p-button c-button-login"
                @click="logout"
            />
         </template>
     </Menubar>

 </template>

<style scoped>

.p-menubar {
    margin: 21px 64px;
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
        margin: 21px 16px;
    }
}

</style>
 