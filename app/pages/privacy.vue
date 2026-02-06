<template>
  <div class="min-h-screen bg-gray-50">
    <AppHeader />

    <main class="max-w-4xl mx-auto px-6 py-16">
      <div class="bg-white rounded-2xl border border-gray-200 p-8 md:p-12 shadow-sm">
        <h1 class="text-3xl font-bold mb-8">{{ $t('privacy.title') }}</h1>
        <p class="text-gray-500 mb-8 text-sm">{{ $t('privacy.lastUpdated') }}</p>

        <div class="prose prose-gray max-w-none space-y-8">

          <section>
            <h2 class="text-xl font-bold mb-3 text-black">{{ $t('privacy.section1.title') }}</h2>
            <p class="text-gray-600 leading-relaxed" v-html="$t('privacy.section1.content')"></p>
          </section>

          <section>
            <h2 class="text-xl font-bold mb-3 text-black">{{ $t('privacy.section2.title') }}</h2>
            <p class="text-gray-600 mb-3">{{ $t('privacy.section2.intro') }}</p>
            <ul class="list-disc pl-5 text-gray-600 space-y-2">
              <li v-html="$t('privacy.section2.item1')"></li>
              <li v-html="$t('privacy.section2.item2')"></li>
              <li v-html="$t('privacy.section2.item3')"></li>
            </ul>
          </section>

          <section>
            <h2 class="text-xl font-bold mb-3 text-black">{{ $t('privacy.section3.title') }}</h2>
            <p class="text-gray-600 leading-relaxed">{{ $t('privacy.section3.intro') }}</p>
            <ul class="list-disc pl-5 text-gray-600 space-y-2 mt-2">
              <li>{{ $t('privacy.section3.item1') }}</li>
              <li>{{ $t('privacy.section3.item2') }}</li>
              <li>{{ $t('privacy.section3.item3') }}</li>
            </ul>
          </section>

          <section>
            <h2 class="text-xl font-bold mb-3 text-black">{{ $t('privacy.section4.title') }}</h2>
            <p class="text-gray-600 leading-relaxed">{{ $t('privacy.section4.intro') }}</p>
            <ul class="list-disc pl-5 text-gray-600 space-y-2 mt-2">
              <li>{{ $t('privacy.section4.item1') }}</li>
              <li>{{ $t('privacy.section4.item2') }}</li>
              <li>{{ $t('privacy.section4.item3') }}</li>
            </ul>
          </section>

          <section>
            <h2 class="text-xl font-bold mb-3 text-black">{{ $t('privacy.section5.title') }}</h2>
            <p class="text-gray-600 leading-relaxed">{{ $t('privacy.section5.content') }}</p>
          </section>

          <section>
            <h2 class="text-xl font-bold mb-3 text-black">{{ $t('privacy.section6.title') }}</h2>
            <p class="text-gray-600 leading-relaxed">
              {{ $t('privacy.section6.content') }}<br>
              <a href="mailto:julienbouin31@gmail.com" class="text-black font-medium hover:underline">julienbouin31@gmail.com</a>
            </p>
          </section>

        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
const { t } = useI18n()

useSeoMeta({
  title: () => t('seo.privacy.title'),
  description: () => t('seo.privacy.description'),
  robots: 'noindex, follow',
})
</script>
