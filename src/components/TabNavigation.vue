<script setup lang="ts">
defineProps<{
  tabs: { name: string; key: string }[]
  modelValue: string
}>()

defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
</script>

<template>
  <div class="border-b border-table">
    <nav class="flex space-x-8">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        @click="$emit('update:modelValue', tab.key)"
        :class="[
          'py-4 px-1 border-b-2 font-medium text-sm',
          modelValue === tab.key
            ? 'border-primary text-primary'
            : 'border-transparent text-text-light hover:text-text hover:border-table'
        ]"
      >
        {{ tab.name }}
      </button>
    </nav>
  </div>
</template>