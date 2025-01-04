import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/pokedex-react/',
  server: {
    port: 3000,
    proxy: {
      // https://vitejs.dev/config/server-options.html
    },
  },
})