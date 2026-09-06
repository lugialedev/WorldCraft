import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useAuthStore } from './stores/auth'

import App from './App.vue'
import router from './router'

const  app = createApp(App)
const pinia = createPinia()
const authStore = useAuthStore(pinia)

app.use(pinia)
app.use(router)

await authStore.initialize()

app.mount('#app')
