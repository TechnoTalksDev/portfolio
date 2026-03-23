import { join } from 'node:path';
import { createRequire } from 'node:module';
import type { Config } from 'tailwindcss';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import * as twPluginModule from '@skeletonlabs/tw-plugin';
import { techno } from './src/techno';

const require = createRequire(import.meta.url);

type SkeletonFactory = (options: unknown) => unknown;
type TailwindPluginEntry = NonNullable<Config['plugins']>[number];

const moduleObject = twPluginModule as {
	default?: unknown;
	skeleton?: unknown;
};

const defaultObject = moduleObject.default as
	| {
			skeleton?: unknown;
	  }
	| undefined;

const skeletonPlugin =
	(typeof moduleObject.skeleton === 'function'
		? (moduleObject.skeleton as SkeletonFactory)
		: undefined) ||
	(typeof moduleObject.default === 'function'
		? (moduleObject.default as SkeletonFactory)
		: undefined) ||
	(typeof defaultObject?.skeleton === 'function'
		? (defaultObject.skeleton as SkeletonFactory)
		: undefined);

if (!skeletonPlugin) {
	throw new Error('Failed to resolve @skeletonlabs/tw-plugin skeleton export');
}

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
		skeletonPlugin({
			themes: {
				custom: [techno]
			}
		}) as TailwindPluginEntry
	]
} satisfies Config;
