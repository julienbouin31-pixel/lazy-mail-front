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

    <!-- Modal sélection contact actif -->
    <div v-if="showSelectModal" class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div class="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl">
        <h2 class="text-lg font-bold mb-2">Choisissez votre contact actif</h2>
        <p class="text-sm text-gray-500 mb-6">Votre plan gratuit est limité à 1 contact. Les autres seront bloqués mais pas supprimés. Passez à PRO pour tous les débloquer.</p>
        <div class="space-y-3 mb-6">
          <button
            v-for="contact in contacts"
            :key="contact.id"
            @click="selectActiveContact(contact.id)"
            :disabled="settingActive"
            class="w-full flex items-center gap-4 p-4 rounded-xl border-2 transition hover:border-black"
            :class="selectedContactId === contact.id ? 'border-black bg-gray-50' : 'border-gray-200'"
          >
            <div class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center font-bold text-gray-700 border border-gray-200 shrink-0">
              {{ contact.name.charAt(0).toUpperCase() }}
            </div>
            <div class="text-left">
              <div class="font-semibold text-sm">{{ contact.name }}</div>
              <div class="text-xs text-gray-500 font-mono">{{ contact.email }}</div>
            </div>
          </button>
        </div>
        <NuxtLink to="/pricing" class="block text-center text-sm text-purple-600 font-medium hover:underline">
          Passer à PRO pour tous les débloquer
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
        <!-- Contact actif (non-locké) -->
        <NuxtLink
          v-for="contact in contacts"
          :key="contact.id"
          :to="contact.locked ? undefined : `/dashboard/contact/${contact.id}`"
          :class="[
            'p-6 rounded-xl border transition duration-200 block',
            contact.locked
              ? 'bg-gray-50 border-gray-200 opacity-60 cursor-not-allowed'
              : 'bg-white border-gray-200 hover:border-black cursor-pointer group shadow-sm hover:shadow-md'
          ]"
          @click.prevent="contact.locked && showLockedMessage()"
        >
          <div class="flex justify-between items-start mb-4">
            <div :class="[
              'w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg border',
              contact.locked ? 'bg-gray-100 text-gray-400 border-gray-200' : 'bg-gray-50 text-gray-700 border-gray-100'
            ]">
              {{ contact.name.charAt(0).toUpperCase() }}
            </div>
            <div class="text-right">
              <span v-if="contact.locked" class="text-xs font-medium bg-purple-100 px-2 py-1 rounded text-purple-600 inline-flex items-center gap-1">
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                PRO
              </span>
              <span v-else class="text-xs font-medium bg-gray-100 px-2 py-1 rounded text-gray-600">Configurer →</span>
            </div>
          </div>

          <h3 :class="['font-bold text-lg mb-1', contact.locked ? 'text-gray-400' : '']">{{ contact.name }}</h3>
          <p :class="['text-sm font-mono truncate', contact.locked ? 'text-gray-300' : 'text-gray-500']">{{ contact.email }}</p>
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

const { data: contacts, pending, refresh: refreshContacts } = await useFetch(`${config.public.apiBase}/contacts`, {
  headers: { Authorization: `Bearer ${auth.token}` }
})

const showSelectModal = ref(false)
const selectedContactId = ref(null)
const settingActive = ref(false)

// Show selection modal if FREE user with >1 contacts and no activeContactId
watch([contacts, user], () => {
  if (
    user.value?.plan === 'free' &&
    contacts.value?.length > 1 &&
    !user.value?.activeContactId
  ) {
    showSelectModal.value = true
  }
}, { immediate: true })

async function selectActiveContact(contactId) {
  settingActive.value = true
  selectedContactId.value = contactId
  try {
    await $fetch(`${config.public.apiBase}/contacts/${contactId}/set-active`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${auth.token}` }
    })
    await auth.refreshUser()
    await refreshContacts()
    showSelectModal.value = false
  } catch (e) {
    console.error('Failed to set active contact:', e)
  } finally {
    settingActive.value = false
  }
}

function showLockedMessage() {
  alert('Ce contact est bloqué. Passez à PRO pour débloquer tous vos contacts.')
}

// Sync subscription status from Stripe (handles return from Portal without webhooks)
onMounted(async () => {
  if (auth.user?.plan === 'pro' && auth.token) {
    try {
      await $fetch(`${config.public.apiBase}/stripe/sync-subscription`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${auth.token}` }
      })
      await auth.refreshUser()
      await refreshContacts()
    } catch (e) {
      // Silent fail
    }
  }
})

function formatDate(date) {
  return new Date(date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
}
</script>
