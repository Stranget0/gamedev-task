<template>
  <img :src="props.avatar" width="32" height="32" class="rounded-full ml-2" />
  <AppTypography>{{ props.first_name }} {{ props.last_name }}</AppTypography>
  <div class="col-3 justify-self-center flex gap-4 text-slate-400">
    <AppButton noSpacing>
      <Icon icon="material-symbols:edit-square-outline" />
    </AppButton>
    <AppButton noSpacing>
      <Icon icon="material-symbols:delete-rounded" />
    </AppButton>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import AppTypography from '@/components/AppTypography.vue'
import AppButton from '@/components/AppButton.vue'
import type { User } from '@/api/userTypes'

const props = withDefaults(defineProps<User>(), {
  avatar: '@/assets/avatar_default.svg'
})
</script>
