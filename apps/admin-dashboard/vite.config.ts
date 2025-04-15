import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current directory
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [
      react(),
      tsconfigPaths(), // Add tsconfig paths plugin to resolve @/ imports
    ],
    
    // Define direct entry points
    build: {
      outDir: 'dist',
      sourcemap: mode === 'development',
      minify: mode === 'production' ? 'terser' : false,
      terserOptions: mode === 'production' ? {
        compress: {
          drop_console: true,
          drop_debugger: true,
        }
      } : undefined,
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
        },
        output: {
          manualChunks: (id) => {
            // Create separate chunks for big dependencies
            if (id.includes('node_modules')) {
              if (id.includes('react') || id.includes('react-dom')) {
                return 'vendor-react';
              }
              if (id.includes('bootstrap')) {
                return 'vendor-bootstrap';
              }
              return 'vendor';
            }
          }
        }
      },
    },
    
    // Configure path aliases for imports - ensure this works properly
    resolve: {
      alias: [
        { find: '@', replacement: path.resolve(__dirname, './src') }
      ]
    },
    
    // Environment variables
    define: {
      __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
    },
    
    server: {
      port: 5202,
      open: true,
      host: mode === 'production' ? '0.0.0.0' : 'localhost',
      proxy: {
        '/api': {
          target: env.VITE_API_URL || 'http://localhost:3001',
          changeOrigin: true,
        }
      }
    },
    
    // Increase log level for detailed output in development
    logLevel: mode === 'development' ? 'info' : 'warn',
  };
}); 