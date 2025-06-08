import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// IMPORTER LE PLUGIN PROPREMENT DEPUIS UN COMMONJS
const vitePluginQrcode = require('vite-plugin-qrcode').default;

export default defineConfig({
  plugins: [
    react(),
    vitePluginQrcode(), // ✅ maintenant c’est bien une fonction
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['pwa-192x192.png', 'pwa-512x512.png', 'apple-touch-icon.png'],
      manifest: {
        name: 'PokéBroc Scanner',
        short_name: 'PokéBroc',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#ffcb05',
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
});
