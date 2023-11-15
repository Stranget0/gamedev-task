<template>
  <SplitLayout as="form" title="Add user" leftContainerClass="flex flex-col justify-between">
    <template #default>
      <div class="flex gap-4">
        <UserInput label="First Name" name="firstName" />
        <UserInput label="Last Name" name="lastName" />
      </div>
			<AppButton type="submit" variant="solid" class="w-fit">
				Update details
			</AppButton>
    </template>
    <template #aside>
      <img
        src="@/assets/avatar_default.svg"
        width="128"
        height="128"
        class="mx-auto rounded-full border-2 border-slate-300"
      />
      <AppButton as="input" type="file" name="avatar" variant="outline" class="gap-2 w-full mt-20"
        ><Icon icon="material-symbols:photo-camera-rounded" /><span>Change photo</span></AppButton
      >
    </template>
  </SplitLayout>
</template>

<script setup lang="ts">
import AppButton from '@/components/AppButton.vue'
import UserInput from '@/components/UserInput.vue'
import { Icon } from '@iconify/vue'
import SplitLayout from '@/layouts/SplitLayout.vue'
</script>
