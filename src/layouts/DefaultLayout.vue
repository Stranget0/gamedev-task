<template>
  <SectionTitle>{{ props.title }}</SectionTitle>
  <component :is="props.as" :class="['box', props.containerClass]" v-bind="$attrs">
    <slot>Content</slot>
  </component>
</template>

<script lang="ts">
interface Props {
  title: string
  containerClass?: string
  as?: keyof HTMLElementTagNameMap
}
</script>
<script setup lang="ts">
import SectionTitle from '@/components/SectionTitle.vue'

defineOptions({
  inheritAttrs: false
})

 const props = withDefaults(defineProps<Props>(), {
  containerClass: 'mx-2 my-8',
  as: 'section'
})

</script>
