import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@app': path.resolve(__dirname, 'src/app'),
			'@shared': path.resolve(__dirname, 'src/shared'),
			'@entities': path.resolve(__dirname, 'src/entities'),
			'@features': path.resolve(__dirname, 'src/features'),
			'@pages': path.resolve(__dirname, 'src/pages'),
			'@api': path.resolve(__dirname, 'src/api'),
			'@assets': path.resolve(__dirname, 'src/assets'),
			'@data': path.resolve(__dirname, 'src/data'),
			'@public': path.resolve(__dirname, 'src/public')
		}
	},
	build: {
		// Оптимизация сборки
		target: 'es2015',
		minify: 'terser',
		sourcemap: false,
		rollupOptions: {
			output: {
				manualChunks: {
					vendor: ['react', 'react-dom', 'react-router-dom'],
					redux: ['@reduxjs/toolkit', 'react-redux'],
					ui: ['@headlessui/react', 'react-icons']
				}
			}
		},
		chunkSizeWarningLimit: 1000
	},
	server: {
		// Настройки dev сервера
		port: 3000,
		open: true
	},
	preview: {
		port: 4173
	}
})
