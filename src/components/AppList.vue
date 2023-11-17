<template>
  <section class="mt-16">
    <div v-if="transformedLabels.length > 0" class="grid items-center pr-8 pb-2" :class="gridClass">
      <AppTypography
        v-for="(label, labelIndex) in transformedLabels"
        :key="labelIndex"
        bold
        :class="label.class"
      >
        {{ label.text }}
      </AppTypography>
    </div>
    <div v-if="props.error || props.isLoading" class="flex justify-center">
      <AppTypography v-if="props.error && !props.isLoading" error bold>{{ props.error }}</AppTypography>
      <Icon v-if="props.isLoading" icon="svg-spinners:clock" class="w-8 h-8" />
    </div>
    <ul>
      <li
        v-for="item in items"
        :key="item.id"
        class="grid items-center py-2 pr-8 rounded even:bg-slate-100"
        :class="gridClass"
      >
        <ListComponent v-bind="item" />
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { computed, type Component,  shallowRef } from 'vue'
import { Icon } from '@iconify/vue'
import AppTypography from './AppTypography.vue'

type HeaderLabel = {
  text: string
  class: string
}
 
const props = withDefaults(
  defineProps<{
    gridClass?: string
    labels:  (HeaderLabel | string)[]
    ListComponent: Component
    items: ({ id: string } & unknown)[]
    error?: string
    isLoading?: boolean
  }>(),
  {
    gridClass: 'auto-cols-auto',
  }
)

const ListComponent = shallowRef(props.ListComponent)

const transformedLabels = computed(() =>
  props.labels.map((l) => (typeof l === 'string' ? { class: '', text: l } : l))
)
</script>
