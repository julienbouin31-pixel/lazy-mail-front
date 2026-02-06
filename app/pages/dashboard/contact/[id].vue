<template>
  <div class="min-h-screen bg-gray-50">
    <AppHeader />

    <!-- Sub-header contact -->
    <div class="bg-white border-b border-gray-200">
      <div class="max-w-4xl mx-auto px-6 h-12 flex items-center gap-4">
        <NuxtLink to="/dashboard" class="text-gray-400 hover:text-black transition text-sm">{{ $t('contact.back') }}</NuxtLink>
        <div class="h-4 w-px bg-gray-200"></div>
        <div class="font-semibold text-sm" v-if="contact">
          {{ contact.isGeneric ? $t('contact.genericStyle') : contact.name }}
          <span v-if="!contact.isGeneric" class="font-normal text-gray-400">({{ contact.email }})</span>
        </div>
      </div>
    </div>

    <!-- Error toast -->
    <div v-if="error" class="fixed top-4 right-4 bg-red-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 z-50 animate-slide-in">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10"/>
        <line x1="15" y1="9" x2="9" y2="15"/>
        <line x1="9" y1="9" x2="15" y2="15"/>
      </svg>
      <span class="text-sm font-medium">{{ error }}</span>
    </div>

    <!-- Contact locké (Forbidden) -->
    <main v-if="contactLocked" class="max-w-4xl mx-auto px-6 py-8">
      <div class="text-center py-20">
        <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg class="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <h3 class="text-lg font-semibold mb-2">{{ $t('contact.locked.title') }}</h3>
        <p class="text-gray-500 text-sm max-w-md mx-auto mb-6">
          {{ $t('contact.locked.description') }}
        </p>
        <NuxtLink to="/pricing" class="inline-flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-lg font-medium hover:bg-gray-800 transition">
          {{ $t('contact.locked.cta') }}
        </NuxtLink>
      </div>
    </main>

    <main class="max-w-4xl mx-auto px-6 py-8" v-else-if="contact">

      <section class="bg-white rounded-xl border border-gray-200 p-6 mb-8 shadow-sm">
        <h2 class="font-bold text-lg mb-4">{{ $t('contact.addTitle') }}</h2>
        <p class="text-sm text-gray-500 mb-4">{{ contact.isGeneric ? $t('contact.addDescriptionGeneric') : $t('contact.addDescriptionContact') }}</p>

        <form @submit.prevent="addSnippet">
          <textarea
            v-model="newSnippetContent"
            rows="4"
            class="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg focus:border-black focus:ring-1 focus:ring-black outline-none transition text-sm font-mono mb-4"
            :placeholder="$t('contact.placeholder')"
            required
          ></textarea>
          <div class="flex justify-end">
            <button type="submit" :disabled="submitting" class="bg-black text-white px-5 py-2 rounded-md text-sm font-medium hover:bg-gray-800 disabled:opacity-50 transition">
              {{ submitting ? $t('contact.submitting') : $t('contact.submit') }}
            </button>
          </div>
        </form>
      </section>

      <section>
        <h3 class="font-bold text-gray-900 mb-4 flex items-center gap-2">
          {{ $t('contact.savedTitle') }}
          <span class="bg-gray-200 text-gray-600 text-xs px-2 py-0.5 rounded-full">{{ snippets?.length || 0 }}</span>
        </h3>

        <div v-if="pendingSnippets" class="text-gray-400 text-sm">{{ $t('contact.loadingSnippets') }}</div>

        <div v-else-if="snippets && snippets.length === 0" class="text-center py-12 border-2 border-dashed border-gray-200 rounded-xl">
          <p class="text-gray-400">{{ $t('contact.noSnippets') }}</p>
        </div>

        <div v-else class="space-y-4">
          <div v-for="snippet in snippets" :key="snippet.id" class="bg-white border border-gray-200 rounded-lg p-4 group hover:border-gray-300 transition relative">
            <pre class="whitespace-pre-wrap text-sm text-gray-600 font-sans leading-relaxed">{{ snippet.content }}</pre>

            <!-- Delete confirmation -->
            <div v-if="deletingId === snippet.id" class="absolute inset-0 bg-white/95 backdrop-blur-sm rounded-lg flex items-center justify-center gap-3">
              <span class="text-sm text-gray-600">{{ $t('contact.deleteConfirm') }}</span>
              <button
                @click="confirmDelete(snippet.id)"
                class="px-3 py-1.5 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 transition"
              >
                {{ $t('contact.deleteButton') }}
              </button>
              <button
                @click="deletingId = null"
                class="px-3 py-1.5 bg-gray-100 text-gray-600 text-sm font-medium rounded-md hover:bg-gray-200 transition"
              >
                {{ $t('contact.cancelButton') }}
              </button>
            </div>

            <!-- Delete button -->
            <button
              v-else
              @click="deletingId = snippet.id"
              class="absolute top-2 right-2 p-1.5 text-gray-300 hover:text-red-600 hover:bg-red-50 rounded-md transition opacity-0 group-hover:opacity-100"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
            </button>
          </div>
        </div>
      </section>

    </main>
  </div>
</template>

<script setup>
definePageMeta({ middleware: 'auth' })
const { t } = useI18n()
const route = useRoute()
const auth = useAuthStore()
const config = useRuntimeConfig()
const contactId = route.params.id

const newSnippetContent = ref('')
const submitting = ref(false)
const deletingId = ref(null)
const error = ref('')
const contactLocked = ref(false)

const { data: contact, error: contactError } = await useFetch(`${config.public.apiBase}/contacts/${contactId}`, {
  headers: { Authorization: `Bearer ${auth.token}` }
})

if (contactError.value?.statusCode === 403) {
  contactLocked.value = true
}

const { data: snippets, pending: pendingSnippets, refresh: refreshSnippets } = await useFetch(`${config.public.apiBase}/snippets/contact/${contactId}`, {
  headers: { Authorization: `Bearer ${auth.token}` },
  immediate: !contactLocked.value
})

async function addSnippet() {
  if (!newSnippetContent.value.trim()) return
  error.value = ''
  submitting.value = true

  try {
    await $fetch(`${config.public.apiBase}/snippets`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${auth.token}` },
      body: {
        contactId: parseInt(contactId),
        content: newSnippetContent.value
      }
    })
    newSnippetContent.value = ''
    refreshSnippets()
  } catch (err) {
    error.value = t('contact.addError')
    setTimeout(() => error.value = '', 3000)
  } finally {
    submitting.value = false
  }
}

async function confirmDelete(id) {
  error.value = ''
  try {
    await $fetch(`${config.public.apiBase}/snippets/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${auth.token}` }
    })
    deletingId.value = null
    refreshSnippets()
  } catch (err) {
    deletingId.value = null
    error.value = t('contact.deleteError')
    setTimeout(() => error.value = '', 3000)
  }
}
</script>

<style scoped>
.animate-slide-in {
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from {
    transform: translateX(100px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
</style>
