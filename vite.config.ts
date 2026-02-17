import { fileURLToPath, resolve, URL } from 'node:url'
import { dirname } from 'node:path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  publicDir: 'public',
  plugins: [
    vue(),
    VueI18nPlugin({
      include: resolve(dirname(fileURLToPath(import.meta.url)), './src/i18n/**'),
      runtimeOnly: false
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  test: {
   globals: true, // enable jest-like global test APIs
   environment: 'happy-dom' // simulate DOM with happy-dom
  }
});
