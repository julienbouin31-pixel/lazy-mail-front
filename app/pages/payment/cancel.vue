<template>
  <div class="min-h-screen bg-gray-50">
    <AppHeader />
    <div class="flex items-center justify-center px-6" style="min-height: calc(100vh - 65px);">
    <div class="max-w-md w-full text-center">
      <div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg class="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>

      <h1 class="text-2xl font-bold mb-3">Paiement annulé</h1>
      <p class="text-gray-600 mb-8">
        Pas de souci ! Vous pouvez revenir quand vous voulez pour passer à PRO.
      </p>

      <div class="flex flex-col sm:flex-row gap-3 justify-center">
        <NuxtLink
          to="/pricing"
          class="inline-flex items-center justify-center gap-2 bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition"
        >
          Revoir les offres
        </NuxtLink>
        <NuxtLink
          to="/dashboard"
          class="inline-flex items-center justify-center gap-2 bg-white text-gray-700 px-6 py-3 rounded-lg font-medium border border-gray-200 hover:bg-gray-50 transition"
        >
          Retour au dashboard
        </NuxtLink>
      </div>
    </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ middleware: 'auth' })
</script>
