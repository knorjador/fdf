
<script setup lang="ts">

</script>

<template>

    <div class="loading">
        <span>{&nbsp;</span> 
        <span>FD</span> 
        <span>&nbsp;}</span>
    </div>

 </template>

<style scoped>

.loading {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 30px 0;
    font-weight: bold;
    font-size: 8vh;
    opacity: 0.8;
    color: var(--primary-color);
}

.loading span:nth-child(1), .loading span:nth-child(3) {
    display: inline-block;
    -webkit-animation: pulse 0.4s alternate infinite ease-in-out;
    animation: pulse 0.4s alternate infinite ease-in-out;
}

.loading span:nth-child(1) {
    -webkit-animation-delay: 0.4s;
    animation-delay: 0.4s;
}

.loading span:nth-child(2) {
    display: inline-block;
    margin-top: 7px;
    font-size: 40px;
    font-weight: bold;
    color: var(--primary-color);
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
 