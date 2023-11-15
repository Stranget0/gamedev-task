<template>
  <div :class="['grid', 'w-full', containerClass]">
    <AppTypography as="label" type="label" :for="props.name" :class="[labelClass, 'mb-2']">{{
      props.label
    }}</AppTypography>
    <input
      :type="props.type"
      :name="props.name"
      :id="props.name"
      class="px-4 py-1"
      :class="inputClass"
      :aria-invalid="isError"
      v-model="value"
      v-bind="$attrs"
    />
  </div>
  <AppTypography v-if="!!errorMessage" type="label" error aria-errormessage>{{
    errorMessage
  }}</AppTypography>
</template>

<script setup lang="ts">
import { useField } from 'vee-validate'
import AppTypography from './AppTypography.vue'

defineOptions({
  // Pass manually to input element
  inheritAttrs: false
})

const classes = {
  input: {
    outline: 'bg-transparent border-2 border-slate-300 rounded',
    background: 'bg-slate-200 col-start-1 col-end-1 row-start-1 row-end-1'
  },
  label: {
    outline: 'text-slate-700 font-bold',
    background: 'text-slate-700 col-start-1 col-end-1 row-start-1 row-end-1'
  }
}

const props = withDefaults(
  defineProps<{
    name: string
    label: string
    type?: string
    variant: 'outline' | 'background'
    containerClass?: string
  }>(),
  { type: 'text', variant: 'outline' }
)

const { value, errorMessage } = useField(() => props.name)

const isError = !!errorMessage
const inputClass = classes.input[props.variant]
const labelClass = classes.label[props.variant]
</script>
