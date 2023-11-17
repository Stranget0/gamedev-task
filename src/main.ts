import './assets/style.css'
import 'vue-toast-notification/dist/theme-default.css';
import ToastPlugin from 'vue-toast-notification';

import { createApp } from 'vue'
// import { createPinia } from 'pinia'
import { VueQueryPlugin } from '@tanstack/vue-query'

import App from './App.vue'
import router from './router'

const app = createApp(App)

// app.use(createPinia())
app.use(router)
app.use(VueQueryPlugin)
app.use(ToastPlugin);

app.mount('#app')
