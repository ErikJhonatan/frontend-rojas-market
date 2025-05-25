import {defineConfig, loadEnv} from 'vite';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, process.cwd(), 'API_');
  return {
    plugins: [tailwindcss(), react()],
    server: {
      proxy: {
        '/api': {target: env.API_PROXY_TARGET || 'http://localhost:3000', changeOrigin: true},
      },
    },
  };
});
