<script>
	import { createEventDispatcher } from 'svelte';
	import { Link, X } from 'lucide-svelte';

	/** @type {any | null} */
	export let project = null;
	/** @type {any[]} */
	export let skills = [];
	/** @type {boolean} */
	export let visible = false;

	const dispatch = createEventDispatcher();

	/** @param {HTMLElement} node */
	const portal = (node) => {
		document.body.appendChild(node);

		return {
			destroy() {
				if (node.parentNode) {
					node.parentNode.removeChild(node);
				}
			}
		};
	};

	const close = () => {
		dispatch('close');
	};

	/** @param {MouseEvent} event */
	const handleBackdropClick = (event) => {
		if (event.target === event.currentTarget) {
			close();
		}
	};

	/** @param {KeyboardEvent} event */
	const handleKeydown = (event) => {
		if (event.key === 'Escape') {
			close();
		}
	};
</script>

<div
	class="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-4 py-6 transition-all duration-100"
	class:opacity-0={!visible}
	class:opacity-100={visible}
	class:pointer-events-none={!visible}
	class:pointer-events-auto={visible}
	use:portal
	on:click={handleBackdropClick}
	on:keydown={handleKeydown}
	role="dialog"
	aria-modal="true"
	tabindex="0"
>
	<div
		class="card variant-glass-surface w-[72rem] max-w-[96vw] max-h-[90vh] overflow-y-auto relative py-4 px-4 sm:px-6"
	>
		<button
			type="button"
			class="absolute z-10 right-5 top-5 p-2 rounded-full hover:bg-white/30 transition-all"
			on:click={close}
			aria-label="Close project details"
		>
			<X class="w-8 h-8 fill-primary-400 stroke-primary-400" />
		</button>

		<a href={project.link ?? project.github} target="_blank">
			<div
				class="w-full h-[50vh] project-hero bg-cover bg-center rounded-xl"
				style="background-image: url('{project.img}');"
			></div>
		</a>

		<div class="text-left -mt-4">
			<div class="flex flex-row items-center flex-wrap gap-y-2">
				<h3 class="h2 sm:h1 font-semibold">{project.name}</h3>
				{#if project.link}
					<a href={project.link} target="_blank" rel="noopener noreferrer" on:click|stopPropagation>
						<Link class="mx-2 w-[1.6rem]" />
					</a>
				{/if}
				{#if project.github}
					<a
						href={project.github}
						target="_blank"
						rel="noopener noreferrer"
						on:click|stopPropagation
					>
						<svg
							class="w-[1.6rem] fill-white mx-2"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 496 512"
							><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path
								d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
							/></svg
						>
					</a>
				{/if}
			</div>

			<div class="flex flex-row flex-wrap items-center justify-between mt-1">
				<div class="flex flex-row justify-center items-center">
					{#each project.skills as index}
						{#if skills[index]}
							<a href={skills[index].link} target="_blank">
								<div class="flex-none w-[24px] mr-3">
									<img src={skills[index].img} alt={skills[index].name + ' logo'} />
								</div>
							</a>
						{/if}
					{/each}
				</div>
				<div>
					{#each project.tags as tag}
						<span class="text-xl mr-2 text-primary-400">#{tag}</span>
					{/each}
				</div>
			</div>
			{#if project.tagline}
				<p class="font-bold mt-1">{@html project.tagline}</p>
			{/if}

			<p class="font-medium mt-5 text-lg">{@html project.longDescription}</p>
		</div>
	</div>
</div>

<style>
	.project-hero {
		--mask: linear-gradient(
			180deg,
			rgba(0, 0, 0, 1),
			rgba(0, 0, 0, 1),
			rgba(0, 0, 0, 0.9),
			rgba(0, 0, 0, 0.35),
			rgba(0, 0, 0, 0)
		);

		-webkit-mask: var(--mask);
		mask: var(--mask);
	}
</style>
