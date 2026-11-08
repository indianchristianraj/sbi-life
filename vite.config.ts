import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import path from 'path';
import fs from 'fs';
import { defineConfig, Plugin } from 'vite';

const downloadIndexHtmlPlugin = (): Plugin => ({
  name: 'download-index-html-plugin',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      const url = req.url?.split('?')[0];

      // Netlify Deploy ZIP endpoint
      if (
        url === '/download/netlify-deploy.zip' ||
        url === '/netlify-deploy.zip' ||
        url === '/download-netlify'
      ) {
        const zipCandidates = [
          path.resolve(import.meta.dirname, 'netlify-deploy.zip'),
          path.resolve(import.meta.dirname, 'public/netlify-deploy.zip'),
          path.resolve(import.meta.dirname, 'public/download/netlify-deploy.zip'),
        ];
        for (const zPath of zipCandidates) {
          if (fs.existsSync(zPath)) {
            const stat = fs.statSync(zPath);
            res.setHeader('Content-Type', 'application/zip');
            res.setHeader('Content-Disposition', 'attachment; filename="netlify-deploy.zip"');
            res.setHeader('Content-Length', stat.size);
            res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
            const stream = fs.createReadStream(zPath);
            stream.pipe(res);
            return;
          }
        }
      }

      // Complete Project Source ZIP endpoint
      if (
        url === '/download/project-source.zip' ||
        url === '/project-source.zip' ||
        url === '/download-source'
      ) {
        const zipCandidates = [
          path.resolve(import.meta.dirname, 'project-source.zip'),
          path.resolve(import.meta.dirname, 'public/project-source.zip'),
          path.resolve(import.meta.dirname, 'public/download/project-source.zip'),
        ];
        for (const zPath of zipCandidates) {
          if (fs.existsSync(zPath)) {
            const stat = fs.statSync(zPath);
            res.setHeader('Content-Type', 'application/zip');
            res.setHeader('Content-Disposition', 'attachment; filename="project-source.zip"');
            res.setHeader('Content-Length', stat.size);
            res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
            const stream = fs.createReadStream(zPath);
            stream.pipe(res);
            return;
          }
        }
      }

      // Standalone index.html endpoint
      if (
        url === '/download/index.html' ||
        url === '/download' ||
        url === '/download-index.html' ||
        url === '/api/download-index'
      ) {
        const candidates = [
          path.resolve(import.meta.dirname, 'public/standalone-index.html'),
          path.resolve(import.meta.dirname, 'standalone-index.html'),
          path.resolve(import.meta.dirname, 'dist-standalone/index.html'),
        ];
        for (const filePath of candidates) {
          if (fs.existsSync(filePath)) {
            const content = fs.readFileSync(filePath, 'utf-8');
            res.setHeader('Content-Type', 'text/html; charset=utf-8');
            res.setHeader('Content-Disposition', 'attachment; filename="index.html"');
            res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
            res.end(content);
            return;
          }
        }
      }
      next();
    });
  },
});

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      tailwindcss(),
      downloadIndexHtmlPlugin(),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['icon.svg', 'robots.txt', 'sitemap.xml'],
        manifest: {
          id: '/',
          name: 'Sofia Rani - SBI Life Insurance Advisor',
          short_name: 'Sofia Rani',
          description: 'Personal life insurance advisor website for Sofia Rani in Gangavathi, Karnataka.',
          theme_color: '#0F1D36',
          background_color: '#FAF9F5',
          display: 'standalone',
          start_url: '/',
          scope: '/',
          icons: [
            {
              src: '/icon.svg',
              sizes: '192x192 512x512',
              type: 'image/svg+xml',
              purpose: 'any',
            },
          ],
        },
        workbox: {
          maximumFileSizeToCacheInBytes: 25 * 1024 * 1024,
          globIgnores: ['**/standalone-index.html', '**/dist-standalone/**'],
        },
        devOptions: {
          enabled: false,
        },
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
