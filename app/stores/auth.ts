// stores/auth.ts
import { useCookie, useRuntimeConfig, useState } from 'nuxt/app'
import { defineStore } from 'pinia'
import { computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const token = useCookie('auth_token')
  const user = useState('auth_user', () => null)
  const config = useRuntimeConfig()

  const isAuthenticated = computed(() => !!token.value)

  function getTranslator() {
    try {
      const { $i18n } = useNuxtApp()
      return $i18n.t.bind($i18n)
    } catch {
      return (key: string) => key
    }
  }

  async function login(email: string, password: string): Promise<{ success: boolean; error?: string }> {
    try {
      const data = await $fetch(`${config.public.apiBase}/auth/login`, {
        method: 'POST',
        body: { email, password }
      })

      token.value = data.access_token
      user.value = data.user
      return { success: true }
    } catch (error: any) {
      const message = error?.data?.message || error?.message || ''
      return { success: false, error: translateError(message) }
    }
  }

  async function register(email: string, password: string, name: string): Promise<{ success: boolean; error?: string }> {
    try {
      const data = await $fetch(`${config.public.apiBase}/auth/register`, {
        method: 'POST',
        body: { email, password, name }
      })

      token.value = data.access_token
      user.value = data.user
      return { success: true }
    } catch (error: any) {
      const message = error?.data?.message || error?.message || ''
      return { success: false, error: translateError(message) }
    }
  }

  async function loginWithGoogle(accessToken: string): Promise<{ success: boolean; error?: string }> {
    try {
      const data = await $fetch(`${config.public.apiBase}/auth/google/token`, {
        method: 'POST',
        body: { accessToken }
      })

      token.value = data.access_token
      user.value = data.user
      return { success: true }
    } catch (error: any) {
      const message = error?.data?.message || error?.message || ''
      return { success: false, error: translateError(message) }
    }
  }

  function translateError(message: string): string {
    const t = getTranslator()
    const translations: Record<string, string> = {
      'Invalid credentials': t('errors.invalidCredentials'),
      'User already exists': t('errors.userAlreadyExists'),
      'Unauthorized': t('errors.unauthorized'),
      'Invalid Google token': t('errors.invalidGoogleToken'),
      'Failed to validate Google token': t('errors.failedGoogleValidation'),
    }
    return translations[message] || message || t('errors.loginError')
  }

  async function refreshUser(): Promise<void> {
    if (!token.value) return
    try {
      const data: any = await $fetch(`${config.public.apiBase}/auth/me`, {
        headers: { Authorization: `Bearer ${token.value}` }
      })
      user.value = data
    } catch (error) {
      logout()
    }
  }

  function logout() {
    token.value = null
    user.value = null
    navigateTo('/')
  }

  return { token, user, isAuthenticated, login, register, loginWithGoogle, refreshUser, logout }
})
