<template>
  <div class="min-h-screen bg-gray-50">
    <AppHeader />

    <main class="max-w-4xl mx-auto px-6 py-16">
      <div class="text-center mb-12">
        <h1 class="text-3xl font-bold mb-4">Tarifs simples et transparents</h1>
        <p class="text-gray-500">Choisissez le plan qui vous convient</p>
      </div>

      <div class="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
        <!-- Free Plan -->
        <div class="bg-white rounded-2xl border border-gray-200 p-8">
          <div class="mb-6">
            <h2 class="text-xl font-bold mb-2">Gratuit</h2>
            <p class="text-gray-500 text-sm">Pour découvrir Fit my mail</p>
          </div>

          <div class="mb-6">
            <span class="text-4xl font-bold">0€</span>
            <span class="text-gray-400">/mois</span>
          </div>

          <ul class="space-y-3 mb-8">
            <li class="flex items-center gap-3 text-sm">
              <svg class="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              <span>1 contact</span>
            </li>
            <li class="flex items-center gap-3 text-sm">
              <svg class="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              <span>Génération illimitée de réponses</span>
            </li>
            <li class="flex items-center gap-3 text-sm">
              <svg class="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              <span>Extension Chrome</span>
            </li>
          </ul>

          <NuxtLink
            v-if="!auth.isAuthenticated"
            to="/register"
            class="block text-center w-full py-3 px-4 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition"
          >
            Commencer gratuitement
          </NuxtLink>
          <div
            v-else-if="currentPlan === 'free'"
            class="block text-center w-full py-3 px-4 bg-gray-100 text-gray-500 rounded-lg font-medium"
          >
            Plan actuel
          </div>
        </div>

        <!-- Premium Plan -->
        <div class="bg-white rounded-2xl border-2 border-black p-8 relative">
          <div class="absolute -top-3 left-1/2 -translate-x-1/2">
            <span class="bg-black text-white text-xs font-medium px-3 py-1 rounded-full">Populaire</span>
          </div>

          <div class="mb-6">
            <h2 class="text-xl font-bold mb-2">Premium</h2>
            <p class="text-gray-500 text-sm">Pour les utilisateurs réguliers</p>
          </div>

          <div class="mb-6">
            <span class="text-4xl font-bold">7€</span>
            <span class="text-gray-400">/mois</span>
          </div>

          <ul class="space-y-3 mb-8">
            <li class="flex items-center gap-3 text-sm">
              <svg class="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              <span><strong>Contacts illimités</strong></span>
            </li>
            <li class="flex items-center gap-3 text-sm">
              <svg class="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              <span>Génération illimitée de réponses</span>
            </li>
            <li class="flex items-center gap-3 text-sm">
              <svg class="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              <span>Extension Chrome</span>
            </li>
            <li class="flex items-center gap-3 text-sm">
              <svg class="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              <span>Support prioritaire</span>
            </li>
          </ul>

          <button
            v-if="!auth.isAuthenticated"
            @click="navigateTo('/login?redirect=/pricing')"
            class="block text-center w-full py-3 px-4 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition"
          >
            Passer à Premium
          </button>
          <button
            v-else-if="currentPlan === 'free'"
            @click="upgradeToPremium"
            :disabled="loading"
            class="block text-center w-full py-3 px-4 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition disabled:opacity-50"
          >
            {{ loading ? 'Redirection...' : 'Passer à Premium' }}
          </button>
          <button
            v-else
            @click="manageSubscription"
            :disabled="loading"
            class="block text-center w-full py-3 px-4 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition disabled:opacity-50"
          >
            {{ loading ? 'Redirection...' : 'Gérer mon abonnement' }}
          </button>
        </div>
      </div>

      <!-- FAQ -->
      <div class="mt-16 max-w-2xl mx-auto">
        <h2 class="text-xl font-bold text-center mb-8">Questions fréquentes</h2>

        <div class="space-y-6">
          <div>
            <h3 class="font-semibold mb-2">Puis-je annuler à tout moment ?</h3>
            <p class="text-gray-500 text-sm">Oui, vous pouvez annuler votre abonnement à tout moment. Vous conserverez l'accès jusqu'à la fin de la période payée.</p>
          </div>
          <div>
            <h3 class="font-semibold mb-2">Comment fonctionne la limite de contacts ?</h3>
            <p class="text-gray-500 text-sm">Chaque contact représente une personne pour laquelle vous avez enregistré des exemples de style d'écriture. Le plan gratuit permet 1 contact, le plan Premium offre des contacts illimités.</p>
          </div>
          <div>
            <h3 class="font-semibold mb-2">Le paiement est-il sécurisé ?</h3>
            <p class="text-gray-500 text-sm">Oui, tous les paiements sont traités par Stripe, leader mondial du paiement en ligne. Nous ne stockons jamais vos informations bancaires.</p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
const auth = useAuthStore()
const config = useRuntimeConfig()
const loading = ref(false)

const currentPlan = computed(() => auth.user?.plan || 'free')

async function upgradeToPremium() {
  loading.value = true
  try {
    const response = await $fetch(`${config.public.apiBase}/stripe/create-checkout-session`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${auth.token}` }
    })
    if (response.url) {
      window.location.href = response.url
    }
  } catch (error) {
    console.error('Error creating checkout session:', error)
    alert('Une erreur est survenue. Veuillez réessayer.')
  } finally {
    loading.value = false
  }
}

async function manageSubscription() {
  loading.value = true
  try {
    const response = await $fetch(`${config.public.apiBase}/stripe/create-portal-session`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${auth.token}` }
    })
    if (response.url) {
      window.location.href = response.url
    }
  } catch (error) {
    console.error('Error creating portal session:', error)
    alert('Une erreur est survenue. Veuillez réessayer.')
  } finally {
    loading.value = false
  }
}
</script>
