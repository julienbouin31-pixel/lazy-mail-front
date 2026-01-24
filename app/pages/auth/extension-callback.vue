<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 px-4">
    <div class="w-full max-w-md bg-white border border-gray-200 p-8 rounded-xl shadow-sm text-center">
      <!-- Success state -->
      <div v-if="success">
        <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </div>
        <h2 class="text-xl font-bold mb-2">Connexion réussie !</h2>
        <p class="text-gray-600 text-sm mb-4">
          Vous pouvez fermer cet onglet et retourner à l'extension LazyMail.
        </p>
        <p class="text-xs text-gray-400">
          Cet onglet se fermera automatiquement...
        </p>
      </div>

      <!-- Loading state -->
      <div v-else-if="loading">
        <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8 text-gray-400 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
          </svg>
        </div>
        <h2 class="text-xl font-bold mb-2">Connexion en cours...</h2>
        <p class="text-gray-600 text-sm">Veuillez patienter</p>
      </div>

      <!-- Error state -->
      <div v-else>
        <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10"/>
            <line x1="15" y1="9" x2="9" y2="15"/>
            <line x1="9" y1="9" x2="15" y2="15"/>
          </svg>
        </div>
        <h2 class="text-xl font-bold mb-2">Erreur de connexion</h2>
        <p class="text-gray-600 text-sm mb-4">{{ error || 'Une erreur est survenue' }}</p>
        <NuxtLink to="/login?from=extension" class="text-black hover:underline text-sm">
          Réessayer
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const loading = ref(true)
const success = ref(false)
const error = ref('')

// Parse hash fragment parameters (more secure than query params)
function parseHashParams(): { token: string | null; user: string | null } {
  const hash = window.location.hash.substring(1) // Remove the #
  const params = new URLSearchParams(hash)
  return {
    token: params.get('token'),
    user: params.get('user')
  }
}

onMounted(async () => {
  const { token, user: userJson } = parseHashParams()

  // Clear the hash from URL for extra security
  if (window.history.replaceState) {
    window.history.replaceState(null, '', window.location.pathname)
  }

  if (!token) {
    loading.value = false
    error.value = 'Token manquant'
    return
  }

  try {
    // Parse user data
    const user = userJson ? JSON.parse(decodeURIComponent(userJson)) : null

    // Wait for the extension content script to be ready
    const extensionReady = await waitForExtension()

    if (!extensionReady) {
      // Extension not detected - show manual instructions
      loading.value = false
      error.value = 'Extension non détectée. Assurez-vous que l\'extension LazyMail est installée et activée.'
      return
    }

    // Send token to extension via postMessage
    // The extension's content script will listen for this
    window.postMessage({
      type: 'LAZYMAIL_AUTH_SUCCESS',
      token,
      user
    }, '*')

    // Also try to send via BroadcastChannel (backup method)
    try {
      const channel = new BroadcastChannel('lazymail_auth')
      channel.postMessage({ type: 'LAZYMAIL_AUTH_SUCCESS', token, user })
      channel.close()
    } catch (e) {
      // BroadcastChannel not supported, that's ok
    }

    // Wait for confirmation from extension
    const received = await waitForConfirmation()

    if (received) {
      success.value = true
      loading.value = false

      // Auto-close after 2 seconds
      setTimeout(() => {
        window.close()
      }, 2000)
    } else {
      // Fallback: assume it worked if extension was ready
      success.value = true
      loading.value = false
      setTimeout(() => {
        window.close()
      }, 2000)
    }

  } catch (e) {
    loading.value = false
    error.value = 'Erreur lors de la transmission du token'
  }
})

function waitForExtension(): Promise<boolean> {
  return new Promise((resolve) => {
    let attempts = 0
    const maxAttempts = 10

    const handler = (event: MessageEvent) => {
      if (event.data?.type === 'LAZYMAIL_EXTENSION_READY') {
        window.removeEventListener('message', handler)
        resolve(true)
      }
    }

    window.addEventListener('message', handler)

    // Check if already ready
    window.postMessage({ type: 'LAZYMAIL_EXTENSION_READY_CHECK' }, '*')

    // Retry a few times
    const interval = setInterval(() => {
      attempts++
      if (attempts >= maxAttempts) {
        clearInterval(interval)
        window.removeEventListener('message', handler)
        resolve(false)
      }
      window.postMessage({ type: 'LAZYMAIL_EXTENSION_READY_CHECK' }, '*')
    }, 200)

    // Timeout after 2 seconds
    setTimeout(() => {
      clearInterval(interval)
      window.removeEventListener('message', handler)
      resolve(false)
    }, 2000)
  })
}

function waitForConfirmation(): Promise<boolean> {
  return new Promise((resolve) => {
    const handler = (event: MessageEvent) => {
      if (event.data?.type === 'LAZYMAIL_AUTH_RECEIVED') {
        window.removeEventListener('message', handler)
        resolve(true)
      }
    }

    window.addEventListener('message', handler)

    // Timeout after 1 second
    setTimeout(() => {
      window.removeEventListener('message', handler)
      resolve(false)
    }, 1000)
  })
}
</script>
