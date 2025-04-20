<script setup lang="ts">
interface Props {
  title?: string
  padding?: string
  maxHeight?: string
}

withDefaults(defineProps<Props>(), {
  padding: 'p-6',
  maxHeight: 'auto'
})
</script>

<template>
  <div class="bg-white rounded-lg shadow-md" :style="{ maxHeight }">
    <div :class="padding">
      <h3 v-if="title" class="text-lg font-medium mb-4">{{ title }}</h3>
      <slot></slot>
    </div>
  </div>
</template>