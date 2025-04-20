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
  <div class="border-b border-gray-200">
    <nav class="flex space-x-8">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        @click="$emit('update:modelValue', tab.key)"
        :class="[
          'py-4 px-1 border-b-2 font-medium text-sm',
          modelValue === tab.key
            ? 'border-blue-600 text-blue-600'
            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
        ]"
      >
        {{ tab.name }}
      </button>
    </nav>
  </div>
</template>