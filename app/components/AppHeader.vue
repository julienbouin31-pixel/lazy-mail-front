<template>
  <header class="bg-white border-b border-gray-200 sticky top-0 z-50">
    <div class="max-w-6xl mx-auto px-6 h-16 flex justify-between items-center">
      <NuxtLink to="/" class="font-bold text-xl tracking-tight">Fit my mail.</NuxtLink>

      <!-- Connecté -->
      <div v-if="auth.isAuthenticated" class="flex items-center gap-4">
        <NuxtLink to="/pricing" class="text-sm text-gray-500 hover:text-gray-900 transition">Tarifs</NuxtLink>
        <NuxtLink to="/dashboard" class="text-sm text-gray-500 hover:text-gray-900 transition">Dashboard</NuxtLink>

        <!-- User menu -->
        <div class="relative pl-4 border-l border-gray-200">
          <button
            @click="menuOpen = !menuOpen"
            class="flex items-center gap-2 hover:opacity-80 transition"
          >
            <div class="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm font-semibold text-gray-600">
              {{ (user?.name || user?.email || '?').charAt(0).toUpperCase() }}
            </div>
            <span
              :class="[
                'text-xs font-semibold px-2 py-0.5 rounded-full',
                user?.plan === 'pro'
                  ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white'
                  : 'bg-gray-100 text-gray-500'
              ]"
            >
              {{ (user?.plan || 'free').toUpperCase() }}
            </span>
            <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <!-- Dropdown -->
          <div
            v-if="menuOpen"
            class="absolute right-0 top-full mt-2 w-64 bg-white border border-gray-200 rounded-xl shadow-lg py-2 z-50"
          >
            <div class="px-4 py-3 border-b border-gray-100">
              <div class="font-medium text-sm truncate">{{ user?.name || 'Utilisateur' }}</div>
              <div class="text-xs text-gray-500 truncate">{{ user?.email }}</div>
            </div>

            <div class="py-1">
              <button
                v-if="user?.plan === 'pro'"
                @click="manageSubscription"
                :disabled="loadingPortal"
                class="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition flex items-center gap-3"
              >
                <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                {{ loadingPortal ? 'Redirection...' : 'Gérer mon abonnement' }}
              </button>
              <NuxtLink
                v-else
                to="/pricing"
                @click="menuOpen = false"
                class="w-full text-left px-4 py-2.5 text-sm text-purple-600 hover:bg-purple-50 transition flex items-center gap-3"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Passer à PRO
              </NuxtLink>
            </div>

            <div class="border-t border-gray-100 py-1">
              <button
                @click="handleLogout"
                class="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition flex items-center gap-3"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Déconnexion
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Non connecté -->
      <div v-else class="flex items-center gap-6">
        <NuxtLink to="/pricing" class="text-sm font-medium text-gray-600 hover:text-gray-900 transition">Tarifs</NuxtLink>
        <NuxtLink to="/login" class="text-sm font-medium text-gray-600 hover:text-gray-900 transition">Connexion</NuxtLink>
        <NuxtLink to="/register" class="text-sm font-medium bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition">
          S'inscrire
        </NuxtLink>
      </div>
    </div>

    <!-- Click outside overlay -->
    <div v-if="menuOpen" class="fixed inset-0 z-40" @click="menuOpen = false"></div>
  </header>
</template>

<script setup>
const auth = useAuthStore()
const config = useRuntimeConfig()
const { user } = storeToRefs(auth)

const menuOpen = ref(false)
const loadingPortal = ref(false)

async function manageSubscription() {
  loadingPortal.value = true
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
  } finally {
    loadingPortal.value = false
    menuOpen.value = false
  }
}

function handleLogout() {
  menuOpen.value = false
  auth.logout()
}
</script>
