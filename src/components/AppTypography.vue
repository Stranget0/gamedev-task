<template>
  <component
    :is="tag"
    :class="[
      typeClass,
      isBold && 'font-bold',
      isError && 'text-red-500',
      isSuccess && 'text-green-800'
    ]"
    ><slot
  /></component>
</template>

<script setup lang="ts">
import { toRefs } from 'vue'

const typeClasses = {
  body: 'text-base',
  label: 'text-sm text-slate-400',
  title: 'text-4xl'
}
type Types = keyof typeof typeClasses

const props = withDefaults(
  defineProps<{
    as?: 'p' | 'span'
    type?: Types
    bold?: boolean
    error?: boolean
    success?: boolean
  }>(),
  { as: 'p', type: 'body' }
)

const typeClass = typeClasses[props.type]

const { as: tag, bold: isBold, error: isError, success: isSuccess } = toRefs(props)
</script>
