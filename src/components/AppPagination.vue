<template>
  <nav
    class="mx-2 flex overflow-hidden w-fit rounded border-y-2 border-x border-slate-200 bg-slate-200 gap-[1px]"
  >
    <AppButton
      :as="RouterLink"
      variant="solid-inv"
      class="w-8 h-8 rounded-none bg-slate-50"
      :disabled="isPrevDisabled"
      :to="hrefCreator(Math.max(1, current - 1))"
      noSpacing
    >
      &laquo;
    </AppButton>
    <AppButton
      v-for="num in shownNum"
      :as="RouterLink"
      :key="num + offset"
      :variant="props.current === num + offset ? 'solid' : 'solid-inv'"
      :to="hrefCreator(num + offset)"
      class="w-8 h-8 rounded-none border-slate-200"
      noSpacing
    >
      {{ num + offset }}
    </AppButton>
    <AppButton
      :as="RouterLink"
      variant="solid-inv"
      class="w-8 h-8 rounded-none bg-slate-50"
      :disabled="isNextDisabled"
      :to="hrefCreator(Math.min(total, current + 1))"
      noSpacing
    >
      &raquo;
    </AppButton>
  </nav>
</template>

<script setup lang="ts">
import AppButton from '@/components/AppButton.vue'
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

const props = withDefaults(
  defineProps<{
    total: number
    current: number
    max?: number
    hrefCreator: (num: number) => string
  }>(),
  {
    max: 10,
    current: 1
  }
)

const offset = computed(() => 	Math.max(0, props.current - Math.floor(props.max / 2)))
const shownNum = computed(() =>
  Math.max(Math.min(props.total, props.max), Math.min(props.total - offset.value, props.max))
)
const isPrevDisabled = computed(() => props.current <= 1)
const isNextDisabled = computed(() => props.current === props.total)
</script>
