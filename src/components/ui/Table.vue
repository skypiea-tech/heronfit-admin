<script setup lang="ts">
import { ref } from 'vue'
export type { Column }
interface Column {
  key: string
  label: string
  type?: 'text' | 'status' | 'actions' | 'date' | 'number'
  sortable?: boolean
  statusColors?: {
    [key: string]: {
      bg: string
      text: string
    }
  }
  width?: string
}

interface Props {
  columns: Column[]
  data: any[]
  maxHeight?: string
  loading?: boolean
  selectable?: boolean
  emptyStateMessage?: string
}

const { 
  columns, 
  data, 
  maxHeight = '500px', 
  loading = false, 
  selectable = false, 
  emptyStateMessage = "No data available" 
} = defineProps<Props>()

const emit = defineEmits(['rowClick', 'sort', 'selectionChange'])

const selectedRows = ref<Set<number>>(new Set())
const sortKey = ref('')
const sortDir = ref<'asc' | 'desc'>('asc')

const getStatusClasses = (status: string, colors: Column['statusColors']) => {
  if (!colors || !colors[status]) {
    // Default status styling using our custom palette
    switch (status.toLowerCase()) {
      case 'active':
      case 'completed':
      case 'approved':
        return 'bg-success text-white'
      case 'pending':
      case 'in progress':
      case 'in review':
        return 'bg-warning text-white'
      case 'inactive':
      case 'failed':
      case 'rejected':
        return 'bg-error text-white'
      case 'draft':
      case 'info':
        return 'bg-info text-white'
      default:
        return 'bg-secondary-light text-white'
    }
  }
  return `${colors[status].bg} ${colors[status].text}`
}

const toggleSelectAll = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.checked) {
    selectedRows.value = new Set(data.map((_, index) => index))
  } else {
    selectedRows.value.clear()
  }
  emit('selectionChange', Array.from(selectedRows.value).map(index => data[index]))
}

const toggleRowSelection = (index: number) => {
  if (selectedRows.value.has(index)) {
    selectedRows.value.delete(index)
  } else {
    selectedRows.value.add(index)
  }
  emit('selectionChange', Array.from(selectedRows.value).map(i => data[i]))
}

const handleSort = (column: Column) => {
  if (!column.sortable) return
  
  if (sortKey.value === column.key) {
    sortDir.value = sortDir.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortKey.value = column.key
    sortDir.value = 'asc'
  }
  
  emit('sort', { key: sortKey.value, direction: sortDir.value })
}

const formatValue = (value: any, type: string = 'text') => {
  if (value == null) return '—'
  
  switch (type) {
    case 'date':
      return new Date(value).toLocaleDateString()
    case 'number':
      return typeof value === 'number' ? value.toLocaleString() : value
    default:
      return value
  }
}
</script>

<template>
  <div class="bg-surface rounded-lg shadow">
    <div class="overflow-x-auto">
      <div :style="{ maxHeight }" class="overflow-y-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-background sticky top-0">
            <tr>
              <th v-if="selectable" class="px-4 py-3 w-10">
                <input 
                  type="checkbox" 
                  class="rounded text-primary focus:ring-primary"
                  :checked="selectedRows.size === data.length && data.length > 0"
                  :disabled="data.length === 0"
                  @change="toggleSelectAll"
                />
              </th>
              <th
                v-for="column in columns"
                :key="column.key"
                class="px-6 py-3 text-left text-xs font-medium text-text-light uppercase tracking-wider"
                :class="{ 'cursor-pointer hover:bg-gray-100': column.sortable }"
                :style="column.width ? { width: column.width } : {}"
                @click="handleSort(column)"
              >
                <div class="flex items-center space-x-1">
                  <span>{{ column.label }}</span>
                  <span v-if="column.sortable && sortKey === column.key">
                    {{ sortDir === 'asc' ? '↑' : '↓' }}
                  </span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody v-if="loading" class="bg-surface divide-y divide-gray-200">
            <tr>
              <td 
                :colspan="selectable ? columns.length + 1 : columns.length"
                class="px-6 py-4 text-center text-text-light"
              >
                <div class="flex justify-center items-center space-x-2">
                  <svg class="animate-spin h-5 w-5 text-primary" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Loading...</span>
                </div>
              </td>
            </tr>
          </tbody>
          <tbody v-else-if="data.length === 0" class="bg-surface divide-y divide-gray-200">
            <tr>
              <td 
                :colspan="selectable ? columns.length + 1 : columns.length"
                class="px-6 py-10 text-center text-text-light"
              >
                {{ emptyStateMessage }}
              </td>
            </tr>
          </tbody>
          <tbody v-else class="bg-surface divide-y divide-gray-200">
            <tr 
              v-for="(row, index) in data" 
              :key="index" 
              class="hover:bg-background transition-colors"
              :class="{ 'bg-primary-light bg-opacity-10': selectedRows.has(index) }"
              @click="emit('rowClick', row)"
            >
              <td v-if="selectable" class="px-4 py-4" @click.stop>
                <input 
                  type="checkbox" 
                  class="rounded text-primary focus:ring-primary"
                  :checked="selectedRows.has(index)"
                  @change="toggleRowSelection(index)"
                />
              </td>
              <td
                v-for="column in columns"
                :key="column.key"
                class="px-6 py-4 whitespace-nowrap text-text"
              >
                <template v-if="column.type === 'status'">
                  <span
                    class="px-2 py-1 text-sm rounded-full"
                    :class="getStatusClasses(row[column.key], column.statusColors)"
                  >
                    {{ row[column.key] }}
                  </span>
                </template>
                <template v-else-if="column.type === 'actions'">
                  <slot :name="column.key" :row="row" :index="index">
                    {{ row[column.key] }}
                  </slot>
                </template>
                <template v-else>
                  {{ formatValue(row[column.key], column.type) }}
                </template>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>