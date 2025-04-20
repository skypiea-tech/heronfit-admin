<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  tabs: { name: string; key: string }[]
  modelValue: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
</script>

<template>
  <div>
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
    <div class="mt-6">
      <slot></slot>
    </div>
  </div>
</template>