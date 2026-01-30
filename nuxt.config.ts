// nuxt.config.ts
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
  ],
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'https://lazy-mail-back-production.up.railway.app',
      googleClientId: process.env.NUXT_PUBLIC_GOOGLE_CLIENT_ID || ''
    }
  },
  app: {
    head: {
      title: 'LazyMail',
      link: [
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap' }
      ],
      script: [
        { src: 'https://accounts.google.com/gsi/client', async: true },
        { src: 'https://www.googletagmanager.com/gtag/js?id=G-03LZ279F3K', async: true },
        { innerHTML: "window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-03LZ279F3K');" }
      ]
    }
  }
})