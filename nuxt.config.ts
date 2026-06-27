export default defineNuxtConfig({
  compatibilityDate: '2026-06-27',
  modules: ['@nuxt/ui', '@nuxt/content'],
  devtools: { enabled: true },
  ui: {
    theme: {
      defaultVariants: {
        color: 'primary',
      },
    },
  },
  css: ['~/assets/css/main.css'],
  routeRules: {
    '/**': { prerender: true },
  },
  vite: {
    optimizeDeps: {
      include: ['@vue/devtools-core', '@vue/devtools-kit'],
    },
  },
  nitro: {
    output: {
      publicDir: 'html',
    },
    prerender: {
      routes: ['/'],
    },
  },
})
