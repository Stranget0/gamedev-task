<template>
  <DefaultLayout title="User list">
    <div
      class="max-w-sm mx-auto flex flex-col-reverse justify-center items-center gap-8 sm:gap-2 sm:max-w-none sm:justify-between sm:flex-row"
    >
      <UserInput
        name="nameFilter"
        variant="solid"
        containerClass="max-w-sm"
        labelClass="flex justify-between items-center"
        ><span class="text-slate-500">Search</span
        ><Icon icon="material-symbols:search" class="h-5 w-5" />
      </UserInput>

      <AppButton variant="solid-pill" class="ml-auto" :as="RouterLink" to="/add-user"
        >Add user</AppButton
      >
    </div>

    <AppList
      v-if="userResponse"
      :isLoading="isLoading"
      :error="error"
      :items="userResponse.data"
      :labels="userListLabels"
      :ListComponent="UserListItem"
      ><template #header> <UserListHeader /> </template
    ></AppList>
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
import UserListItem from '@/components/UserListItem.vue'
import AppPagination from '@/components/AppPagination.vue'
import { computed } from 'vue'
import AppButton from '@/components/AppButton.vue'
import UserListHeader from '@/components/UserListHeader.vue'
import { RouterLink } from 'vue-router'
import useUsersQuery from '@/composables/useUsersQuery'

const userListLabels = [
  { text: 'Full name', class: 'col-start-2' },
  { text: 'action', class: 'text-center' }
]

const props = defineProps<{ page: string }>()
const pageNum = computed(() => (Array.isArray(props.page) ? 1 : parseInt(props.page) || 1))

const { data: userResponse, error, isLoading } = useUsersQuery(() => pageNum.value)

const hrefFromPage = computed(() => (num: number) => ({ name: 'users', params: { page: num } }))
</script>
