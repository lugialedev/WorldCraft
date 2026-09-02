<script setup>
import * as icons from 'lucide-vue-next'

defineProps({
  name: {
    type: String,
    required: true,
  },
  size: {
    type: [Number, String],
    default: 18, //12, 18, 30
  },
  strokeWidth: {
    type: [Number, String],
    default: 2,
  },
  color: {
    type: String,
    default: 'var(--color-text)',
  },
})
</script>

<template>
  <component
    :is="icons[name]"
    :size="size"
    :stroke-width="strokeWidth"
    :color="color"
    aria-hidden="true"
  />
</template>
