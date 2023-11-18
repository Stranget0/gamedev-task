<template>
  <li class="grid items-center py-2 pr-8 rounded even:bg-slate-100 grid-cols-[4.5rem,1fr,4.5rem]">
    <AppTypography v-if="isDeleteSuccess" class="mx-auto" success bold>User deleted!</AppTypography>
    <Icon v-else-if="!isDeleteIdle" icon="svg-spinners:clock" />
    <template v-else>
      <img :src="props.avatar" width="32" height="32" class="rounded-full ml-2" />
      <AppTypography>{{ props.first_name }} {{ props.last_name }}</AppTypography>
      <div class="col-3 justify-self-center flex gap-4 text-slate-400">
        <AppButton :as="RouterLink" :to="`/user/${props.id}`" noSpacing>
          <Icon icon="material-symbols:edit-square-outline" />
        </AppButton>
        <AppButton noSpacing @click="deleteThisUser">
          <Icon icon="material-symbols:delete-rounded" />
        </AppButton>
      </div>
    </template>
  </li>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import AppTypography from '@/components/AppTypography.vue'
import AppButton from '@/components/AppButton.vue'
import type { User } from '@/api/userTypes'
import { RouterLink } from 'vue-router'
import useDeleteUser from '@/composables/useDeleteUser'

const props = withDefaults(defineProps<User>(), {
  avatar: '@/assets/avatar_default.svg'
})

const {
  mutate: deleteThisUser,
  isSuccess: isDeleteSuccess,
  isIdle: isDeleteIdle
} = useDeleteUser(()=>props.id)
</script>
