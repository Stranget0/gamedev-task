<template>
  <SectionTitle>{{ title }}</SectionTitle>
  <component
    :is="tag"
    class="bg-slate-200 p-2 grid grid-cols-[2fr,1fr] gap-4"
    :class="containerClass"
		v-bind="$attrs"
  >
    <section class="box" :class="leftContainerClass">
      <slot>Content</slot>
    </section>
    <section class="box" :class="rightContainerClass">
      <slot name="aside">Aside</slot>
    </section>
  </component>
</template>

<script setup lang="ts">
import SectionTitle from '@/components/SectionTitle.vue'

defineOptions({
  inheritAttrs: false
})

const {
  title,
  containerClass,
  leftContainerClass,
  rightContainerClass,
  as: tag
} = withDefaults(
  defineProps<{
    title: string
    containerClass?: string
    leftContainerClass?: string
    rightContainerClass?: string
    as?: keyof HTMLElementTagNameMap
  }>(),
  { containerClass: 'mx-2 my-8', as: 'div' }
)
</script>
