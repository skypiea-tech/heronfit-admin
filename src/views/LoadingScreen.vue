<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps<{
  duration?: number
  transition?: 'fade' | 'slide'
}>()

const router = useRouter()

onMounted(() => {
  setTimeout(() => {
    const screen = document.getElementById('loading-screen')
    if (screen) {
      screen.classList.add(props.transition === 'slide' ? 'slide-out' : 'fade-out')
      setTimeout(() => {
        router.push('/authentication')
      }, 500)
    }
  }, props.duration || 5000)
})
</script>

<template>
  <div id="loading-screen" class="fixed inset-0 bg-primary flex items-center justify-center transition-all duration-500">
    <img src="/src/assets/img/heronFitSplashText.png" alt="HeronFitSplashText " class="w-32 h-32">
  </div>
</template>

<style scoped>
.fade-out {
  opacity: 0;
}

.slide-out {
  transform: translateY(-100%);
}
</style>