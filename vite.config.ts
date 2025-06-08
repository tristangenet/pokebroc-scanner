import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import vitePluginQrcode from 'vite-plugin-qrcode';

export default defineConfig({
  plugins: [
    react(),
    vitePluginQrcode(), // ✅ QR code au démarrage
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
