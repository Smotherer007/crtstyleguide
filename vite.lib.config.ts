import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'CrtStyleGuide',
      fileName: (format) => `index.${format === 'es' ? 'js' : 'cjs'}`,
      formats: ['es'],
      cssFileName: 'styles',
    },
    outDir: 'dist/lib',
    emptyOutDir: true,
    rollupOptions: {
      external: ['lit'],
      output: {
        globals: {
          lit: 'Lit',
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': '/src',
      '@components': '/src/components',
      '@styles': '/src/styles',
      '@utils': '/src/utils',
    },
  },
});
