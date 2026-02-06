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
        <h2 class="text-xl font-bold mb-2">{{ $t('extensionCallback.success.title') }}</h2>
        <p class="text-gray-600 text-sm mb-4">
          {{ $t('extensionCallback.success.description') }}
        </p>
        <p class="text-xs text-gray-400">
          {{ $t('extensionCallback.success.autoClose') }}
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
        <h2 class="text-xl font-bold mb-2">{{ $t('extensionCallback.loading.title') }}</h2>
        <p class="text-gray-600 text-sm">{{ $t('extensionCallback.loading.description') }}</p>
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
        <h2 class="text-xl font-bold mb-2">{{ $t('extensionCallback.error.title') }}</h2>
        <p class="text-gray-600 text-sm mb-4">{{ error || $t('extensionCallback.error.default') }}</p>
        <NuxtLink to="/login?from=extension" class="text-black hover:underline text-sm">
          {{ $t('extensionCallback.error.retry') }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

const loading = ref(true)
const success = ref(false)
const error = ref('')

function parseHashParams(): { token: string | null; user: string | null } {
  const hash = window.location.hash.substring(1)
  const params = new URLSearchParams(hash)
  return {
    token: params.get('token'),
    user: params.get('user')
  }
}

onMounted(async () => {
  const { token, user: userJson } = parseHashParams()

  if (window.history.replaceState) {
    window.history.replaceState(null, '', window.location.pathname)
  }

  if (!token) {
    loading.value = false
    error.value = t('extensionCallback.error.missingToken')
    return
  }

  try {
    const user = userJson ? JSON.parse(decodeURIComponent(userJson)) : null

    const extensionReady = await waitForExtension()

    if (!extensionReady) {
      loading.value = false
      error.value = t('extensionCallback.error.extensionNotDetected')
      return
    }

    window.postMessage({
      type: 'FITMYMAIL_AUTH_SUCCESS',
      token,
      user
    }, '*')

    try {
      const channel = new BroadcastChannel('fitmymail_auth')
      channel.postMessage({ type: 'FITMYMAIL_AUTH_SUCCESS', token, user })
      channel.close()
    } catch (e) {
      // BroadcastChannel not supported, that's ok
    }

    const received = await waitForConfirmation()

    if (received) {
      success.value = true
      loading.value = false
      setTimeout(() => { window.close() }, 2000)
    } else {
      success.value = true
      loading.value = false
      setTimeout(() => { window.close() }, 2000)
    }

  } catch (e) {
    loading.value = false
    error.value = t('extensionCallback.error.tokenTransfer')
  }
})

function waitForExtension(): Promise<boolean> {
  return new Promise((resolve) => {
    let attempts = 0
    const maxAttempts = 10

    const handler = (event: MessageEvent) => {
      if (event.data?.type === 'FITMYMAIL_EXTENSION_READY') {
        window.removeEventListener('message', handler)
        resolve(true)
      }
    }

    window.addEventListener('message', handler)
    window.postMessage({ type: 'FITMYMAIL_EXTENSION_READY_CHECK' }, '*')

    const interval = setInterval(() => {
      attempts++
      if (attempts >= maxAttempts) {
        clearInterval(interval)
        window.removeEventListener('message', handler)
        resolve(false)
      }
      window.postMessage({ type: 'FITMYMAIL_EXTENSION_READY_CHECK' }, '*')
    }, 200)

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
      if (event.data?.type === 'FITMYMAIL_AUTH_RECEIVED') {
        window.removeEventListener('message', handler)
        resolve(true)
      }
    }

    window.addEventListener('message', handler)
    setTimeout(() => {
      window.removeEventListener('message', handler)
      resolve(false)
    }, 1000)
  })
}
</script>
