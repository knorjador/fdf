
import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'
import Tooltip from 'primevue/tooltip'
import 'primeicons/primeicons.css'                      
import 'primeflex/primeflex.css'

const app = createApp(App);

app.use(PrimeVue)
app.use(createPinia())
app.use(router)

app.directive('tooltip', Tooltip)

app.mount('#app')
