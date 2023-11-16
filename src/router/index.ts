import AddUserView from '@/views/AddUserView.vue'
import UserListView from '@/views/UserListView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {path:"/", component: UserListView},
    {path:"/add-user", component: AddUserView}
  ]
})

export default router
