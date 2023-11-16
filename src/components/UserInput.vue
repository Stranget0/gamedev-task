<template>
  <div :class="['group grid w-full', containerClass]">
    <AppTypography
      as="label"
      type="label"
      :for="props.name"
      :class="[props.labelClass, classes.labelClass, 'mb-2']"
      ><slot
    /></AppTypography>
    <input
      :type="props.type"
      :name="props.name"
      :id="props.name"
      :class="[classes.inputClass, hSpacingClass, 'py-1']"
      :aria-invalid="isError"
      v-model="fieldValue"
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
import { computed } from 'vue';

defineOptions({
  // Pass manually to input element
  inheritAttrs: false
})

const hSpacingClass = 'px-4'

const props = withDefaults(
  defineProps<{
    name: string
    label: string
    type?: string
    variant: 'outline' | 'solid'
    containerClass?: string
    labelClass?: string
  }>(),
  { type: 'text', variant: 'outline' }
)

const { value: fieldValue, errorMessage } = useField(() => props.name)
const classes = computed(()=>{
	const classesDict = {
		input: {
			outline: 'bg-transparent border-2 border-slate-300 rounded',
			solid: 'bg-slate-200 col-start-1 col-end-1 row-start-1 row-end-1 rounded'
		},
		label: {
			outline: 'text-slate-700 font-bold',
			solid: `${hSpacingClass} h-full relative z-2 text-slate-500 font-bold col-start-1 col-end-1 row-start-1 row-end-1 pointer-events-none origin-left motion-safe:transition ${
				fieldValue.value ? '-translate-y-full' : 'group-focus-within:-translate-y-full'
			}`
		}
	}
	const inputClass = classesDict.input[props.variant]
	const labelClass = classesDict.label[props.variant]
	return {inputClass, labelClass}
})

const isError = !!errorMessage
</script>
