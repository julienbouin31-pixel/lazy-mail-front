<template>
  <div class="min-h-screen bg-gray-50">
    <AppHeader />

    <main class="max-w-4xl mx-auto px-6 py-16">
      <div class="bg-white rounded-2xl border border-gray-200 p-8 md:p-12 shadow-sm">
        <h1 class="text-3xl font-bold mb-8">Politique de Confidentialité</h1>
        <p class="text-gray-500 mb-8 text-sm">Dernière mise à jour : 31 janvier 2026</p>

        <div class="prose prose-gray max-w-none space-y-8">
          
          <section>
            <h2 class="text-xl font-bold mb-3 text-black">1. Introduction</h2>
            <p class="text-gray-600 leading-relaxed">
              La confidentialité de vos données est la priorité absolue de <strong>Fit my mail</strong>. 
              Cette politique décrit comment nous collectons, utilisons et protégeons vos informations lorsque vous utilisez notre extension Chrome et notre application web.
            </p>
          </section>

          <section>
            <h2 class="text-xl font-bold mb-3 text-black">2. Les données que nous collectons</h2>
            <p class="text-gray-600 mb-3">Nous limitons la collecte aux données strictement nécessaires au fonctionnement du service :</p>
            <ul class="list-disc pl-5 text-gray-600 space-y-2">
              <li><strong>Informations de compte :</strong> Votre adresse email et votre mot de passe (qui est stocké de manière chiffrée/hashée).</li>
              <li><strong>Données d'apprentissage (Snippets) :</strong> Le contenu des emails que vous choisissez <strong>manuellement</strong> de scanner via l'extension. Ces textes servent uniquement à créer votre profil de style.</li>
              <li><strong>Données techniques :</strong> Cookies de session pour maintenir votre connexion.</li>
            </ul>
          </section>

          <section>
            <h2 class="text-xl font-bold mb-3 text-black">3. Utilisation de vos données</h2>
            <p class="text-gray-600 leading-relaxed">
              Vos données sont utilisées exclusivement pour :
            </p>
            <ul class="list-disc pl-5 text-gray-600 space-y-2 mt-2">
              <li>Vous permettre de vous connecter à votre compte.</li>
              <li>Entraîner l'intelligence artificielle à reconnaître et imiter votre style d'écriture personnel.</li>
              <li>Générer des brouillons de réponse dans Gmail (le contexte de l'email reçu est traité de manière éphémère pour la génération et n'est pas stocké durablement).</li>
            </ul>
          </section>

          <section>
            <h2 class="text-xl font-bold mb-3 text-black">4. Sécurité et Stockage</h2>
            <p class="text-gray-600 leading-relaxed">
              La sécurité de vos données est primordiale :
            </p>
            <ul class="list-disc pl-5 text-gray-600 space-y-2 mt-2">
              <li>Vos mots de passe sont chiffrés (hashés) et ne sont jamais stockés en clair.</li>
              <li>Les communications entre l'extension et nos serveurs sont chiffrées via HTTPS (TLS).</li>
              <li>Vos données ne sont jamais vendues à des tiers.</li>
            </ul>
          </section>

          <section>
            <h2 class="text-xl font-bold mb-3 text-black">5. Vos droits (RGPD)</h2>
            <p class="text-gray-600 leading-relaxed">
              Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression de vos données. 
              Vous pouvez supprimer vos styles enregistrés (snippets) directement depuis votre Dashboard. 
              Pour supprimer définitivement votre compte et toutes les données associées, contactez-nous.
            </p>
          </section>

          <section>
            <h2 class="text-xl font-bold mb-3 text-black">6. Contact</h2>
            <p class="text-gray-600 leading-relaxed">
              Pour toute question concernant cette politique de confidentialité, vous pouvez nous contacter à :<br>
              <a href="mailto:julienbouin31@gmail.com" class="text-black font-medium hover:underline">julienbouin31@gmail.com</a>
            </p>
          </section>

        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
useSeoMeta({
  title: 'Politique de Confidentialité — Fit my mail',
  description: 'Politique de confidentialité de Fit my mail. Transparence sur l\'utilisation de vos données emails et la sécurité.',
  robots: 'noindex, follow',
})
</script>