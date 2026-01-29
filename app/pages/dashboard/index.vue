<template>
  <div class="min-h-screen bg-gray-50">
    <AppHeader />

    <!-- Bannière annulation en cours -->
    <div v-if="user?.cancelAtPeriodEnd && user?.subscriptionEndDate" class="bg-amber-500 text-white">
      <div class="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <span class="text-sm font-medium">Votre abonnement PRO se termine le {{ formatDate(user.subscriptionEndDate) }}. Vous pouvez le réactiver à tout moment.</span>
        </div>
        <NuxtLink to="/pricing" class="bg-white text-amber-600 px-4 py-1.5 rounded-lg text-sm font-semibold hover:bg-gray-100 transition">
          Réactiver
        </NuxtLink>
      </div>
    </div>

    <!-- Bannière upgrade pour FREE -->
    <div v-else-if="user?.plan !== 'pro'" class="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
      <div class="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <span class="text-sm font-medium">Plan gratuit : 1 contact max. Passez à PRO pour des contacts illimités !</span>
        </div>
        <NuxtLink to="/pricing" class="bg-white text-purple-600 px-4 py-1.5 rounded-lg text-sm font-semibold hover:bg-gray-100 transition">
          Voir les offres
        </NuxtLink>
      </div>
    </div>

    <main class="max-w-6xl mx-auto px-6 py-8">
      <div class="flex justify-between items-end mb-8">
        <div>
          <h1 class="text-2xl font-bold mb-2">Mes Styles</h1>
          <p class="text-gray-500 text-sm">Gérez les snippets pour chaque contact. L'extension Chrome les utilisera pour générer vos réponses.</p>
        </div>
      </div>

      <div v-if="pending" class="text-center py-20 text-gray-400">Chargement...</div>

      <div v-else-if="!contacts?.length" class="text-center py-20">
        <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 class="text-lg font-semibold mb-2">Aucun contact pour l'instant</h3>
        <p class="text-gray-500 text-sm max-w-md mx-auto mb-6">
          Commencez par utiliser l'extension Chrome sur Gmail. Vos contacts apparaîtront ici automatiquement pour configurer vos styles de réponse.
        </p>
        <a href="#" class="inline-flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-lg font-medium hover:bg-gray-800 transition">
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C8.21 0 4.831 1.757 2.632 4.501l3.953 6.848A5.454 5.454 0 0 1 12 6.545h10.691A12 12 0 0 0 12 0zM1.931 5.47A11.943 11.943 0 0 0 0 12c0 6.012 4.42 10.991 10.189 11.864l3.953-6.847a5.45 5.45 0 0 1-6.865-2.29L1.931 5.47zm13.299 2.347l-3.953 6.847a5.456 5.456 0 0 1-4.346 2.881L3.072 23.4A11.943 11.943 0 0 0 12 24c6.627 0 12-5.373 12-12 0-1.903-.442-3.7-1.231-5.303L15.23 7.817zM12 16.364a4.364 4.364 0 1 1 0-8.728 4.364 4.364 0 0 1 0 8.728z"/>
          </svg>
          Télécharger l'extension Chrome
        </a>
      </div>

      <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <NuxtLink 
          v-for="contact in contacts" 
          :key="contact.id" 
          :to="`/dashboard/contact/${contact.id}`"
          class="bg-white p-6 rounded-xl border border-gray-200 hover:border-black transition duration-200 cursor-pointer group shadow-sm hover:shadow-md block"
        >
          <div class="flex justify-between items-start mb-4">
            <div class="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center font-bold text-gray-700 text-lg border border-gray-100">
              {{ contact.name.charAt(0).toUpperCase() }}
            </div>
            <div class="text-right">
               <span class="text-xs font-medium bg-gray-100 px-2 py-1 rounded text-gray-600">Configurer →</span>
            </div>
          </div>
          
          <h3 class="font-bold text-lg mb-1">{{ contact.name }}</h3>
          <p class="text-sm text-gray-500 font-mono truncate">{{ contact.email }}</p>
        </NuxtLink>
      </div>
    </main>
  </div>
</template>

<script setup>
definePageMeta({ middleware: 'auth' })
const auth = useAuthStore()
const config = useRuntimeConfig()
const { user } = storeToRefs(auth)

const { data: contacts, pending } = await useFetch(`${config.public.apiBase}/contacts`, {
  headers: { Authorization: `Bearer ${auth.token}` }
})

// Sync subscription status from Stripe (handles return from Portal without webhooks)
onMounted(async () => {
  if (auth.user?.plan === 'pro' && auth.token) {
    console.log('[dashboard] Syncing subscription from Stripe...')
    try {
      const result = await $fetch(`${config.public.apiBase}/stripe/sync-subscription`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${auth.token}` }
      })
      console.log('[dashboard] Sync result:', result)
      await auth.refreshUser()
    } catch (e) {
      console.error('[dashboard] Sync failed:', e)
    }
  } else {
    console.log('[dashboard] Skipping sync — plan:', auth.user?.plan, 'token:', !!auth.token)
  }
})

function formatDate(date) {
  return new Date(date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
}
</script>