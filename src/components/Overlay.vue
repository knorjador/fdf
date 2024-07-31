
<script setup lang="ts">

import { computed } from 'vue'
import Dialog from 'primevue/dialog'

const props = defineProps({
    background: {
        type: String,
        default: 'dark'
    },
    paddingTop: {
        type: [String, Number],
        default: 128
    }
})

const computedBackground = computed(() => {
    if (props.background === 'dark')
        return 'rgba(0, 0, 0, 0.3)'
    else if (props.background === 'light')
        return 'rgba(255, 255, 255, 0.3)'

    return props.background;
})

const computedPaddingTop = computed(() => {
    return typeof props.paddingTop === 'number' 
        ? `${props.paddingTop}px` 
        : props.paddingTop;
})

</script>

<template>

    <Dialog 
        :pt="{
                mask: { 
                    style: `background: ${computedBackground}; backdrop-filter: blur(2px);` 
                }
        }"
        :closable="false"
        :style="{ 
            width: '100vw', 
            height: '100vh', 
            display: 'flex',
            alignItems: 'center',
            paddingTop: computedPaddingTop,
        }"
    >
        <slot />
    </Dialog>

 </template>

<style scoped>


</style>
 