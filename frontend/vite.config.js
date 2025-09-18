import path from 'path';
import react from '@vitejs/plugin-react-swc';
import { build, defineConfig } from 'vite';

export default defineConfig({
	server: {
		proxy: {
			'/api': 'http://localhost:4000/',
		},
		changeOrigin: true,
	},

	build: {
		chunkSizeWarningLimit: 1000,
		rollupOptions: {
			output: {
				manualChunks(id) {
					if (id.includes('node_modules')) {
						if (id.includes('react') || id.includes('react-dom')) {
							return 'react-vendor';
						}
						if (id.includes('axios') || id.includes('loadash')) {
							return 'vendor';
						}
						return 'lib';
					}
				},
				entryFileNames: 'assets/[name]-[hash].js',
				chunkFileNames: 'assets/[name]-[hash].js',
				assetFileNames: 'assets/[name]-[hash].[ext]',
			},
		},
	},
	plugins: [react()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
});
