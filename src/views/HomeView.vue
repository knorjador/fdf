
<script setup lang="ts">

import { ref } from 'vue';
import { useApiStore } from '@/stores/api'

import FloatLabel from 'primevue/floatlabel'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'

import { CONFIG } from '../config';
import Overlay from '../components/Overlay.vue'
import DataTable from '../components/DataTable.vue'

const 
    siret = ref(''),
    overlay = ref(false),
    loading = ref(false),
    fail = ref('')

const processAdd = async () => {
    if (!isValidSiret())
        return fail.value = 'N° SIRET incorrect'

    overlay.value = true

    setTimeout(() => overlay.value = false, 2600)

    // add send email && siret
    
    const { apiStates, up } = useApiStore()

    await up()

    console.log('---- processAdd ----')
    console.log(apiStates.up)
    console.log('---- processAdd ----')
}

const isValidSiret = () => CONFIG.REGEXES.siret.test(siret.value) 

const clearFail = () => fail.value = ''

</script>

<template>
    <Overlay v-model:visible="overlay" />

    <div class="add-form">
        <form 
            @submit.prevent="processAdd"
        >
            <div class="c-field">
                <FloatLabel class="c-float-label">
                    <label for="siret">
                        N° SIRET
                    </label>
                    <InputText 
                        v-model="siret"
                        type="text"
                        id="siret" 
                        class="c-input"
                        required
                        v-tooltip.top="{
                            value: '14 chiffres, ex : 82178322200044',
                            class: 'c-tooltip-siret'
                        }"
                        @focus="clearFail"
                    />
                </FloatLabel>
                <Button
                    type="submit"
                    icon="pi pi-plus"
                    class="p-button c-button-add"
                    :disabled="loading"
                />
            </div>

            <div class="c-wrapper-fail">
                <p v-if="fail" class="c-fail">
                    <i class="pi pi-times-circle"></i>
                    <span>
                        {{ fail }}
                    </span>
                </p>
            </div>
        </form>
    </div>

    <DataTable />

</template>
    
<style scoped>

.add-form {
    position: relative;
    max-width: 400px;
    margin: auto;
    padding: 1rem;
}

.c-field {
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 1rem 0;
}

.c-float-label {
    width: 70%;
    padding: 0.5rem;
    border-radius: 0.25rem;
    border: 1px solid #e2e8f0;
    color: var(--normal-text);
}

.c-input {
    width: 100%;
}

.c-button-add {
    background: var(--white);
    border: 1px solid var(--secondary-color);
    color: var(--normal-text);
    font-weight: bold;
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
}

.c-button-add:hover {
    background: var(--secondary-color) !important;
    border: 1px solid var(--secondary-color) !important;
    color: var(--white) !important;
}

.c-wrapper-fail {
    width: 100%;
    display: flex;
    justify-content: center;
}

.c-fail {
    position: absolute;
    width: 100%;
    text-align: center;
    font-weight: bold;
    color: lightcoral;
}
  
.c-fail > span {
    margin-left: 5px;
}

</style>
  