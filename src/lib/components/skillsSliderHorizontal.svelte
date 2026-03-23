<script lang="ts">
	import type { Skill } from '$lib/types';
	import { Marquee } from '@selemondev/svelte-marquee';
	import { popup, type PopupSettings } from '@skeletonlabs/skeleton';

	export let skills: Skill[];
	// let hovers: PopupSettings[] = [];

	// for (let i = 0; i < skills.length; i++) {
	// 	const popupHover: PopupSettings = {
	// 		event: 'hover',
	// 		target: 'popupHover-' + i,
	// 		placement: 'top'
	// 	};
	// 	hovers.push(popupHover);
	// }
</script>

<div class="card variant-glass-surface w-[25rem] max-w-[98vw] overflow-y-visible">
	<div class="grid gap-4 p-4 h-fit overflow-y-visible">
		<Marquee
			direction="left"
			fade={true}
			class="[--duration:12s] overflow-y-visible transform-gpu"
			pauseOnHover={true}
		>
			{#each skills as skill, index}
				<div class="flex flex-row items-center overflow-y-visible">
					<div class="flex-none w-[35px] mx-3">
						<a href={skill.link} target="_blank" rel="noopener noreferrer">
							<img src={skill.img} alt={skill.name + ' logo'} class="opacity-[65%]" />
						</a>
					</div>
				</div>

				<!-- <div class="card p-1.5 variant-soft-primary z-10" data-popup="popupHover-{index}">
					<p class="font-bold">{skill.name}</p>
					<div class="arrow variant-soft-primary" />
				</div> -->
			{/each}
		</Marquee>
	</div>
</div>
