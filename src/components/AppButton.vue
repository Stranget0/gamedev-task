<template>
  <label v-if="tag === 'input'" :for="name" :class="visualClass"><slot /></label>
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

type Variants = 'outline' | 'solid' | 'solid-pill'

defineOptions({
  inheritAttrs: false
})

const {
  variant,
  as: tag,
  name,
  class: className
} = withDefaults(
  defineProps<{
    variant: Variants
    name?: string
    as?: 'button' | 'input'
    class?: string
  }>(),
  { variant: 'solid', as: 'button' }
)

const { value, errorMessage } = useField(() => name)

const variants: { [v in Variants]: string } = {
  outline: 'border-2 border-slate-400 text-slate-600 rounded',
  solid: 'text-slate-50 bg-green-800 rounded',
  'solid-pill': 'text-slate-50 bg-green-800 rounded-full'
}

const variantClass = variants[variant]
const visualClass = [
  'py-2 px-8 text-center flex justify-center items-center cursor-pointer',
  variantClass,
  className
]
const buttonClass = tag === 'button' ? visualClass : 'hidden'
</script>
