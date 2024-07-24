
<script setup lang="ts">

import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import Menubar from 'primevue/menubar'
import Button from 'primevue/button'
import Panel from 'primevue/panel'

import AppName from './AppName.vue'

const 
    route = useRoute(),
    router = useRouter(),
    isLoginPage = computed(() => route.path === '/login')

const gotoLogin = () => {
    router.push('/login')
}

</script>

<template>

    <Menubar>
        <template #start>
            <AppName />
        </template>
         <template #end>
            <Button
                v-if="!isLoginPage" 
                label="Connexion"
                class="p-button p-button-login" 
                @click="gotoLogin"
            />
         </template>
     </Menubar>

 </template>

<style scoped>

.p-menubar {
    margin: 21px 64px;
}

.p-button-login {
    background: var(--white);
    border: 1px solid var(--secondary-color);
    color: var(--normal-text);
    font-weight: bold;
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
    transition: all 0.3s ease-in-out;
}

.p-button-login:hover {
    background: var(--secondary-color) !important;
    border: 1px solid var(--secondary-color) !important;
    color: var(--white) !important;
}

</style>
 