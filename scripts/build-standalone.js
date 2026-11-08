import { build } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { viteSingleFile } from 'vite-plugin-singlefile';
import path from 'path';
import fs from 'fs';

async function buildStandalone() {
  console.log('Building standalone single-file index.html...');
  
  // Ensure embedded images are up to date
  const generateImagesScript = path.resolve('scripts/generate-embedded-images.js');
  if (fs.existsSync(generateImagesScript)) {
    const { execSync } = await import('child_process');
    execSync('node scripts/generate-embedded-images.js', { stdio: 'inherit' });
  }

  const outDir = path.resolve('dist-standalone');
  if (fs.existsSync(outDir)) {
    fs.rmSync(outDir, { recursive: true, force: true });
  }

  await build({
    configFile: false,
    plugins: [
      react(),
      tailwindcss(),
      viteSingleFile({
        removeViteModuleLoader: true,
        useRecommendedBuildConfig: true,
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve('.'),
      },
    },
    build: {
      outDir: 'dist-standalone',
      emptyOutDir: true,
      assetsInlineLimit: 100000000, // 100MB to inline all assets
      chunkSizeWarningLimit: 50000,
      cssCodeSplit: false,
      rollupOptions: {
        output: {
          inlineDynamicImports: true,
        },
      },
    },
  });

  const generatedHtmlPath = path.resolve('dist-standalone/index.html');
  if (!fs.existsSync(generatedHtmlPath)) {
    throw new Error('Standalone build failed: dist-standalone/index.html was not generated.');
  }

  let htmlContent = fs.readFileSync(generatedHtmlPath, 'utf-8');

  // Let's verify and refine any external font or relative references
  // Ensure public/icon.svg is embedded if there is any icon.svg
  const iconPath = path.resolve('public/icon.svg');
  if (fs.existsSync(iconPath)) {
    const iconSvg = fs.readFileSync(iconPath, 'utf-8');
    const iconBase64 = Buffer.from(iconSvg).toString('base64');
    const iconDataUrl = `data:image/svg+xml;base64,${iconBase64}`;
    htmlContent = htmlContent.replace(/href=["'](?:\.?\/)?icon\.svg["']/g, `href="${iconDataUrl}"`);
    htmlContent = htmlContent.replace(/src=["'](?:\.?\/)?icon\.svg["']/g, `src="${iconDataUrl}"`);
  }

  // Guarantee optimal DOM order:
  // 1. All <style> tags inside <head>
  // 2. <div id="root"></div> inside <body>
  // 3. Application <script> tags placed AFTER <div id="root"></div> before </body>
  const mainScriptMatch = htmlContent.match(/<script type="module"[^>]*>([\s\S]*?)<\/script>/i);
  if (mainScriptMatch) {
    const fullScriptTag = mainScriptMatch[0];
    // Remove it from its current position
    htmlContent = htmlContent.replace(fullScriptTag, '');
    // Ensure <div id="root"></div> is present
    if (!htmlContent.includes('<div id="root"></div>')) {
      htmlContent = htmlContent.replace(/<body[^>]*>/i, '$&\n    <div id="root"></div>');
    }
    // Place the script right after <div id="root"></div> before </body>
    htmlContent = htmlContent.replace(
      /(<div id="root"><\/div>)/i,
      `$1\n    ${fullScriptTag}`
    );
  }

  // Copy to public/standalone-index.html so it can be served or downloaded statically
  const publicDir = path.resolve('public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  const publicTargetPath = path.join(publicDir, 'standalone-index.html');
  fs.writeFileSync(publicTargetPath, htmlContent, 'utf-8');

  // Also write to an easy access location
  const standaloneExportPath = path.resolve('standalone-index.html');
  fs.writeFileSync(standaloneExportPath, htmlContent, 'utf-8');

  const stats = fs.statSync(publicTargetPath);
  console.log(`✅ Standalone single-file HTML generated successfully!`);
  console.log(`Path: ${publicTargetPath}`);
  console.log(`Size: ${(stats.size / 1024 / 1024).toFixed(2)} MB (${stats.size} bytes)`);

  // Verify that it contains no unresolved /src/ or relative local script tags
  if (htmlContent.includes('<script type="module" src="/src/main.tsx">')) {
    console.error('❌ Warning: Still contains /src/main.tsx development reference!');
  } else {
    console.log('✅ Verified: No dev script references found.');
  }

  if (htmlContent.includes('<script') && htmlContent.includes('<style')) {
    console.log('✅ Verified: Both inlined <style> and <script> exist inside single HTML.');
  }
}

buildStandalone().catch((err) => {
  console.error('Failed to build standalone index.html:', err);
  process.exit(1);
});
