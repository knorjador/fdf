
<script setup lang="ts">

import { ref, defineProps, defineEmits, toRaw } from 'vue'
import { useToast } from 'primevue/usetoast'
import Toast from 'primevue/toast';

import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import FloatLabel from 'primevue/floatlabel'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import 'primeicons/primeicons.css'

import type { Company } from '@/types'
import { useApiStore } from '@/stores/api'
import { isModifiedCompany, isValidCompany, formatDetail } from '@/utils/helpers'
import Overlay from '@/components/Overlay.vue'
import Loading from '@/components/Loading.vue'

const TOAST_LIFE = 2600

const props = defineProps({
    companies: {
        type: Array as () => Company[],
        required: true
    }
})

const emit = defineEmits(['refresh'])

const columns = [
    { field: 'siret', header: 'Siret' },
    { field: 'name', header: 'Nom' },
    { field: 'address', header: 'Adresse' },
    { field: 'siren', header: 'Siren' },
    { field: 'tva', header: 'TVA' },
    { field: 'actions', sortable: false }
]

const 
    toast = useToast(),
    { apiStates, update, delete_ } = useApiStore(),
    editVisible = ref(false),
    deleteVisible = ref(false),
    loading = ref(false),
    toasting = ref(false),
    selected = ref<Company | null>(null),
    tmpCompany = ref<Company | null>(null)

const openEdit = (company: Company) => {
    selected.value = company
    tmpCompany.value = { ...company }
    editVisible.value = true
}

const openDelete = (company: Company) => {
    selected.value = company
    tmpCompany.value = { ...company }
    deleteVisible.value = true
}

const editCompany = async () => {
    if (toasting.value) return 

    if (selected.value && tmpCompany.value) {
        if (!isModifiedCompany(selected.value, tmpCompany.value)) {
            toasting.value = true

            setTimeout(() => toasting.value = false, TOAST_LIFE - 200)

            return toast.add({
                severity: 'info', 
                summary: 'Info', 
                detail : 'Aucune modfification apportée', 
                closable: false,
                life: TOAST_LIFE
            })
        }
            
        const validCompany = isValidCompany(tmpCompany.value)

        if (validCompany !== true) {
            return toast.add({
                severity: 'error', 
                summary: 'Erreur', 
                detail : validCompany, 
                closable: false,
                life: TOAST_LIFE
            })
        }

        loading.value = true

        await update(toRaw(tmpCompany.value))

        const { severity, summary, detail } = apiStates.payload

        loading.value = false

        if (severity)
            toast.add({
                severity, 
                summary, 
                detail: formatDetail(detail),
                closable: false,
                life: TOAST_LIFE
            })

        if (!apiStates.fail) {
            emit('refresh')

            editVisible.value = false
        }
    }
}

const deleteCompany = async () => {
    if (selected.value) {
        loading.value = true

        await delete_(selected.value.siret)

        const { severity, summary, detail } = apiStates.payload

        loading.value = false
        emit('refresh')
        deleteVisible.value = false

        if (severity)
            toast.add({ 
                severity, 
                summary, 
                detail: formatDetail(detail),
                closable: false,
                life: TOAST_LIFE
            })
    }
}

</script>

