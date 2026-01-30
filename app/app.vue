<template>
  <div class="antialiased text-brand-900 bg-white min-h-screen selection:bg-black selection:text-white">
    <NuxtPage />
  </div>
</template>

<script setup>
useHead({
  titleTemplate: (title) => title ? `${title} - Fit my mail` : 'Fit my mail',
})
</script>