// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        // Une palette sombre/raw
        brand: {
          50: '#f9fafb',
          100: '#f3f4f6',
          900: '#111827', // Presque noir
          accent: '#000000', // Noir pur pour les boutons
        }
      }
    }
  }
}