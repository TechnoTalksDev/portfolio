import { join } from 'node:path';
import { createRequire } from 'node:module';
import type { Config } from 'tailwindcss';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import { techno } from './src/techno';

const require = createRequire(import.meta.url);
const { skeleton } = require('@skeletonlabs/tw-plugin') as {
	skeleton: (options: {
		themes: {
			custom: (typeof techno)[];
		};
	}) => NonNullable<Config['plugins']>[number];
};

export default {
	darkMode: 'class',
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')
	],
	theme: {
		extend: {}
	},
	plugins: [
		forms,
		typography,
		skeleton({
			themes: {
				custom: [techno]
			}
		})
	]
} satisfies Config;
