<script setup>
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar.vue";
</script>

<template>
  <div class="flex min-h-screen">
    <SidebarProvider>
      <AppSidebar />

      <main class="flex-1 p-8 overflow-auto">
        <SidebarTrigger />
        <slot />
        <div class="grid grid-cols-6 gap-4">
  <div class="col-span-4 col-start-2 border-4 border-indigo-500">01</div>
  <div class="col-start-1 col-end-3 ...">02</div>
  <div class="col-span-2 col-end-7 border-4 border-indigo-500">03</div>
  <div class="col-start-1 col-end-7 ...">04</div>
</div>
      </main>
    </SidebarProvider>
  </div>
</template>