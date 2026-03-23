import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte'],
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: [vitePreprocess()],

	kit: {
		adapter: adapter({
			runtime: 'nodejs20.x'
		})

		/*
		adapter: adapter({
			// see adapter-vercel options in:
			// https://svelte.dev/docs/kit/adapter-vercel
			runtime: 'nodejs20.x'
		})
		*/
	}
};
export default config;
