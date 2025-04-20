<script setup lang="ts">
defineProps<{
  name: string
  selectedTab: string
}>()
</script>

<template>
  <div v-show="name === selectedTab">
    <slot></slot>
  </div>
</template>