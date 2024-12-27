import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import WindiCSS from 'vite-plugin-windicss';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), WindiCSS()],
	resolve: {
		alias: {
			'@': resolve(__dirname, 'src'),
			'@public': resolve(__dirname, 'public'),
		},
	},
	server: {
		port: 9999,
	},
	build: {
		outDir: 'dist',
		sourcemap: true,
		emptyOutDir: true,
	},
});
