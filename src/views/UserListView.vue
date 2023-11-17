<template>
  <DefaultLayout title="User list">
    <UserInput name="nameFilter" variant="solid" labelClass="flex justify-between items-center"
      ><span class="text-slate-500">Search</span
      ><Icon icon="material-symbols:search" class="h-5 w-5" />
    </UserInput>

    <AppList
      v-if="userResponse"
      :isLoading="isLoading"
      :error="error"
      :items="userResponse.data"
      :labels="userListLabels"
      :ListComponent="UserListItem"
      gridClass="grid-cols-[4.5rem,1fr,4.5rem]"
    />
  </DefaultLayout>
  <AppPagination
    v-if="userResponse"
    :current="pageNum"
    :total="userResponse.total_pages"
    :hrefCreator="hrefFromPage"
  />
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import UserInput from '@/components/UserInput.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import AppList from '@/components/AppList.vue'
import { useQuery } from '@tanstack/vue-query'
import { getUsers } from '@/api/userQueries'
import UserListItem from '@/components/UserListItem.vue'
import AppPagination from '@/components/AppPagination.vue'
import { computed } from 'vue'

const userListLabels = [
  { text: 'Full name', class: 'col-start-2' },
  { text: 'action', class: 'text-center' }
]

const props = defineProps<{ page: string }>()
const pageNum = computed(() => (Array.isArray(props.page) ? 1 : parseInt(props.page) || 1))

const queryKey = computed(() => ['user-list', pageNum.value])
const {
  data: userResponse,
  error,
  isLoading
} = useQuery({
  queryKey,
  queryFn: () => getUsers(pageNum.value)
})

const hrefFromPage = computed(() => (num: number) => ({ name: 'users', params: { page: num } }))
</script>
