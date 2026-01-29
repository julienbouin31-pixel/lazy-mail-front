<template>
  <div class="min-h-screen bg-gray-50">
    <AppHeader />
    <div class="flex items-center justify-center px-6" style="min-height: calc(100vh - 65px);">
    <div class="max-w-md w-full text-center">
      <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg class="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <h1 class="text-2xl font-bold mb-3">Paiement réussi !</h1>
      <p class="text-gray-600 mb-8">
        Bienvenue dans LazyMail PRO ! Vous avez maintenant accès à des contacts illimités.
      </p>

      <NuxtLink
        to="/dashboard"
        class="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition"
      >
        Accéder au dashboard
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </NuxtLink>
    </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ middleware: 'auth' })

const auth = useAuthStore()
const config = useRuntimeConfig()
const route = useRoute()

// Vérifier la session Stripe et mettre à jour le plan
onMounted(async () => {
  const sessionId = route.query.session_id
  if (sessionId) {
    try {
      await $fetch(`${config.public.apiBase}/stripe/verify-session`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${auth.token}` },
        body: { sessionId }
      })
    } catch (e) {
      console.error('Failed to verify session:', e)
    }
  }
  await auth.refreshUser()
})
</script>
