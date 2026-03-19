<script lang="ts">
	import '../app.postcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
	import Dock from '$lib/components/Dock.svelte';
	import DockIcon from '$lib/components/DockIcon.svelte';
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
	import { currentSection } from '$lib/stores/sectionStore';

	initializeStores();
</script>

<Unami />
<Toast position="br" padding="p-3" />
<!-- App Shell -->
<AppShell>
	<div class="absolute left-0 right-0 mt-2 ml-auto mr-auto flex flex-col items-center z-[2] w-fit">
		<Dock
			direction="middle"
			class="card border-1 border-zinc-100/10 variant-glass w-full transition-all duration-500"
			let:mouseX
			let:distance
			let:magnification
		>
			<DockIcon mode="text" {mouseX} {magnification} {distance}>
				<a
					class="btn btn-sm drop-shadow-xl text-lg whitespace-nowrap hover:underline  {$currentSection ===
					'hey'
						? 'gradient-heading animate-gradient'
						: ''}"
					href="#hey"
					rel="noreferrer"
				>
					hey
				</a>
			</DockIcon>

			<DockIcon mode="text" {mouseX} {magnification} {distance}>
				<a
					class="btn btn-sm drop-shadow-xl mx-1 text-lg whitespace-nowrap {$currentSection ===
					'experience'
						? 'gradient-heading animate-gradient'
						: ''}"
					href="#experience"
					rel="noreferrer"
				>
					experience
				</a>
			</DockIcon>

			<DockIcon mode="text" {mouseX} {magnification} {distance}>
				<a
					class="btn btn-sm drop-shadow-xl mx-1 text-lg whitespace-nowrap {$currentSection ===
					'projects'
						? 'gradient-heading animate-gradient'
						: ''}"
					href="#projects"
					rel="noreferrer"
				>
					projects
				</a>
			</DockIcon>

			<DockIcon mode="text" {mouseX} {magnification} {distance}>
				<a
					class="btn btn-sm drop-shadow-xl text-lg whitespace-nowrap {$currentSection === 'contact'
						? 'gradient-heading animate-gradient'
						: ''}"
					href="#contact"
					rel="noreferrer"
				>
					contact
				</a>
			</DockIcon>
		</Dock>

		<!-- <div class="flex flex-row ">
			<a
				class="btn btn-sm drop-shadow-xl text-lg"
				href="#about"
				rel="noreferrer"
			>
				hey
			</a>
						<a
				class="btn btn-sm drop-shadow-xl mx-1 text-lg"
				href="#experience"
				rel="noreferrer"
			>
				experiences
			</a>
			<a
				class="btn btn-sm  drop-shadow-xl mx-1 text-lg"
				href="#projects"
				rel="noreferrer"
			>
				projects
			</a>
			<a
				class="btn btn-sm  drop-shadow-xl text-lg"
				href="#contact"
				rel="noreferrer"
			>
				contact
			</a>
		</div> -->
	</div>

	<!-- Page Route Content -->
	<slot />
</AppShell>

<style>
</style>
