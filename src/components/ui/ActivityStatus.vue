<script setup lang="ts">
import { computed } from 'vue'
import { UserActivity } from '../../models/UserActivity'

interface Props {
  lastActive: string | null
}

const props = defineProps<Props>()

const status = computed(() => {
  return UserActivity.calculateStatus(props.lastActive)
})

const statusClasses = computed(() => {
  return UserActivity.getStatusClasses(status.value)
})
</script>

<template>
  <span 
    class="px-2 py-1 text-xs font-medium rounded-full"
    :class="statusClasses"
  >
    {{ status }}
  </span>
</template> 