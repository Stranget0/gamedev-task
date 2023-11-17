import UserView from '@/views/UserView.vue'
import UserListView from '@/views/UserListView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', redirect: '/users/1' },
    { path: '/users/:page', name: 'users', component: UserListView, props: true },
    { path: '/user/:userId', name: 'user', component: UserView, props: true },
    { path: '/add-user', name: 'add-user', component: UserView }
  ]
})

export default router
