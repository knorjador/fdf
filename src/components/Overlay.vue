
<script setup lang="ts">

import Dialog from 'primevue/dialog'
import Loading from './Loading.vue'

</script>

<template>

    <Dialog 
        :pt="{
                root: { class: '!border-0 !bg-transparent'},
                mask: { 
                    class: '!backdrop-blur-sm', 
                    style: 'background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(2px);' 
                }
        }"
        :closable="false"
        :style="{ 
            width: '100vw', 
            height: '100vh', 
            display: 'flex',
            paddingTop: '128px'
        }"
    >
        <Loading />
    </Dialog>

 </template>

<style scoped>



</style>
 