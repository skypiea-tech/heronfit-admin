<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning' | 'info'
  size?: 'sm' | 'md' | 'lg'
  icon?: any // Component reference for icon
  iconPosition?: 'left' | 'right'
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}

// Use defineProps directly without assigning to a variable
const { variant = 'primary', size = 'md', iconPosition = 'left', disabled = false, type = 'button', icon } = defineProps<Props>()

const variantClasses = {
  primary: 'bg-primary hover:bg-primary-dark text-white',
  secondary: 'bg-secondary hover:bg-secondary-dark text-white',
  danger: 'bg-error hover:bg-error text-white',
  success: 'bg-success hover:bg-success text-white',
  warning: 'bg-warning hover:bg-warning text-white',
  info: 'bg-info hover:bg-info text-white'
}

const sizeClasses = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2',
  lg: 'px-6 py-3 text-lg'
}

defineEmits(['click'])
</script>

<template>
  <button
    :type="type"
    :disabled="disabled"
    :class="[
      'rounded-md font-medium transition-colors flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2',
      variantClasses[variant],
      sizeClasses[size],
      disabled ? 'opacity-50 cursor-not-allowed' : ''
    ]"
    @click="$emit('click')"
  >
    <component 
      :is="icon" 
      v-if="icon && iconPosition === 'left'"
      class="w-5 h-5"
    />
    <slot></slot>
    <component 
      :is="icon" 
      v-if="icon && iconPosition === 'right'"
      class="w-5 h-5"
    />
  </button>
</template>