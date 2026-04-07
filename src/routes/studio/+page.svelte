<script lang="ts">
	import Carousel from '$lib/components/Carousel.svelte';
	import { blur } from 'svelte/transition';

	type StudioPhoto = {
		name: string;
		img: string;
		description: string;
		location?: string;
		date: number;
		shotOn: string;
		featuring?: string[];
		honors?: string[];
	};

	const photos: StudioPhoto[] = [{
    name: "Grey peace",
    img: "/photos/grey.jpg",
    description: "A memorial that represents the grey history of the nation that now stands proud. It's hard to see the beauty in the grey, but it's important to remember it.",
    location: "Empty Sky Memorial, Jersey City, NJ",
    date: 2025,
    shotOn: "Sony A7IV 55mm f/1.8",
  }, {
    name: "vintage gradient",
    img: "/photos/sunset-small.jpg",
    description: "an aesthetic layer of grease and dust lends itself to a glowy nostalgic sunset. with the perfect gradient painted in the background silloueting the trees.",
    date: 2025,
    shotOn: "Sony A7IV 55mm f/1.8",
	}, {
		name: "the lone sail",
		img: "/photos/sailboat.jpg",
		description: "a lone sailboat against the bellevue skyline.",
		date: 2025,
		shotOn: "Sony A7IV 55mm f/1.8",
	}];
  
  let animate = $state(false)

  $effect (() => {
    animate = true;
  })

</script>

{#if animate}
<div
	id="top-blob"
	transition:blur={{ amount: 5, duration: 3500 }}
	class="absolute top-[-15rem] left-0 right-0 ml-auto mr-auto w-[80vw] h-[20rem] rounded-[50%] bg-gradient-to-br from-surface-500 via-primary-500 to-white opacity-40 overflow-x-hidden blur-3xl"
></div>


<div class="w-screen h-screen bg-black">
	<div class="h-screen w-full items-center justify-center flex flex-col">
		<!-- <div class="relative w-auto -mb-96" transition:blur={{ amount: 5, duration: 1500 }}>
			<h2
				class="text-6xl gradient-heading leading-normal font-[bumbbled] whitespace-nowrap select-none"
			>
				chandan's
			</h2>

			<h2
				class="text-6xl gradient-tertiary leading-normal font-[bumbbled] blur-lg absolute inset-0 whitespace-nowrap select-none"
			>
				chandan's
			</h2>
		</div> -->
		<div class="relative w-auto" transition:blur={{ amount: 5, duration: 2000 }}>
			<h1
				class="text-[36cqw] gradient-heading leading-normal font-[bumbbled] whitespace-nowrap select-none"
			>
				studio
			</h1>
			<h1
				class="text-[36cqw] gradient-heading leading-normal font-[bumbbled] blur-lg absolute inset-0 whitespace-nowrap select-none"
			>
				studio
			</h1>
		</div>
	</div>
	<div class="h-screen w-screen items-center justify-center flex flex-col bg-black">
		<Carousel items={photos} ariaLabel="Studio photographs" class="w-[100vw]" intervalMs={100000}/>
	</div>
</div>
{/if}