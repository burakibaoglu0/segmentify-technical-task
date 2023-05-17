import { defineConfig } from 'vite';
import vitePluginFaviconsInject from 'vite-plugin-favicons-inject';


export default defineConfig({
  server: {
    port: 8080
  },
  plugins: [
    vitePluginFaviconsInject('./public/images/favicon.svg')
  ]
})