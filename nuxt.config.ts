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
      title: 'Fit my mail',
      htmlAttrs: { lang: 'fr' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Fit my mail apprend votre style d\'écriture et rédige vos réponses email automatiquement. Extension Chrome gratuite pour Gmail.' },
        { name: 'author', content: 'Fit my mail' },
        // Open Graph
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'Fit my mail' },
        { property: 'og:locale', content: 'fr_FR' },
        { property: 'og:title', content: 'Fit my mail — Ne répondez plus jamais à vos emails' },
        { property: 'og:description', content: 'L\'IA qui apprend votre style d\'écriture et rédige vos réponses email. Extension Chrome gratuite pour Gmail.' },
        { property: 'og:url', content: 'https://www.fitmymail.fr' },
        // Twitter Card
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Fit my mail — Ne répondez plus jamais à vos emails' },
        { name: 'twitter:description', content: 'L\'IA qui apprend votre style d\'écriture et rédige vos réponses email. Extension Chrome gratuite pour Gmail.' },
      ],
      link: [
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap' },
        { rel: 'canonical', href: 'https://www.fitmymail.fr' },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      ],
      script: [
        { src: 'https://accounts.google.com/gsi/client', async: true },
        { src: 'https://www.googletagmanager.com/gtag/js?id=G-03LZ279F3K', async: true },
        { innerHTML: "window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-03LZ279F3K');" }
      ]
    }
  }
})