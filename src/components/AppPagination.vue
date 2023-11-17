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
      :key="num"
      :variant="props.current === num ? 'solid' : 'solid-inv'"
      :to="hrefCreator(offset + num)"
      class="w-8 h-8 rounded-none border-slate-200"
      noSpacing
    >
      {{ offset + num }}
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
import { computed } from 'vue';
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
const offset = computed(()=> Math.floor(props.total / props.max))
const shownNum = computed(()=>Math.min(props.max, props.total % props.max) + offset.value)

const isPrevDisabled = computed(()=>props.current <= 1)
const isNextDisabled = computed(()=>props.current === props.total)

</script>
