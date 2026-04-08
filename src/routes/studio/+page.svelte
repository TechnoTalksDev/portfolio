<script lang="ts">
	import Carousel from '$lib/components/Carousel.svelte';
	import type { StudioPhoto, StudioVideo } from '$lib/types';
	import { ArrowDown } from 'lucide-svelte';
	import { blur } from 'svelte/transition';

	const photos: StudioPhoto[] = [
		{
			name: 'Grey peace',
			img: '/photos/grey.jpg',
			description:
				"A memorial that represents the grey history of the nation that now stands proud. It's hard to see the beauty in the grey, but it's important to remember it.",
			location: 'Empty Sky Memorial, Jersey City, NJ',
			date: '2025',
			shotOn: 'Sony A7IV 55mm f/1.8'
		},
		{
			name: 'vintage gradient',
			img: '/photos/sunset-small.jpg',
			description:
				'an aesthetic layer of grease and dust lends itself to a glowy nostalgic sunset. with the perfect gradient painted in the background silloueting the trees.',
			date: '2025',
			shotOn: 'Sony A7IV 55mm f/1.8'
		},
		{
			name: 'the lone sail',
			img: '/photos/sailboat.jpg',
			description: 'a lone sailboat against the bellevue skyline.',
			date: '2025',
			shotOn: 'Sony A7IV 55mm f/1.8'
		},
		{
			name: 'teddyyy',
			img: '/photos/teddyC.jpg',
			description: 'one of the funniest guys i know',
			date: 'March 2026',
			shotOn: 'Sony A7IV 30mm f/2.8'
		} /*{
		name: "robot go whee",
		img: "/photos/1523W.jpg",
		description: "at a VEX robotics competition mid match action",
		date: "2025",
		shotOn: "Sony A7IV 55mm f/1.8",
	}*/
	];

	const videos: StudioVideo[] = [
		{
			name: 'Crusyn Launch',
			description: `Crusyn is building real-world games designed to turn everyday moments
into shared experiences — no feeds, no maps, no mindless scrolling.

From spontaneous challenges to location-based games,
Crusyn is about doing more with the world around you.`,
			img: '/videos/thumbnails/crusyn-launch.png',
			link: 'https://www.youtube.com/watch?v=Inn_otN0v2Y',
			date: 'January 2026',
			shotOn: 'Sony A7IV 50mm f/1.8',
			featuring: ['Rishi S.', 'Ryan P.']
		},
		{
			name: 'this is peak',
			description: `Made for the prompt: 
Create a ~60-second video containing the following 3 props and the line of dialogue:
-A ball
-A caffeinated beverage
-Any device with a screen
-Dialogue: the phrase “this is peak`,
			link: 'https://www.youtube.com/watch?v=qq5_94hpEX4',
			date: 'November 2025',
			shotOn: 'Sony A7IV 50mm f/1.8',
			img: '/videos/thumbnails/thisispeak.png',
			honors: ['TSA WA State Qualifier 2025'],
			featuring: ['Shikha P.', 'Niteesh AJ']
		},
		{
			name: 'The Lincoln Test',
			description: `A short historical comedy film about Lincoln made in a week for TSA Digital Video Production.`,
			date: 'December 2025',
			shotOn: 'Sony A7IV 50mm f/1.8',
			img: '/videos/thumbnails/lincoln2.png',
			link: 'https://www.youtube.com/watch?v=mVhWnavYEEw',
			featuring: ['Rishi S.']
		}
	];

	let animate = $state(false);

	$effect(() => {
		animate = true;
	});
</script>

{#if animate}
	<div
		id="top-blob"
		transition:blur={{ amount: 5, duration: 3500 }}
		class="absolute top-[-15rem] left-0 right-0 ml-auto mr-auto w-[80vw] h-[20rem] rounded-[50%] bg-gradient-to-br from-surface-500 via-primary-500 to-white opacity-40 overflow-x-hidden blur-3xl"
	></div>

	<div id="studio" class="w-screen h-screen bg-black">
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
			<div class="relative w-full" transition:blur={{ amount: 5, duration: 2000 }}>
				<h2
					class="text-3xl sm:text-4xl md:text-6xl font-[bumbbled] gradient-heading animate-gradient absolute left-1/2 -translate-x-1/2 top-[0rem] sm:top-[6rem] md:top-[8rem] lg:top-[12rem]"
				>
					chandan's
				</h2>
				<h2
					class="blur-sm text-3xl sm:text-4xl md:text-6xl font-[bumbbled] gradient-heading animate-gradient absolute left-1/2 -translate-x-1/2 top-[0rem] sm:top-[6rem] md:top-[8rem] lg:top-[12rem]"
				>
					chandan's
				</h2>
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
			<div class="flex-end">
				<div
					class="flex justify-center items-center w-[50px] h-[50px] rounded-full variant-soft-primary animate-bounce"
					transition:blur={{ amount: 5, duration: 4000 }}
				>
					<a href="#photos"><ArrowDown size="30" strokeWidth="2.5" /></a>
				</div>
				<div
					id="b-blob"
					class="absolute bottom-[0rem] left-0 right-0 ml-auto mr-auto w-[5rem] h-[5rem] rounded-[50%] bg-gradient-to-br from-surface-500 via-primary-500 to-white opacity-40 overflow-x-hidden -z-10 blur-3xl"
				></div>
			</div>
		</div>
		<div id="photos" class="h-screen w-screen items-center justify-center flex flex-col bg-black">
			<Carousel
				title={'photos'}
				items={photos}
				ariaLabel="Studio photographs"
				class="w-[100vw]"
				intervalMs={5000}
			/>
		</div>
		<div id="films" class="h-screen w-screen items-center justify-center flex flex-col bg-black">
			<Carousel
				title={'films'}
				items={videos}
				ariaLabel="Studio photographs"
				class="w-[100vw]"
				intervalMs={5000}
			/>
		</div>
		<div id="letter" class="h-screen w-screen items-center justify-center flex flex-col bg-black">
			<div class="text-xl w-[30rem] max-w-[90vw] leading-10">
				<p class="">
					I started by <strong>messing around</strong> with my dad’s phone, just taking photos of
					whatever looked interesting.
					<br /> <br />
					Somewhere along the way, it turned into something more. I started noticing
					<span
						class="underline decoration-wavy decoration-primary-400 decoration-2 underline-offset-4"
						>moments differently</span
					>
					— framing things, chasing light, trying to tell stories through what I saw.
					<br /> <br />
					Now I’m constantly creating, whether it’s photos or short films with friends — always trying
					to improve, always trying to <strong>capture something</strong> that feels
					<span
						class="underline decoration-wavy decoration-primary-400 decoration-2 underline-offset-4"
						>real</span
					>.
					<br /> <br />
					If you want to see how that same mindset shows up in my work as a developer,
					<a href="/" class="font-[bumbbled] gradient-heading animate-gradient">check out</a>
					the other side of my portfolio, where I build <strong>real-world</strong> projects that solve
					problems and create value.
				</p>
				<p class="text-right mt-12 text-2xl">
					- <span class="font-[bumbbled] gradient-heading">Chandan</span>
				</p>
			</div>
			<!-- <a href="/">
				<h1
					class="text-8xl font-[bumbbled] tracking-wide text-surface-300 gradient-tertiary animate-gradient hover:scale-[1.01] transition-all"
				>
					learn more
				</h1>
			</a> -->
		</div>
	</div>
{/if}

<style>
	#studio {
		scroll-behavior: smooth;
	}
</style>