<template>
    <Overlay v-model:visible="loading" background="light">
        <Loading />
    </Overlay>

    <Toast />

    <div class="c-container">
        <DataTable
            :value="companies"
            stripedRows
            paginator
            :rows="5"
            :rowsPerPageOptions="[5, 10, 20, 50]"
        >
            <template #header>
                <div class="flex flex-wrap items-center justify-between gap-2">
                    <span class="text-xl font-bold">Mes recherches</span>
                </div>
            </template>
            <Column
                v-for="col of columns"
                :key="col.field"
                :field="col.field"
                :header="col.header"
                :sortable="col.sortable !== false"
            >
                <template #body="{ data }" v-if="col.field === 'actions'">
                    <div class="c-datatable-actions">
                        <Button 
                            icon="pi pi-pencil" 
                            @click="openEdit(data)" 
                        />
                        <Button 
                            icon="pi pi-trash" 
                            @click="openDelete(data)" 
                        />
                    </div>
                </template>
            </Column>
        </DataTable>

        <Overlay 
            v-model:visible="editVisible"
            :paddingTop="80"
        >
            <template v-if="tmpCompany">
                <div class="c-dialog c-dialog-edit">
                    <!-- <div v-if="!loading"> -->
                        <p class="c-dialog-title">
                            Modifier
                        </p>
                        <!-- NAME -->
                        <div class="c-dialog-field">
                            <FloatLabel class="c-dialog-float-label">
                                <label for="name">
                                    Nom
                                </label>
                                <InputText 
                                    v-model="tmpCompany.name"
                                    type="text"
                                    id="name"
                                    class="c-dialog-input"
                                />
                            </FloatLabel>
                        </div>
                        <!-- ADDRESS -->
                        <div class="c-dialog-field">
                            <FloatLabel class="c-dialog-float-label">
                                <label for="address">
                                    Adresse
                                </label>
                                <InputText 
                                    v-model="tmpCompany.address"
                                    type="text"
                                    id="address"
                                    class="c-dialog-input"
                                />
                            </FloatLabel>
                        </div>
                        <!-- TVA -->
                        <div class="c-dialog-field">
                            <FloatLabel class="c-dialog-float-label">
                                <label for="tva">
                                    TVA
                                </label>
                                <InputText 
                                    v-model="tmpCompany.tva"
                                    type="text"
                                    id="tva"
                                    class="c-dialog-input"
                                />
                            </FloatLabel>
                        </div>

                        <div>
                            <p>
                                <small>
                                    N° SIRET : {{ tmpCompany.siret }}
                                </small>
                            </p>
                            <p>
                                <small>
                                    N° SIREN : {{ tmpCompany.siren }}
                                </small>
                            </p>
                        </div>
            
                        <div class="c-dialog-actions">
                            <Button 
                                type="button" 
                                label="Annuler" 
                                icon="pi pi-times"
                                @click="editVisible = false" 
                            />
                            <Button 
                                type="button" 
                                label="Valider"
                                icon="pi pi-check"
                                @click="editCompany"
                            />
                        </div>
                    <!-- </div>
                    <Loading v-else /> -->
                </div>
            </template>
        </Overlay>

        <Overlay 
            v-model:visible="deleteVisible"
            :paddingTop="80"
        >
            <template v-if="tmpCompany">
                <div class="c-dialog c-dialog-delete">
                    <!-- <div v-if="!loading"> -->
                        <div class="c-dialog-company">
                            <p>
                                {{ tmpCompany.name }}
                            </p>
                            <p>
                                {{ tmpCompany.address }}
                            </p>
                            <p>
                                {{ tmpCompany.tva }}
                            </p>
                        </div>
                        <div>
                            <p>
                                <small>
                                    N° SIRET : {{ tmpCompany.siret }}
                                </small>
                            </p>
                            <p>
                                <small>
                                    N° SIREN : {{ tmpCompany.siren }}
                                </small>
                            </p>
                        </div>
                        <div class="c-dialog-actions">
                            <Button 
                                type="button" 
                                label="Supprimer"
                                icon="pi pi-trash"
                                @click="deleteCompany"
                            />
                            <Button 
                                type="button" 
                                label="Annuler" 
                                icon="pi pi-times"
                                @click="deleteVisible = false" 
                            />
                        </div>
                    <!-- </div>
                    <Loading v-else /> -->
                </div>
            </template>
        </Overlay>
    </div>
</template>

<style scoped>

.c-container {
    margin: 25px 64px;
}

.c-datatable-actions {
    display: flex;
    justify-content: space-around;
}

.c-datatable-actions button {
    background: var(--white);
    border: 1px solid var(--secondary-color);
    color: var(--normal-text);
}

.c-datatable-actions button:hover {
    background: var(--secondary-color) !important;
    border: 1px solid var(--secondary-color) !important;
    color: var(--white) !important;
}

.p-button {
    margin: 0 5px;
}

.c-dialog {
    width: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 10px;
    border-radius: 5px;
    background: var(--white);
    color: var(--normal-text);
}

.c-dialog-title {
    padding: 10px 0;
    font-size: 20px;
    font-weight: bold;
}

.c-dialog-field {
    width: 100%;
    display: flex;
    justify-content: center;
    margin: 1rem 0;
}

.c-dialog-float-label {
    width: 80%;
}

.c-dialog-input {
    width: 100%;
    color: var(--normal-text);
    border: 2px solid var(--primary-color);
}

.c-dialog-actions {
    display: flex;
    margin: 21px 0;
}

.c-dialog-actions button {
    margin: 0 21px;
    font-weight: bold;
    padding: 0.5rem 1rem;
    border: none;
}

.c-dialog-actions button:hover {
    
}

.p-button:not(:disabled):hover {
    border: none
}

.c-dialog-edit .c-dialog-actions button:nth-child(1) {
    background: var(--normal-text);
    color: var(--white);
}

.c-dialog-edit .c-dialog-actions button:nth-child(2) {
    background: var(--secondary-color);
    color: var(--white);
}

.c-dialog-delete .c-dialog-actions button:nth-child(1) {
    background: var(--danger-color);
    color: var(--white);
}

.c-dialog-delete .c-dialog-actions button:nth-child(2) {
    background: var(--normal-text);
    color: var(--white);
}

.c-dialog-company {
    padding: 20px 0;
}

.c-dialog-company p {
    padding: 0 20px;
    font-weight: bold;
}

.c-dialog-company p:nth-child(1) {
    font-size: 18px;
}

.c-dialog-delete div:nth-child(2) {
    margin-bottom: 10px;
}

@media (max-width: 768px) {
    .c-container {
        margin: 25px 8px;
    }
}

</style>
