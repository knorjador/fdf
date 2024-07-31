
<script setup lang="ts">

import { ref, onMounted } from 'vue'
import { useToast } from 'primevue/usetoast'
import Toast from 'primevue/toast';

import FloatLabel from 'primevue/floatlabel'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'

import type { Company } from '@/types'
import { useApiStore } from '@/stores/api'
import { isValidSiret, formatDetail } from '@/utils/helpers'
import Overlay from '@/components/Overlay.vue'
import Loading from '@/components/Loading.vue'
import DataTable from '@/components/DataTable.vue'

const 
    toast = useToast(),
    { apiStates, create, read } = useApiStore(),
    companies = ref<Company[]>([]),
    siret = ref(''),
    loading = ref(false),
    fail = ref('')

onMounted(async () => {
    await fetchCompanies()
})

const fetchCompanies = async () => {
    await read()

    companies.value = apiStates.companies
}

const processCreate = async () => {
    const _siret = siret.value.replace(/\s+/g, '')

    if (!isValidSiret(_siret))
        return fail.value = 'N° SIRET incorrect'

    loading.value = true

    setTimeout(async() => {        
        await create(_siret)

        const { severity, summary, detail } = apiStates.payload

        await fetchCompanies()

        loading.value = false

        console.log('severity', severity)
        console.log('summary', summary)
        console.log('detail', detail)

        toast.add({ 
            severity, 
            summary, 
            detail: formatDetail(detail), 
            closable: false,
            life: 4000
        })

        console.log('---- processCreate ----')
        console.log('siret', siret.value)
        console.log('payload', apiStates.payload)
        console.log('---- processCreate ----')

        siret.value = ''
    }, 800)
}

const clearFail = () => fail.value = ''

</script>

<template>
    <Overlay v-model:visible="loading" background="light">
        <Loading />
    </Overlay>

    <Toast />

    <div class="add-form">
        <form 
            @submit.prevent="processCreate"
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
                            value: '14 chiffres, ex : 12345678900001',
                            class: 'c-tooltip-siret'
                        }"
                        @focus="clearFail"
                    />
                </FloatLabel>
                <Button
                    type="submit"
                    icon="pi pi-plus"
                    class="p-button c-button-create"
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

    <DataTable 
        :companies="companies" 
        @refresh="fetchCompanies"
    />

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
    border: none;
}

.c-input {
    width: 100%;
    border: 1px solid var(--primary-color);
    color: var(--normal-text);
}

.c-button-create {
    margin-left: 10px;
    font-weight: bold;
    border-radius: 0.25rem;
    background: var(--white);
    color: var(--normal-text);
    border: 1px solid var(--primary-color);
}

.c-button-create:hover {
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
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    text-align: center;
    font-weight: bold;
    color: lightcoral;
}
  
.c-fail > span {
    margin-left: 5px;
}

</style>
  