<template>
  <div class="min-h-screen bg-gray-50">
    <AppHeader />

    <main class="max-w-4xl mx-auto px-6 py-16">
      <div class="text-center mb-12">
        <h1 class="text-3xl font-bold mb-4">{{ $t('pricing.title') }}</h1>
        <p class="text-gray-500">{{ $t('pricing.subtitle') }}</p>
      </div>

      <div class="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
        <!-- Free Plan -->
        <div class="bg-white rounded-2xl border border-gray-200 p-8">
          <div class="mb-6">
            <h2 class="text-xl font-bold mb-2">{{ $t('pricing.free.name') }}</h2>
            <p class="text-gray-500 text-sm">{{ $t('pricing.free.description') }}</p>
          </div>

          <div class="mb-6">
            <span class="text-4xl font-bold">{{ $t('pricing.free.price') }}</span>
            <span class="text-gray-400">{{ $t('pricing.free.period') }}</span>
          </div>

          <ul class="space-y-3 mb-8">
            <li class="flex items-center gap-3 text-sm">
              <svg class="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              <span>{{ $t('pricing.free.feature1') }}</span>
            </li>
            <li class="flex items-center gap-3 text-sm">
              <svg class="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              <span>{{ $t('pricing.free.feature2') }}</span>
            </li>
            <li class="flex items-center gap-3 text-sm">
              <svg class="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              <span>{{ $t('pricing.free.feature3') }}</span>
            </li>
          </ul>

          <NuxtLink
            v-if="!auth.isAuthenticated"
            to="/register"
            class="block text-center w-full py-3 px-4 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition"
          >
            {{ $t('pricing.free.cta') }}
          </NuxtLink>
          <div
            v-else-if="currentPlan === 'free'"
            class="block text-center w-full py-3 px-4 bg-gray-100 text-gray-500 rounded-lg font-medium"
          >
            {{ $t('pricing.free.current') }}
          </div>
        </div>

        <!-- Premium Plan -->
        <div class="bg-white rounded-2xl border-2 border-black p-8 relative">
          <div class="absolute -top-3 left-1/2 -translate-x-1/2">
            <span class="bg-black text-white text-xs font-medium px-3 py-1 rounded-full">{{ $t('pricing.premium.badge') }}</span>
          </div>

          <div class="mb-6">
            <h2 class="text-xl font-bold mb-2">{{ $t('pricing.premium.name') }}</h2>
            <p class="text-gray-500 text-sm">{{ $t('pricing.premium.description') }}</p>
          </div>

          <div class="mb-6">
            <span class="text-4xl font-bold">{{ $t('pricing.premium.price') }}</span>
            <span class="text-gray-400">{{ $t('pricing.premium.period') }}</span>
          </div>

          <ul class="space-y-3 mb-8">
            <li class="flex items-center gap-3 text-sm">
              <svg class="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              <span><strong>{{ $t('pricing.premium.feature1') }}</strong></span>
            </li>
            <li class="flex items-center gap-3 text-sm">
              <svg class="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              <span>{{ $t('pricing.premium.feature2') }}</span>
            </li>
            <li class="flex items-center gap-3 text-sm">
              <svg class="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              <span>{{ $t('pricing.premium.feature3') }}</span>
            </li>
            <li class="flex items-center gap-3 text-sm">
              <svg class="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              <span>{{ $t('pricing.premium.feature4') }}</span>
            </li>
          </ul>

          <button
            v-if="!auth.isAuthenticated"
            @click="navigateTo('/login?redirect=/pricing')"
            class="block text-center w-full py-3 px-4 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition"
          >
            {{ $t('pricing.premium.cta') }}
          </button>
          <button
            v-else-if="currentPlan === 'free'"
            @click="upgradeToPremium"
            :disabled="loading"
            class="block text-center w-full py-3 px-4 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition disabled:opacity-50"
          >
            {{ loading ? $t('pricing.premium.redirecting') : $t('pricing.premium.cta') }}
          </button>
          <button
            v-else
            @click="manageSubscription"
            :disabled="loading"
            class="block text-center w-full py-3 px-4 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition disabled:opacity-50"
          >
            {{ loading ? $t('pricing.premium.redirecting') : $t('pricing.premium.manage') }}
          </button>
        </div>
      </div>

      <!-- FAQ -->
      <div class="mt-16 max-w-2xl mx-auto">
        <h2 class="text-xl font-bold text-center mb-8">{{ $t('pricing.faq.title') }}</h2>

        <div class="space-y-6">
          <div>
            <h3 class="font-semibold mb-2">{{ $t('pricing.faq.q1') }}</h3>
            <p class="text-gray-500 text-sm">{{ $t('pricing.faq.a1') }}</p>
          </div>
          <div>
            <h3 class="font-semibold mb-2">{{ $t('pricing.faq.q2') }}</h3>
            <p class="text-gray-500 text-sm">{{ $t('pricing.faq.a2') }}</p>
          </div>
          <div>
            <h3 class="font-semibold mb-2">{{ $t('pricing.faq.q3') }}</h3>
            <p class="text-gray-500 text-sm">{{ $t('pricing.faq.a3') }}</p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
const { t } = useI18n()

useSeoMeta({
  title: () => t('seo.pricing.title'),
  description: () => t('seo.pricing.description'),
  ogTitle: () => t('seo.pricing.title'),
  ogDescription: () => t('seo.pricing.ogDescription'),
  ogUrl: 'https://www.fitmymail.fr/pricing',
})

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
    alert(t('pricing.error'))
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
    alert(t('pricing.error'))
  } finally {
    loading.value = false
  }
}
</script>
