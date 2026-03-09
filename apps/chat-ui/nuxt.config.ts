import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  ssr: false,
  app: {
    // Für Repo-Page: https://<user>.github.io/playground/chat-ui/
    baseURL: '/playground/chat-ui/'
    // Bei Custom Domain ggf. '/chat-ui/'
  }
})
