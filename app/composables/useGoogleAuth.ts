// composables/useGoogleAuth.ts
declare global {
  interface Window {
    google: any
  }
}

export function useGoogleAuth() {
  const config = useRuntimeConfig()
  const auth = useAuthStore()
  const { t } = useI18n()
  const loading = ref(false)
  const error = ref('')

  async function signInWithGoogle(): Promise<{ success: boolean; error?: string }> {
    loading.value = true
    error.value = ''

    return new Promise((resolve) => {
      if (!window.google) {
        loading.value = false
        const errorMsg = t('errors.googleNotAvailable')
        error.value = errorMsg
        resolve({ success: false, error: errorMsg })
        return
      }

      const client = window.google.accounts.oauth2.initTokenClient({
        client_id: config.public.googleClientId,
        scope: 'email profile',
        callback: async (response: any) => {
          if (response.error) {
            loading.value = false
            const errorMsg = t('errors.googleCancelled')
            error.value = errorMsg
            resolve({ success: false, error: errorMsg })
            return
          }

          // Send the access token to our backend
          const result = await auth.loginWithGoogle(response.access_token)
          loading.value = false

          if (!result.success) {
            error.value = result.error || t('errors.googleLoginError')
          }

          resolve(result)
        },
      })

      client.requestAccessToken()
    })
  }

  return {
    signInWithGoogle,
    loading,
    error
  }
}
