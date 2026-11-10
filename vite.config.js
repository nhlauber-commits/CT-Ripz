import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { viteSingleFile } from 'vite-plugin-singlefile';

// app.html is the source. `npm run build` compiles Tailwind, inlines it,
// and scripts/finish.mjs writes the publishable pack-rip.html.
export default defineConfig({
  plugins: [tailwindcss(), viteSingleFile()],
  publicDir: false,
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: { input: 'app.html' },
  },
  server: { open: '/app.html' },
});
