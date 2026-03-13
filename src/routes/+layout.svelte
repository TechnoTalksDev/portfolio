<script lang="ts">
	import '../app.postcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';

	// Highlight JS
	import hljs from 'highlight.js/lib/core';
	import 'highlight.js/styles/github-dark.css';
	import { storeHighlightJs } from '@skeletonlabs/skeleton';
	import xml from 'highlight.js/lib/languages/xml'; // for HTML
	import css from 'highlight.js/lib/languages/css';
	import javascript from 'highlight.js/lib/languages/javascript';
	import typescript from 'highlight.js/lib/languages/typescript';

	hljs.registerLanguage('xml', xml); // for HTML
	hljs.registerLanguage('css', css);
	hljs.registerLanguage('javascript', javascript);
	hljs.registerLanguage('typescript', typescript);
	storeHighlightJs.set(hljs);

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	import { initializeStores, Toast } from '@skeletonlabs/skeleton';
	import Unami from '$lib/components/unami.svelte';

	initializeStores();
</script>
<Unami />
<Toast position="br" padding="p-3"/>
<!-- App Shell -->
<AppShell>

	<!--
	<div class = "absolute left-0 right-0 mt-6 ml-auto mr-auto flex flex-col items-center z-[2] w-min">
		<div class="flex flex-row">
			<a
				class="btn btn-sm variant-ghost-surface drop-shadow-xl"
				href="#about"
				rel="noreferrer"
			>
				About
			</a>
			<a
				class="btn btn-sm variant-ghost-surface drop-shadow-xl mx-1"
				href="#projects"
				rel="noreferrer"
			>
				Projects
			</a>
			<a
				class="btn btn-sm variant-ghost-surface drop-shadow-xl"
				href="#contact"
				rel="noreferrer"
			>
				Contact
			</a>
		</div>
	</div>
	-->
	<!-- Page Route Content -->
	<slot />
</AppShell>


<style>

</style>
