<template>
  <section class="mt-16">
    <template v-if="items.length > 0">
      <slot name="header" />
      <div v-if="props.error || props.isLoading" class="flex justify-center">
        <AppTypography v-if="props.error && !props.isLoading" error bold>{{
          props.error
        }}</AppTypography>
        <Icon v-if="props.isLoading" icon="svg-spinners:clock" class="w-8 h-8" />
      </div>
      <ul>
        <ListComponent v-bind="item" v-for="item in items" :key="item.id" />
      </ul>
    </template>
    <AppTypography v-else class="mx-auto text-center" bold>No items</AppTypography>
  </section>
</template>

<script setup lang="ts">
import {  type Component, shallowRef } from 'vue'
import { Icon } from '@iconify/vue'
import AppTypography from './AppTypography.vue'

const props = withDefaults(
  defineProps<{
    gridClass?: string
    ListComponent: Component
    items: ({ id: string } & unknown)[]
    error?: string
    isLoading?: boolean
  }>(),
  {
    gridClass: 'auto-cols-auto'
  }
)

const ListComponent = shallowRef(props.ListComponent)

</script>
