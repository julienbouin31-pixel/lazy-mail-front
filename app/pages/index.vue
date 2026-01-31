<template>
  <div class="min-h-screen bg-white">
    <AppHeader />

    <!-- Hero Section -->
    <section class="max-w-4xl mx-auto px-6 pt-24 pb-20 text-center">
      <div class="inline-block px-3 py-1 mb-6 text-xs font-mono font-medium border border-gray-200 rounded-full bg-gray-50">
        Extension Chrome gratuite
      </div>

      <h1 class="text-5xl md:text-6xl font-bold tracking-tight mb-6 leading-tight">
        Ne répondez plus jamais <br class="hidden sm:block"/> à vos emails.
      </h1>

      <p class="text-lg text-gray-600 mb-10 max-w-xl mx-auto leading-relaxed">
        Fit my mail apprend votre style d'écriture et rédige vos réponses automatiquement.
        <span class="font-medium text-black">Arrêtez de taper, commencez à valider.</span>
      </p>

      <div class="flex flex-col sm:flex-row justify-center gap-4">
        <a href="#" class="bg-black text-white px-8 py-3.5 rounded-xl font-medium text-base border border-black hover:-translate-y-0.5 hover:shadow-lg transition-all inline-flex items-center justify-center gap-3">
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C8.21 0 4.831 1.757 2.632 4.501l3.953 6.848A5.454 5.454 0 0 1 12 6.545h10.691A12 12 0 0 0 12 0zM1.931 5.47A11.943 11.943 0 0 0 0 12c0 6.012 4.42 10.991 10.189 11.864l3.953-6.847a5.45 5.45 0 0 1-6.865-2.29L1.931 5.47zm13.299 2.347l-3.953 6.847a5.456 5.456 0 0 1-4.346 2.881L3.072 23.4A11.943 11.943 0 0 0 12 24c6.627 0 12-5.373 12-12 0-1.903-.442-3.7-1.231-5.303L15.23 7.817zM12 16.364a4.364 4.364 0 1 1 0-8.728 4.364 4.364 0 0 1 0 8.728z"/>
          </svg>
          Télécharger l'extension
        </a>
        <a href="#how-it-works" class="px-8 py-3.5 rounded-xl font-medium text-base border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all inline-flex items-center justify-center gap-2">
          Comment ça marche ?
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
          </svg>
        </a>
      </div>
    </section>

    <!-- How it Works Section -->
    <section id="how-it-works" class="bg-gray-50 py-24">
      <div class="max-w-5xl mx-auto px-6">
        <div class="text-center mb-16">
          <span class="text-sm font-semibold text-gray-500 uppercase tracking-wide">En 3 étapes simples</span>
          <h2 class="text-3xl md:text-4xl font-bold mt-3">Comment ça marche ?</h2>
        </div>

        <div class="grid md:grid-cols-3 gap-6">
          <!-- Step 1 -->
          <div class="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div class="w-10 h-10 bg-black text-white rounded-lg flex items-center justify-center font-bold text-sm mb-4">
              1
            </div>
            <h3 class="text-lg font-bold mb-2">Installez l'extension</h3>
            <p class="text-gray-600 text-sm leading-relaxed">
              Téléchargez l'extension Chrome et connectez-vous. C'est gratuit !
            </p>
          </div>

          <!-- Step 2 -->
          <div class="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div class="w-10 h-10 bg-black text-white rounded-lg flex items-center justify-center font-bold text-sm mb-4">
              2
            </div>
            <h3 class="text-lg font-bold mb-2">Scannez 3 emails</h3>
            <p class="text-gray-600 text-sm leading-relaxed">
              Ouvrez 3 emails <strong>que vous avez écrits</strong> à un contact dans vos "Messages envoyés".
            </p>
          </div>

          <!-- Step 3 -->
          <div class="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div class="w-10 h-10 bg-black text-white rounded-lg flex items-center justify-center font-bold text-sm mb-4">
              3
            </div>
            <h3 class="text-lg font-bold mb-2">Générez des réponses</h3>
            <p class="text-gray-600 text-sm leading-relaxed">
              Recevez un email ? Cliquez "Générer" et Fit my mail écrit dans <strong>votre style</strong>.
            </p>
          </div>
        </div>

        <!-- Detailed info box -->
        <div class="mt-8 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div class="flex items-start gap-4">
            <div class="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg class="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <div>
              <h4 class="font-semibold text-sm mb-1">Important pour l'étape 2</h4>
              <p class="text-gray-600 text-sm">
                Scannez des emails <strong>que vous avez rédigés</strong>, pas ceux que vous avez reçus.
                Allez dans Gmail → "Messages envoyés" pour les trouver.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Demo/Visual Section -->
    <section class="py-24">
      <div class="max-w-5xl mx-auto px-6">
        <div class="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 md:p-12 text-white overflow-hidden relative">
          <div class="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>

          <div class="relative z-10 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 class="text-3xl font-bold mb-4">Votre style, votre ton</h2>
              <p class="text-gray-300 leading-relaxed mb-6">
                Fit my mail ne génère pas des réponses génériques. Il apprend <strong class="text-white">comment vous écrivez</strong> à chaque contact :
              </p>
              <ul class="space-y-3">
                <li class="flex items-start gap-3">
                  <div class="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center mt-0.5">
                    <svg class="w-3 h-3 text-green-400" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
                    </svg>
                  </div>
                  <span class="text-gray-300">Formel avec votre patron, décontracté avec vos amis</span>
                </li>
                <li class="flex items-start gap-3">
                  <div class="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center mt-0.5">
                    <svg class="w-3 h-3 text-green-400" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
                    </svg>
                  </div>
                  <span class="text-gray-300">Vos expressions, votre ponctuation, votre signature</span>
                </li>
                <li class="flex items-start gap-3">
                  <div class="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center mt-0.5">
                    <svg class="w-3 h-3 text-green-400" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
                    </svg>
                  </div>
                  <span class="text-gray-300">Modifiable avant envoi, vous gardez le contrôle</span>
                </li>
              </ul>
            </div>

            <div class="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/10">
              <div class="flex items-center gap-3 mb-4 pb-4 border-b border-white/10">
                <div class="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center text-white font-bold">M</div>
                <div>
                  <div class="font-medium">Marie Dupont</div>
                  <div class="text-sm text-gray-400">3 styles enregistrés</div>
                </div>
              </div>
              <div class="space-y-3 text-sm">
                <div class="bg-white/5 rounded-lg p-3">
                  <div class="text-gray-400 text-xs mb-1">Email reçu</div>
                  <div class="text-gray-200">"Salut ! Tu es dispo mardi pour le déjeuner ?"</div>
                </div>
                <div class="flex items-center gap-2 text-gray-400">
                  <svg class="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <polygon points="13,2 3,14 12,14 11,22 21,10 12,10"/>
                  </svg>
                  Génération...
                </div>
                <div class="bg-purple-500/20 border border-purple-500/30 rounded-lg p-3">
                  <div class="text-purple-300 text-xs mb-1">Réponse générée</div>
                  <div class="text-white">"Hey Marie ! Oui carrément, je suis dispo mardi midi. On se retrouve où ? Bises"</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="bg-gray-50 py-24">
      <div class="max-w-3xl mx-auto px-6">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold">Questions fréquentes</h2>
        </div>

        <div class="space-y-4">
          <div class="bg-white rounded-xl p-6 border border-gray-100">
            <h3 class="font-semibold mb-2">Pourquoi scanner 3 emails par contact ?</h3>
            <p class="text-gray-600 text-sm leading-relaxed">
              3 emails permettent à l'IA de comprendre votre style d'écriture de façon fiable : votre ton, vos expressions favorites, votre niveau de formalité. Moins serait insuffisant, plus serait fastidieux.
            </p>
          </div>

          <div class="bg-white rounded-xl p-6 border border-gray-100">
            <h3 class="font-semibold mb-2">Mes emails sont-ils sécurisés ?</h3>
            <p class="text-gray-600 text-sm leading-relaxed">
              Oui. Nous ne stockons que des "snippets" anonymisés de votre style d'écriture, jamais le contenu complet de vos emails. Vos données ne sont jamais partagées.
            </p>
          </div>

          <div class="bg-white rounded-xl p-6 border border-gray-100">
            <h3 class="font-semibold mb-2">Est-ce que ça fonctionne en français ?</h3>
            <p class="text-gray-600 text-sm leading-relaxed">
              Absolument ! Fit my mail fonctionne dans toutes les langues. L'IA s'adapte à la langue dans laquelle vous écrivez à chaque contact.
            </p>
          </div>

          <div class="bg-white rounded-xl p-6 border border-gray-100">
            <h3 class="font-semibold mb-2">C'est vraiment gratuit ?</h3>
            <p class="text-gray-600 text-sm leading-relaxed">
              Le plan gratuit permet 1 contact. Pour un nombre illimité de contacts, passez au plan PRO à 7€/mois.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-24">
      <div class="max-w-3xl mx-auto px-6 text-center">
        <h2 class="text-3xl md:text-4xl font-bold mb-4">Prêt à automatiser vos emails ?</h2>
        <p class="text-gray-600 mb-8">Rejoignez des milliers d'utilisateurs qui gagnent du temps chaque jour.</p>

        <div class="flex flex-col sm:flex-row justify-center gap-4">
          <a href="#" class="bg-black text-white px-8 py-3.5 rounded-xl font-medium text-base hover:-translate-y-0.5 hover:shadow-lg transition-all inline-flex items-center justify-center gap-3">
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C8.21 0 4.831 1.757 2.632 4.501l3.953 6.848A5.454 5.454 0 0 1 12 6.545h10.691A12 12 0 0 0 12 0zM1.931 5.47A11.943 11.943 0 0 0 0 12c0 6.012 4.42 10.991 10.189 11.864l3.953-6.847a5.45 5.45 0 0 1-6.865-2.29L1.931 5.47zm13.299 2.347l-3.953 6.847a5.456 5.456 0 0 1-4.346 2.881L3.072 23.4A11.943 11.943 0 0 0 12 24c6.627 0 12-5.373 12-12 0-1.903-.442-3.7-1.231-5.303L15.23 7.817zM12 16.364a4.364 4.364 0 1 1 0-8.728 4.364 4.364 0 0 1 0 8.728z"/>
            </svg>
            Installer l'extension gratuite
          </a>
          <NuxtLink to="/pricing" class="px-8 py-3.5 rounded-xl font-medium text-base border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all">
            Voir les tarifs
          </NuxtLink>
        </div>
      </div>
    </section>

   
    <footer class="border-t border-gray-100 py-8">
  <div class="max-w-5xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
    <div class="font-bold text-lg">Fit my mail.</div>
    
    <div class="flex flex-col md:flex-row items-center gap-4 md:gap-8">
      <NuxtLink to="/privacy" class="text-sm text-gray-500 hover:text-black transition">
        Confidentialité
      </NuxtLink>
      <div class="text-sm text-gray-500">
        © 2026 Fit my mail. Tous droits réservés.
      </div>
    </div>
  </div>
</footer>
  </div>
</template>

<script setup>
useSeoMeta({
  title: 'Fit my mail — Ne répondez plus jamais à vos emails',
  description: 'Fit my mail apprend votre style d\'écriture et rédige vos réponses email automatiquement. Extension Chrome gratuite pour Gmail. Arrêtez de taper, commencez à valider.',
  ogTitle: 'Fit my mail — Ne répondez plus jamais à vos emails',
  ogDescription: 'L\'IA qui apprend votre style d\'écriture et rédige vos réponses email. Extension Chrome gratuite pour Gmail.',
  ogUrl: 'https://www.fitmymail.fr',
  twitterTitle: 'Fit my mail — Ne répondez plus jamais à vos emails',
  twitterDescription: 'L\'IA qui apprend votre style d\'écriture et rédige vos réponses email. Extension Chrome gratuite pour Gmail.',
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
        description: 'Extension Chrome qui apprend votre style d\'écriture et rédige vos réponses email automatiquement sur Gmail.',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'EUR',
          description: 'Plan gratuit avec 1 contact'
        },
        aggregateRating: undefined
      })
    }
  ]
})
</script>
