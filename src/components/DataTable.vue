
<script setup lang="tsx">

import { ref, onMounted } from 'vue';

import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import 'primeicons/primeicons.css'

const columns = [
    { field: 'name', header: 'Nom' },
    { field: 'address', header: 'Addresse' },
    { field: 'siren', header: 'Siren' },
    { field: 'tva', header: 'TVA' }
]

const companies = ref([
    { name: 'Entreprise 1', address: "L'adresse de l'entreprise 1 21000 DIJON", siren: '123456789', tva: '5,5' },
    { name: 'Entreprise 2', address: "L'adresse de l'entreprise 2 39000 DOLE", siren: '987654321', tva: '19' },
    { name: 'Entreprise 3', address: "L'adresse de l'entreprise 3 21000 DIJON", siren: '246813579', tva: '' },
    { name: 'Entreprise 4', address: "L'adresse de l'entreprise 4 39100 DOLE", siren: '135792468', tva: '21' },
])

const actions = [
    { icon: 'pi pi-pencil', style: 'p-button-info', action: 'edit' },
    { icon: 'pi pi-trash', style: 'p-button-danger', action: 'delete' }
]

// const editCompany = company => {
//     console.log('Edit', company)
// }

// const deleteCompany = company => {
//     console.log('Delete', company)
// }

const actionTemplate = row => {
    console.loading(row)

    return (
        // <div class="c-actions">
        //     <Button
        //         icon="pi pi-pencil"
        //         class="p-button-rounded p-button-info p-mr-2"
        //     />
        //     <Button
        //         icon="pi pi-trash"
        //         class="p-button-rounded p-button-danger"
        //     />
        // </div>
        <template body="{ row }">
      <div class="action-buttons">
        {actions.map(action => (
          <Button
            key={action.action}
            icon={action.icon}
            class={['p-button-rounded', action.style, 'p-mr-2']}
   
          />
        ))}
      </div>
    </template>
    )
}

</script>

<template>
    <div class="c-container">
        <DataTable 
            :value="companies"
            stripedRows
            paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]"
        >
            <template #header>
                <div class="flex flex-wrap items-center justify-between gap-2">
                    <span class="text-xl font-bold">Mes précédentes recherches</span>
                </div>
            </template>
            <Column 
                v-for="col of columns" :key="col.field" :field="col.field" :header="col.header" sortable>
            </Column>
            <!-- <Column
                body="actionTemplate"
                style="width: 150px;"
            >
            </Column> -->
        </DataTable>
    </div>
</template>

<style scoped>

.c-container {
    margin: 25px 64px;
}

.c-actions {
    display: flex;
    justify-content: space-around;
}

.p-button {
    margin: 0 0.5rem;
}

</style>
