<script setup lang="ts">
import Sidebar from '../components/Sidebar.vue'
</script>

<template>
  <div class="min-h-screen flex bg-background">
    <Sidebar />
    <main class="flex-1 ml-64 min-h-screen">
      <router-view></router-view>
    </main>
  </div>
</template>