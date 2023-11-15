<template>
  <component  :is="tag" :class="[typeClass, isBold && 'font-bold', isError && 'text-red-500']"
    ><slot
  /></component>
</template>

<script lang="ts">

type Types = 'body' | 'title' | 'label'
type TypeDict = { [t in Types]: string }

interface Props {
  as: 'p' | 'span'
  type: Types
  bold?: boolean
  error?: boolean
}
</script>

<script setup lang="ts">

const typeClasses: TypeDict = {
  body: 'text-base',
  label: 'text-sm text-slate-400',
  title: 'text-4xl'
}

const {
  as: tag,
  type,
  bold: isBold,
  error: isError
} = withDefaults(defineProps<Props>(), { as: 'p', type: 'body' })

const typeClass = typeClasses[type]
</script>
