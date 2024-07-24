
<script setup lang="ts">

</script>

<template>

    <div class="loading">
        <span>{&nbsp;</span><span>&nbsp;}</span>
    </div>

 </template>

<style scoped>

.loading {
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--primary-color);
    font-weight: bold;
    font-size: 8vh;
    opacity: 0.8;
}

.loading span {
    display: inline-block;
    margin-top: 30px;
    -webkit-animation: pulse 0.4s alternate infinite ease-in-out;
    animation: pulse 0.4s alternate infinite ease-in-out;
}

.loading span:nth-child(odd) {
    -webkit-animation-delay: 0.4s;
    animation-delay: 0.4s;
}

@-webkit-keyframes pulse {
    to {
        transform: scale(0.8);
        opacity: 0.4;
    }
}

@keyframes pulse {
    to {
        transform: scale(0.8);
        opacity: 0.4;
    }
}

</style>
 