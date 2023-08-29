import { defineConfig, loadEnv } from 'vite';
import checker from 'vite-plugin-checker';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    root: './src',
    server: { port: Number(env.PORT) || 4000, open: true },
    define: { 'process.env': `(${JSON.stringify(env)})` },
    base: './',
    plugins:
      [checker({ typescript: true })],
    build: {
      outDir: '../dist',
      emptyOutDir: true,
      minify: true,
    },
  };
});
