<template>
  <div class="min-h-screen bg-white">
    <AppHeader />

    <!-- Hero Section -->
    <section class="max-w-4xl mx-auto px-6 pt-24 pb-20 text-center">
      <div class="inline-block px-3 py-1 mb-6 text-xs font-mono font-medium border border-gray-200 rounded-full bg-gray-50">
        {{ $t('home.badge') }}
      </div>

      <h1 class="text-5xl md:text-6xl font-bold tracking-tight mb-6 leading-tight" v-html="$t('home.heroTitle').replace('\n', '<br class=\'hidden sm:block\'/>')">
      </h1>

      <p class="text-lg text-gray-600 mb-10 max-w-xl mx-auto leading-relaxed">
        {{ $t('home.heroDescription') }}
        <span class="font-medium text-black">{{ $t('home.heroHighlight') }}</span>
      </p>

      <div class="flex flex-col sm:flex-row justify-center gap-4">
        <a href="https://chromewebstore.google.com/detail/fit-my-mail/dgabbbhdpbdmpkohaehpffpghohklekp" target="_blank" rel="noopener" class="bg-black text-white px-8 py-3.5 rounded-xl font-medium text-base border border-black hover:-translate-y-0.5 hover:shadow-lg transition-all inline-flex items-center justify-center gap-3">
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C8.21 0 4.831 1.757 2.632 4.501l3.953 6.848A5.454 5.454 0 0 1 12 6.545h10.691A12 12 0 0 0 12 0zM1.931 5.47A11.943 11.943 0 0 0 0 12c0 6.012 4.42 10.991 10.189 11.864l3.953-6.847a5.45 5.45 0 0 1-6.865-2.29L1.931 5.47zm13.299 2.347l-3.953 6.847a5.456 5.456 0 0 1-4.346 2.881L3.072 23.4A11.943 11.943 0 0 0 12 24c6.627 0 12-5.373 12-12 0-1.903-.442-3.7-1.231-5.303L15.23 7.817zM12 16.364a4.364 4.364 0 1 1 0-8.728 4.364 4.364 0 0 1 0 8.728z"/>
          </svg>
          {{ $t('home.downloadExtension') }}
        </a>
        <a href="#how-it-works" class="px-8 py-3.5 rounded-xl font-medium text-base border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all inline-flex items-center justify-center gap-2">
          {{ $t('home.howItWorksCta') }}
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
          </svg>
        </a>
      </div>
      <p class="text-sm text-gray-400 mt-4">{{ $t('home.chromeOnly') }}</p>
    </section>

    <!-- How it Works Section -->
    <section id="how-it-works" class="bg-gray-50 py-24">
      <div class="max-w-5xl mx-auto px-6">
        <div class="text-center mb-16">
          <span class="text-sm font-semibold text-gray-500 uppercase tracking-wide">{{ $t('home.steps.badge') }}</span>
          <h2 class="text-3xl md:text-4xl font-bold mt-3">{{ $t('home.steps.title') }}</h2>
        </div>

        <div class="grid md:grid-cols-3 gap-6">
          <div class="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div class="w-10 h-10 bg-black text-white rounded-lg flex items-center justify-center font-bold text-sm mb-4">1</div>
            <h3 class="text-lg font-bold mb-2">{{ $t('home.steps.step1Title') }}</h3>
            <p class="text-gray-600 text-sm leading-relaxed">{{ $t('home.steps.step1Description') }}</p>
          </div>

          <div class="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div class="w-10 h-10 bg-black text-white rounded-lg flex items-center justify-center font-bold text-sm mb-4">2</div>
            <h3 class="text-lg font-bold mb-2">{{ $t('home.steps.step2Title') }}</h3>
            <p class="text-gray-600 text-sm leading-relaxed" v-html="$t('home.steps.step2Description')"></p>
          </div>

          <div class="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div class="w-10 h-10 bg-black text-white rounded-lg flex items-center justify-center font-bold text-sm mb-4">3</div>
            <h3 class="text-lg font-bold mb-2">{{ $t('home.steps.step3Title') }}</h3>
            <p class="text-gray-600 text-sm leading-relaxed" v-html="$t('home.steps.step3Description')"></p>
          </div>
        </div>

        <div class="mt-8 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div class="flex items-start gap-4">
            <div class="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg class="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <div>
              <h4 class="font-semibold text-sm mb-1">{{ $t('home.steps.infoTitle') }}</h4>
              <p class="text-gray-600 text-sm" v-html="$t('home.steps.infoDescription')"></p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Two Types of Styles Section -->
    <section class="py-24">
      <div class="max-w-5xl mx-auto px-6">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold mb-4">{{ $t('home.styles.title') }}</h2>
          <p class="text-gray-600 text-lg">{{ $t('home.styles.subtitle') }}</p>
        </div>

        <div class="grid md:grid-cols-2 gap-8">
          <!-- Generic Style -->
          <div class="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg bg-indigo-50 text-indigo-600 border border-indigo-100">G</div>
              <div>
                <h3 class="text-lg font-bold">{{ $t('home.styles.generic.title') }}</h3>
                <span class="text-xs font-medium bg-indigo-100 px-2 py-0.5 rounded text-indigo-600">{{ $t('home.styles.generic.badge') }}</span>
              </div>
            </div>
            <p class="text-gray-600 text-sm leading-relaxed mb-4">{{ $t('home.styles.generic.description') }}</p>
            <ul class="space-y-2">
              <li class="flex items-center gap-2 text-sm text-gray-600">
                <svg class="w-4 h-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
                {{ $t('home.styles.generic.feature1') }}
              </li>
              <li class="flex items-center gap-2 text-sm text-gray-600">
                <svg class="w-4 h-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
                {{ $t('home.styles.generic.feature2') }}
              </li>
              <li class="flex items-center gap-2 text-sm text-gray-600">
                <svg class="w-4 h-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
                {{ $t('home.styles.generic.feature3') }}
              </li>
            </ul>
          </div>

          <!-- Per-Contact Style -->
          <div class="bg-white rounded-2xl p-8 border-2 border-black shadow-sm relative">
            <div class="absolute -top-3 left-6">
              <span class="bg-black text-white text-xs font-medium px-3 py-1 rounded-full">{{ $t('home.styles.perContact.badge') }}</span>
            </div>
            <div class="flex items-center gap-3 mb-4">
              <div class="w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg bg-purple-50 text-purple-600 border border-purple-100">M</div>
              <div>
                <h3 class="text-lg font-bold">{{ $t('home.styles.perContact.title') }}</h3>
              </div>
            </div>
            <p class="text-gray-600 text-sm leading-relaxed mb-4">{{ $t('home.styles.perContact.description') }}</p>
            <ul class="space-y-2">
              <li class="flex items-center gap-2 text-sm text-gray-600">
                <svg class="w-4 h-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
                {{ $t('home.styles.perContact.feature1') }}
              </li>
              <li class="flex items-center gap-2 text-sm text-gray-600">
                <svg class="w-4 h-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
                {{ $t('home.styles.perContact.feature2') }}
              </li>
              <li class="flex items-center gap-2 text-sm text-gray-600">
                <svg class="w-4 h-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
                {{ $t('home.styles.perContact.feature3') }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Demo/Visual Section -->
    <section class="py-24 bg-gray-50">
      <div class="max-w-5xl mx-auto px-6">
        <div class="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 md:p-12 text-white overflow-hidden relative">
          <div class="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>

          <div class="relative z-10 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 class="text-3xl font-bold mb-4">{{ $t('home.demo.title') }}</h2>
              <p class="text-gray-300 leading-relaxed mb-6" v-html="$t('home.demo.description')"></p>
              <ul class="space-y-3">
                <li class="flex items-start gap-3">
                  <div class="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center mt-0.5">
                    <svg class="w-3 h-3 text-green-400" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
                  </div>
                  <span class="text-gray-300">{{ $t('home.demo.feature1') }}</span>
                </li>
                <li class="flex items-start gap-3">
                  <div class="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center mt-0.5">
                    <svg class="w-3 h-3 text-green-400" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
                  </div>
                  <span class="text-gray-300">{{ $t('home.demo.feature2') }}</span>
                </li>
                <li class="flex items-start gap-3">
                  <div class="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center mt-0.5">
                    <svg class="w-3 h-3 text-green-400" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
                  </div>
                  <span class="text-gray-300">{{ $t('home.demo.feature3') }}</span>
                </li>
              </ul>
            </div>

            <div class="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/10">
              <div class="flex items-center gap-3 mb-4 pb-4 border-b border-white/10">
                <div class="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center text-white font-bold">M</div>
                <div>
                  <div class="font-medium">Marie Dupont</div>
                  <div class="text-sm text-gray-400">{{ $t('home.demo.stylesCount') }}</div>
                </div>
              </div>
              <div class="space-y-3 text-sm">
                <div class="bg-white/5 rounded-lg p-3">
                  <div class="text-gray-400 text-xs mb-1">{{ $t('home.demo.emailReceived') }}</div>
                  <div class="text-gray-200">{{ $t('home.demo.emailContent') }}</div>
                </div>
                <div class="flex items-center gap-2 text-gray-400">
                  <svg class="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <polygon points="13,2 3,14 12,14 11,22 21,10 12,10"/>
                  </svg>
                  {{ $t('home.demo.generating') }}
                </div>
                <div class="bg-purple-500/20 border border-purple-500/30 rounded-lg p-3">
                  <div class="text-purple-300 text-xs mb-1">{{ $t('home.demo.generatedReply') }}</div>
                  <div class="text-white">{{ $t('home.demo.replyContent') }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="py-24">
      <div class="max-w-3xl mx-auto px-6">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold">{{ $t('home.faq.title') }}</h2>
        </div>

        <div class="space-y-4">
          <div class="bg-white rounded-xl p-6 border border-gray-100">
            <h3 class="font-semibold mb-2">{{ $t('home.faq.q1') }}</h3>
            <p class="text-gray-600 text-sm leading-relaxed">{{ $t('home.faq.a1') }}</p>
          </div>
          <div class="bg-white rounded-xl p-6 border border-gray-100">
            <h3 class="font-semibold mb-2">{{ $t('home.faq.q2') }}</h3>
            <p class="text-gray-600 text-sm leading-relaxed">{{ $t('home.faq.a2') }}</p>
          </div>
          <div class="bg-white rounded-xl p-6 border border-gray-100">
            <h3 class="font-semibold mb-2">{{ $t('home.faq.q3') }}</h3>
            <p class="text-gray-600 text-sm leading-relaxed">{{ $t('home.faq.a3') }}</p>
          </div>
          <div class="bg-white rounded-xl p-6 border border-gray-100">
            <h3 class="font-semibold mb-2">{{ $t('home.faq.q4') }}</h3>
            <p class="text-gray-600 text-sm leading-relaxed">{{ $t('home.faq.a4') }}</p>
          </div>
          <div class="bg-white rounded-xl p-6 border border-gray-100">
            <h3 class="font-semibold mb-2">{{ $t('home.faq.q5') }}</h3>
            <p class="text-gray-600 text-sm leading-relaxed">{{ $t('home.faq.a5') }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-24 bg-gray-50">
      <div class="max-w-3xl mx-auto px-6 text-center">
        <h2 class="text-3xl md:text-4xl font-bold mb-4">{{ $t('home.cta.title') }}</h2>
        <p class="text-gray-600 mb-8">{{ $t('home.cta.description') }}</p>

        <div class="flex flex-col sm:flex-row justify-center gap-4">
          <a href="https://chromewebstore.google.com/detail/fit-my-mail/dgabbbhdpbdmpkohaehpffpghohklekp" target="_blank" rel="noopener" class="bg-black text-white px-8 py-3.5 rounded-xl font-medium text-base hover:-translate-y-0.5 hover:shadow-lg transition-all inline-flex items-center justify-center gap-3">
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C8.21 0 4.831 1.757 2.632 4.501l3.953 6.848A5.454 5.454 0 0 1 12 6.545h10.691A12 12 0 0 0 12 0zM1.931 5.47A11.943 11.943 0 0 0 0 12c0 6.012 4.42 10.991 10.189 11.864l3.953-6.847a5.45 5.45 0 0 1-6.865-2.29L1.931 5.47zm13.299 2.347l-3.953 6.847a5.456 5.456 0 0 1-4.346 2.881L3.072 23.4A11.943 11.943 0 0 0 12 24c6.627 0 12-5.373 12-12 0-1.903-.442-3.7-1.231-5.303L15.23 7.817zM12 16.364a4.364 4.364 0 1 1 0-8.728 4.364 4.364 0 0 1 0 8.728z"/>
            </svg>
            {{ $t('home.cta.install') }}
          </a>
          <NuxtLink to="/pricing" class="px-8 py-3.5 rounded-xl font-medium text-base border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all">
            {{ $t('home.cta.pricing') }}
          </NuxtLink>
        </div>
        <p class="text-sm text-gray-400 mt-4">{{ $t('home.chromeOnly') }}</p>
      </div>
    </section>

    <footer class="border-t border-gray-100 py-8">
      <div class="max-w-5xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div class="font-bold text-lg">Fit my mail.</div>
        <div class="flex flex-col md:flex-row items-center gap-4 md:gap-8">
          <NuxtLink to="/privacy" class="text-sm text-gray-500 hover:text-black transition">
            {{ $t('footer.privacy') }}
          </NuxtLink>
          <div class="text-sm text-gray-500">
            {{ $t('footer.rights') }}
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
const { t } = useI18n()

useSeoMeta({
  title: () => t('seo.home.title'),
  description: () => t('seo.home.description'),
  ogTitle: () => t('seo.home.title'),
  ogDescription: () => t('seo.home.ogDescription'),
  ogUrl: 'https://www.fitmymail.fr',
  twitterTitle: () => t('seo.home.title'),
  twitterDescription: () => t('seo.home.ogDescription'),
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'Fit my mail',
        applicationCategory: 'ProductivityApplication',
        operatingSystem: 'Chrome',
        description: t('seo.structuredData.description'),
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'EUR',
          description: t('seo.structuredData.offerDescription')
        },
        aggregateRating: undefined
      })
    }
  ]
})
</script>
