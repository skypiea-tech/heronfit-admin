<script setup lang="ts">
import Sidebar from './components/Sidebar.vue'
</script>

<template>
  <div class="flex min-h-screen">
    <Sidebar />
    <main class="ml-[var(--sidebar-width)] flex-1 p-8">
      <router-view></router-view>
    </main>
  </div>
</template>