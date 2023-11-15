import AddUserVue from '@/views/AddUser.vue'
// import UserListVue from '@/views/UserList.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {path:"/", component: UserListVue},
    {path:"/add-user", component: AddUserVue}
  ]
})

export default router
