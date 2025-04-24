<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'

interface Option {
  label: string
  value: string
}

interface Props {
  options: Option[]
  modelValue: string
  placeholder?: string
  label?: string
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Select an option',
  label: ''
})

const emit = defineEmits(['update:modelValue'])

const isOpen = ref(false)
const selectedOption = ref(props.options.find(opt => opt.value === props.modelValue)?.label || props.placeholder)

watch(() => props.modelValue, (newValue) => {
  selectedOption.value = props.options.find(opt => opt.value === newValue)?.label || props.placeholder
})

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const selectOption = (option: Option) => {
  emit('update:modelValue', option.value)
  isOpen.value = false
}

// Close dropdown when clicking outside
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  if (!target.closest('.dropdown-container')) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div class="dropdown-container relative">
    <label v-if="label" class="block text-sm font-medium text-text-light mb-1">{{ label }}</label>
    <button
      @click="toggleDropdown"
      class="w-full px-4 py-2 text-left bg-surface border border-table rounded-md hover:bg-surface-hover focus:outline-none focus:ring-2 focus:ring-primary"
    >
      <span class="block truncate">{{ selectedOption }}</span>
      <span class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
        <svg class="h-5 w-5 text-text-light" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </span>
    </button>
    
    <div
      v-if="isOpen"
      class="absolute z-10 w-full mt-1 bg-surface border border-table rounded-md shadow-lg max-h-60 overflow-auto"
    >
      <div class="py-1">
        <button
          v-for="option in options"
          :key="option.value"
          @click="selectOption(option)"
          class="w-full px-4 py-2 text-left hover:bg-surface-hover focus:outline-none focus:bg-surface-hover"
        >
          {{ option.label }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dropdown-container {
  min-width: 200px;
}
</style> 