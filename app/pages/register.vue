<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 px-4">
    <div class="w-full max-w-md bg-white border border-gray-200 p-8 rounded-xl shadow-sm">
      <h2 class="text-2xl font-bold mb-6 text-center">Créer un compte</h2>

      <!-- Error message -->
      <div v-if="error" class="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
        <svg class="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="8" x2="12" y2="12"/>
          <line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
        <span class="text-sm text-red-700">{{ error }}</span>
      </div>

      <!-- Google Sign-Up Button -->
      <button
        @click="handleGoogleSignUp"
        :disabled="loading || googleLoading"
        class="w-full flex items-center justify-center gap-3 px-4 py-2.5 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed mb-4"
      >
        <svg class="w-5 h-5" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
        {{ googleLoading ? 'Inscription...' : "S'inscrire avec Google" }}
      </button>

      <!-- Separator -->
      <div class="relative my-6">
        <div class="absolute inset-0 flex items-center">
          <div class="w-full border-t border-gray-200"></div>
        </div>
        <div class="relative flex justify-center text-sm">
          <span class="px-4 bg-white text-gray-500">ou</span>
        </div>
      </div>

      <form @submit.prevent="handleRegister" class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-1">Nom</label>
          <input
            v-model="form.name"
            type="text"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-black focus:border-black outline-none transition"
            required
          />
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">Email</label>
          <input
            v-model="form.email"
            type="email"
            class="w-full px-3 py-2 border rounded-lg outline-none transition"
            :class="emailError ? 'border-red-300 focus:ring-1 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-1 focus:ring-black focus:border-black'"
            required
          />
          <p v-if="emailError" class="mt-1 text-xs text-red-600">{{ emailError }}</p>
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">Mot de passe</label>
          <input
            v-model="form.password"
            type="password"
            class="w-full px-3 py-2 border rounded-lg outline-none transition"
            :class="passwordError ? 'border-red-300 focus:ring-1 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-1 focus:ring-black focus:border-black'"
            required
            minlength="6"
          />
          <p v-if="passwordError" class="mt-1 text-xs text-red-600">{{ passwordError }}</p>
          <p v-else class="mt-1 text-xs text-gray-500">Minimum 6 caractères</p>
        </div>

        <button type="submit" :disabled="loading || googleLoading" class="w-full bg-black text-white py-2.5 rounded-lg font-medium hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed">
          {{ loading ? 'Création...' : "S'inscrire" }}
        </button>
      </form>

      <!-- Extension context info -->
      <div v-if="isFromExtension" class="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <p class="text-xs text-blue-700 text-center">
          Inscription depuis l'extension Fit my mail
        </p>
      </div>

      <p class="mt-4 text-center text-sm text-gray-500">
        Déjà un compte ? <NuxtLink :to="loginLink" class="text-black hover:underline">Se connecter</NuxtLink>
      </p>
      <p class="mt-2 text-center text-sm">
        <NuxtLink to="/" class="text-gray-400 hover:text-black">← Retour au site</NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const auth = useAuthStore()
const { signInWithGoogle, loading: googleLoading } = useGoogleAuth()
const form = reactive({ name: '', email: '', password: '' })
const loading = ref(false)
const error = ref('')
const emailError = ref('')
const passwordError = ref('')

// Check if coming from extension
const isFromExtension = computed(() => route.query.from === 'extension')
const loginLink = computed(() => isFromExtension.value ? '/login?from=extension' : '/login')

function redirectAfterRegister() {
  if (isFromExtension.value && auth.token && auth.user) {
    // Redirect to extension callback with token in hash fragment (more secure - not sent to server)
    // Use window.location.href for full page reload to trigger content script injection
    const userParam = encodeURIComponent(JSON.stringify(auth.user))
    window.location.href = `/auth/extension-callback#token=${auth.token}&user=${userParam}`
  } else {
    navigateTo('/dashboard')
  }
}

function validateForm() {
  emailError.value = ''
  passwordError.value = ''

  if (form.password.length < 6) {
    passwordError.value = 'Le mot de passe doit contenir au moins 6 caractères'
    return false
  }

  return true
}

async function handleRegister() {
  error.value = ''

  if (!validateForm()) return

  loading.value = true
  const result = await auth.register(form.email, form.password, form.name)
  loading.value = false

  if (result.success) {
    redirectAfterRegister()
  } else {
    // Check if it's an email-specific error
    if (result.error?.includes('email') || result.error?.includes('compte')) {
      emailError.value = result.error
    } else {
      error.value = result.error || 'Une erreur est survenue'
    }
  }
}

async function handleGoogleSignUp() {
  error.value = ''
  emailError.value = ''
  const result = await signInWithGoogle()

  if (result.success) {
    redirectAfterRegister()
  } else {
    error.value = result.error || 'Erreur lors de l\'inscription Google'
  }
}
</script>
