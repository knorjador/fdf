
<script setup lang="ts">

import { ref } from 'vue';

import FloatLabel from 'primevue/floatlabel'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'

import Loading from '../components/Loading.vue'

const 
    email = ref(null),
    fail = ref(''),
    loading = ref(false)

const processLogin = async () => {
    console.log('login')

    loading.value = true

    setTimeout(() => {
        
        loading.value = false
        fail.value = 'Email incorrect'
    
    }, 3000)
}

const clearFail = () => fail.value = ''

</script>

<template>
    <div class="login-form">
        <form 
            v-if="!loading"
            @submit.prevent="processLogin"
        >

            <!-- EMAIL -->
            <div class="c-field">
                <FloatLabel class="c-float-label">
                    <label for="email">Email</label>
                    <InputText 
                        v-model="email" 
                        type="email"
                        id="email"
                        class="c-input"
                        required
                        @focus="clearFail"
                    />
                </FloatLabel>
            </div>

            <p v-if="fail" class="c-fail">
                <i class="pi pi-times-circle"></i>
                <span>
                    {{ fail }}
                </span>
            </p>

            <!-- SUBMIT -->
            <div class="c-field">
                <Button
                    type="submit"
                    label="Me connecter"
                    class="p-button c-button-login"
                    :disabled="loading"
                />
            </div>
        </form>
        <Loading v-else />
    </div>
</template>
    
<style scoped>

.login-form {
    max-width: 400px;
    margin: auto;
    padding: 1rem;
}

.c-field {
    width: 100%;
    display: flex;
    justify-content: center;
    margin: 2rem 0;
}

.c-float-label {
    width: 80%;
    padding: 0.5rem;
    border-radius: 0.25rem;
    border: 2px solid var(--primary-color);
    color: var(--normal-text)
}

.c-input {
    width: 100%;
}

.c-button-login {
    background: var(--secondary-color);
    border: 1px solid var(--secondary-color);
    color: var(--white);
    font-weight: bold;
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
    transition: all 0.3s ease-in-out;
}

.c-button-login:hover {
    background: var(--white) !important;
    border: 1px solid var(--secondary-color) !important;
    color: var(--normal-text) !important;
}

.c-fail {
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    color: lightcoral;
}
  
.c-fail > span {
    margin-left: 5px;
}

</style>
  