<template>
  <label v-if="tag === 'input' && name" :for="name" :class="visualClass"><slot /></label>
  <component
    :is="tag"
    :id="name"
    :class="buttonClass"
    :aria-invalid="!!errorMessage"
    v-bind="$attrs"
    v-model="value"
  >
    <slot />
  </component>
  <AppTypography class="prose" v-if="!!errorMessage" bold error aria-errormessage>{{
    errorMessage
  }}</AppTypography>
</template>

<script setup lang="ts">
import { useField } from 'vee-validate'
import type AppTypography from './AppTypography.vue'

const variants = {
  outline: 'border-2 border-slate-400 text-slate-600 rounded',
  solid: 'text-slate-50 bg-green-800 rounded',
  "solid-inv": 'bg-slate-50 text-green-800 rounded',
  'solid-pill': 'text-slate-50 bg-green-800 rounded-full',
  clean: ''
}

type Variants = keyof typeof variants

defineOptions({
  inheritAttrs: false
})

const {
  variant,
  as: tag,
  name,
  class: className,
  noSpacing
} = withDefaults(
  defineProps<{
    variant: Variants
    name?: string
    as?: 'button' | 'input'
    class?: string
    noSpacing?: boolean
  }>(),
  { variant: 'clean', as: 'button' }
)

const spacingClass = noSpacing ?? variant === 'clean' ? '' : 'py-2 px-8'

const { value, errorMessage } = useField(() => name)

const variantClass = variants[variant]
const visualClass = [
  'text-center flex justify-center items-center cursor-pointer',
  variantClass,
  spacingClass,
  className
]
const buttonClass = tag === 'button' ? visualClass : 'hidden'
</script>
