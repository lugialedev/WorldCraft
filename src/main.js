import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useAuthStore } from './stores/auth'

import App from './App.vue'
import router from './router'

const app = createApp(App)
const authStore = useAuthStore()

app.use(createPinia())
app.use(router)
authStore.initialize()

app.mount('#app')
