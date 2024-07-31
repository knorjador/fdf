
<script setup lang="ts">

import { RouterLink } from 'vue-router'

const props = defineProps<{

    size?: string
    weight?: string
    colorLeft?: string
    colorRight?: string

}>()

const 
    size = props.size || 'var(--normal-app-name-size)',
    weight = props.weight || 'var(--bold)',
    colorLeft = props.colorLeft || 'var(--primary-color)',
    colorRight = props.colorRight || 'var(--secondary-color)'

</script>

<template>
    <RouterLink 
        to="/" 
        :style="{ fontSize: size, fontWeight: weight }" 
        class="app-name"
    >
        <span :style="{ color: colorLeft }">
            Siret
        </span>
        <span :style="{ color: colorRight }">
            urn
        </span>
    </RouterLink>
</template>

<style scoped>

.app-name {
    display: flex;
    align-items: center;
    text-decoration: none;
}

</style>