<template>
  <label v-if="tag === 'input' && name" :for="name" :class="visualClass"><slot /></label>
  <component :is="tag" :id="name" :class="buttonClass" :disabled="isDisabled" v-bind="$attrs">
    <slot />
  </component>
  <AppTypography v-if="errorMessage" class="prose" bold error aria-errormessage>{{
    errorMessage
  }}</AppTypography>
</template>

<script setup lang="ts">
import { toRefs, type Component, computed } from 'vue'
import AppTypography from './AppTypography.vue'

const variants = {
  outline: 'border-2 border-slate-400 text-slate-600 rounded',
  solid: 'text-slate-50 bg-green-800 rounded',
  'solid-inv': 'bg-slate-50 text-green-800 rounded',
  'solid-pill': 'text-slate-50 bg-green-800 rounded-full',
  clean: ''
}

type Variants = keyof typeof variants

defineOptions({
  inheritAttrs: false
})
const props = withDefaults(
  defineProps<{
    variant?: Variants
    name?: string
    as?: 'button' | 'input' | Component
    class?: string
    noSpacing?: boolean
    disabled?: boolean
    errorMessage?: string
  }>(),
  { variant: 'clean', as: 'button' }
)

const {
  variant,
  as: tag,
  name,
  errorMessage,
  class: className,
  noSpacing: isNoSpacing,
  disabled: isDisabled
} = toRefs(props)

const spacingClass = computed(() =>
  isNoSpacing.value ?? variant.value === 'clean' ? '' : 'py-2 px-8'
)
const variantClass = computed(() => variants[variant.value])
const visualClass = computed(() => [
  'text-center flex justify-center items-center cursor-pointer',
  variantClass.value,
  spacingClass.value,
  className?.value,
  isDisabled.value && 'opacity-50'
])
const buttonClass = computed(() => (tag.value !== 'input' ? visualClass.value : 'hidden'))
</script>
