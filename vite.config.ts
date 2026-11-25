import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'icons/*.svg', 'maps/*.json'],
      manifest: {
        name: 'WisKids.app - Aprende Jugando (1º Primaria)',
        short_name: 'WisKids.app',
        description: 'Plataforma educativa inteligente y gamificada para niños de 6 años en adelante',
        theme_color: '#0284c7',
        background_color: '#f0f9ff',
        display: 'standalone',
        orientation: 'any',
        icons: [
          {
            src: '/icons/icon-192.svg',
            sizes: '192x192',
            type: 'image/svg+xml',
            purpose: 'any maskable'
          },
          {
            src: '/icons/icon-512.svg',
            sizes: '512x512',
            type: 'image/svg+xml',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,json}']
      }
    })
  ],
  server: {
    host: true,
    port: 5173
  },
  preview: {
    host: true,
    port: 4173,
    allowedHosts: true
  }
});
