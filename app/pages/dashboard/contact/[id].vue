<template>
  <div class="min-h-screen bg-gray-50">
    <header class="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div class="max-w-4xl mx-auto px-6 h-16 flex items-center gap-4">
        <NuxtLink to="/dashboard" class="text-gray-400 hover:text-black transition">← Retour</NuxtLink>
        <div class="h-6 w-px bg-gray-200"></div>
        <div class="font-bold text-lg" v-if="contact">{{ contact.name }} <span class="font-normal text-gray-400 text-sm">({{ contact.email }})</span></div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8" v-if="contact">
      
      <section class="bg-white rounded-xl border border-gray-200 p-6 mb-8 shadow-sm">
        <h2 class="font-bold text-lg mb-4">Ajouter un exemple de style</h2>
        <p class="text-sm text-gray-500 mb-4">Collez ici un email que vous avez déjà envoyé à ce contact. L'IA s'en servira pour imiter votre ton.</p>
        
        <form @submit.prevent="addSnippet">
          <textarea 
            v-model="newSnippetContent" 
            rows="4" 
            class="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg focus:border-black focus:ring-1 focus:ring-black outline-none transition text-sm font-mono mb-4"
            placeholder="Salut, merci pour ton retour. Je regarde ça demain..."
            required
          ></textarea>
          <div class="flex justify-end">
            <button type="submit" :disabled="submitting" class="bg-black text-white px-5 py-2 rounded-md text-sm font-medium hover:bg-gray-800 disabled:opacity-50 transition">
              {{ submitting ? 'Ajout...' : 'Ajouter cet exemple' }}
            </button>
          </div>
        </form>
      </section>

      <section>
        <h3 class="font-bold text-gray-900 mb-4 flex items-center gap-2">
          Exemples enregistrés 
          <span class="bg-gray-200 text-gray-600 text-xs px-2 py-0.5 rounded-full">{{ snippets?.length || 0 }}</span>
        </h3>

        <div v-if="pendingSnippets" class="text-gray-400 text-sm">Chargement des snippets...</div>
        
        <div v-else-if="snippets && snippets.length === 0" class="text-center py-12 border-2 border-dashed border-gray-200 rounded-xl">
          <p class="text-gray-400">Aucun exemple pour le moment.</p>
        </div>

        <div v-else class="space-y-4">
          <div v-for="snippet in snippets" :key="snippet.id" class="bg-white border border-gray-200 rounded-lg p-4 group hover:border-gray-300 transition relative">
            <pre class="whitespace-pre-wrap text-sm text-gray-600 font-sans leading-relaxed">{{ snippet.content }}</pre>
            
            <button 
              @click="deleteSnippet(snippet.id)"
              class="absolute top-2 right-2 p-1.5 text-gray-300 hover:text-red-600 hover:bg-red-50 rounded-md transition opacity-0 group-hover:opacity-100"
              title="Supprimer"
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
const route = useRoute()
const auth = useAuthStore()
const config = useRuntimeConfig()
const contactId = route.params.id

// État local pour le formulaire
const newSnippetContent = ref('')
const submitting = ref(false)

// 1. Charger le Contact
const { data: contact } = await useFetch(`${config.public.apiBase}/contacts/${contactId}`, {
  headers: { Authorization: `Bearer ${auth.token}` }
})

// 2. Charger les Snippets du contact
const { data: snippets, pending: pendingSnippets, refresh: refreshSnippets } = await useFetch(`${config.public.apiBase}/snippets/contact/${contactId}`, {
  headers: { Authorization: `Bearer ${auth.token}` }
})

// Action: Ajouter
async function addSnippet() {
  if (!newSnippetContent.value.trim()) return
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
    alert('Erreur lors de l\'ajout')
  } finally {
    submitting.value = false
  }
}

async function deleteSnippet(id) {
  if(!confirm('Supprimer cet exemple ?')) return
  
  try {
    await $fetch(`${config.public.apiBase}/snippets/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${auth.token}` }
    })
    refreshSnippets()
  } catch (err) {
    alert('Impossible de supprimer')
  }
}
</script>