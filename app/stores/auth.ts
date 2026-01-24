// stores/auth.ts
import { useCookie, useRuntimeConfig, useState } from 'nuxt/app'
import { defineStore } from 'pinia'
import { computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const token = useCookie('auth_token')
  const user = useState('auth_user', () => null)
  const config = useRuntimeConfig()

  // Vérifie si on est connecté
  const isAuthenticated = computed(() => !!token.value)

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
      const message = error?.data?.message || error?.message || 'Erreur de connexion'
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
      const message = error?.data?.message || error?.message || 'Erreur lors de l\'inscription'
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
      const message = error?.data?.message || error?.message || 'Erreur de connexion Google'
      return { success: false, error: translateError(message) }
    }
  }

  function translateError(message: string): string {
    const translations: Record<string, string> = {
      'Invalid credentials': 'Email ou mot de passe incorrect',
      'User already exists': 'Un compte avec cet email existe déjà',
      'Unauthorized': 'Non autorisé',
      'Invalid Google token': 'Token Google invalide',
      'Failed to validate Google token': 'Échec de validation du token Google',
    }
    return translations[message] || message
  }

  function logout() {
    token.value = null
    user.value = null
    navigateTo('/')
  }

  return { token, user, isAuthenticated, login, register, loginWithGoogle, logout }
})