<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { RouterLink, RouterView } from 'vue-router'

const bgClass = 'bg-slate-100'
onMounted(() => {
  document.body.classList.add(bgClass)
})
onUnmounted(() => {
  document.body.classList.remove(bgClass)
})
</script>

<template>
  <header class="fixed top-0 w-full px-2 lg:px-32 my-8">
    <nav>
      <ul class="flex justify-end items-center gap-4">
        <li>
          <RouterLink to="/">User List</RouterLink>
        </li>
        <li>
          <RouterLink to="/add-user">Add User</RouterLink>
        </li>
      </ul>
    </nav>
  </header>
  <main class="py-32 mx-2 lg:mx-32">
    <RouterView />
  </main>
</template>
