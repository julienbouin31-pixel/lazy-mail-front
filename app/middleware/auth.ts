import { useAuthStore } from "~/stores/auth"

export default defineNuxtRouteMiddleware(async (to, from) => {
  const auth = useAuthStore()
  if (!auth.isAuthenticated) {
    return navigateTo('/login')
  }

  // Recharger les données utilisateur si le token existe mais que user est absent (ex: retour depuis Stripe)
  if (!auth.user) {
    await auth.refreshUser()
  }
})