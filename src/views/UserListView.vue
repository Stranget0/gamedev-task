<template>
  <DefaultLayout title="User list">
    <UserInput variant="solid" labelClass="flex justify-between items-center"
      ><span class="text-slate-500">Search</span
      ><Icon icon="material-symbols:search" class="h-5 w-5" />
    </UserInput>

    <section class="mt-16">
      <div class="grid grid-cols-[4.5rem,1fr,4.5rem] items-center pr-8 pb-2">
        <AppTypography bold class="col-start-2">Full name</AppTypography>
        <AppTypography bold class="col-start-3 text-center">Action</AppTypography>
      </div>
      <ul>
        <li
          class="grid grid-cols-[4.5rem,1fr,4.5rem] items-center py-2 pr-8 rounded odd:bg-slate-100"
        >
          <img src="@/assets/avatar_default.svg" width="32" height="32" class="rounded-full ml-2" />
          <p>lala polala</p>
          <div class="col-3 justify-self-center flex gap-4 text-slate-400">
            <AppButton noSpacing>
              <Icon icon="material-symbols:edit-square-outline" />
            </AppButton>
            <AppButton noSpacing>
              <Icon icon="material-symbols:delete-rounded" />
            </AppButton>
          </div>
        </li>
      </ul>
    </section>
  </DefaultLayout>

  <nav class="mx-2 flex overflow-hidden w-fit rounded border-y-2 border-x border-slate-200 bg-slate-200 gap-[1px]">
    <AppButton
      variant="solid-inv"
      class="w-8 h-8 rounded-none	 bg-slate-50"
      noSpacing
    >
      &laquo;
    </AppButton>
    <AppButton
      variant="solid"
      class="w-8 h-8 rounded-none	 border-slate-200"
      noSpacing
    >
      1
    </AppButton>
    <AppButton
      variant="solid-inv"
      class="w-8 h-8 rounded-none	 bg-slate-50"
      noSpacing
    >
      &raquo;
    </AppButton>
  </nav>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import UserInput from '@/components/UserInput.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import AppTypography from '@/components/AppTypography.vue'
import AppButton from '@/components/AppButton.vue'
</script>
