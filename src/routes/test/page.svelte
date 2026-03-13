<script lang="ts">
	import Follow from '$lib/components/follow.svelte';
	import { onMount } from 'svelte';
	import { ArrowDown, Link } from 'lucide-svelte';
	import Marqueeck from '@arisbh/marqueeck';
	import { getToastStore } from '@skeletonlabs/skeleton';
	import type { ToastSettings } from '@skeletonlabs/skeleton';
	import { Marquee } from '@selemondev/svelte-marquee';
	import '@selemondev/svelte-marquee/dist/style.css';
	import Experience from '$lib/components/experience.svelte';
	const toastStore = getToastStore();

	let currentSub = 0;
	let subs = ['Student', 'Developer', 'Entrepreneur', 'Engineer'];

	let sub = '';

	/**
	 * @param {number | undefined} ms
	 */
	function sleep(ms: number | undefined) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}

	async function typeSub() {
		for (const char of subs[currentSub]) {
			await sleep(150);
			//console.log(char)
			sub += char;
		}

		await sleep(3000);

		for (let i = sub.length - 1; i >= 0; i--) {
			await sleep(150);
			sub = sub.slice(0, -1);
			//console.log(sub)
		}

		if (currentSub < subs.length - 1) {
			currentSub += 1;
		} else {
			currentSub = 0;
		}

		typeSub();
	}

	const longWhile = 30000;

	const comingSoon: ToastSettings = {
		message:
			"<strong>Hey! <span class='wave text-2xl'>👋</span></strong> <br/>Look's like you ❤️ my work! <br/> This site's still under construction... 🚧 <br/> <strong>Check back later</strong> for more cool stuff!",
		background: 'variant-glass-primary',
		timeout: 60000
	};

	onMount(() => {
		typeSub();

		const timer = setTimeout(() => {
			//console.log("User has been on site for: "+longWhile+ " s");
			toastStore.trigger(comingSoon);
		}, longWhile);

		return () => clearTimeout(timer);
	});

	const mailList: ToastSettings = {
		message: '📧 Coming soon...',
		background: 'variant-glass-tertiary',
		hideDismiss: true,
		timeout: 3000
	};

	function handleMailList() {
		toastStore.trigger(mailList);
	}

	const skills = [
		{
			name: 'SvelteKit',
			img: '/svelte.png',
			skill: 4.4
		},
		{
			name: 'TypeScript',
			img: '/typescript.png',
			skill: 3.8
		},
		{
			name: 'MongoDB',
			img: '/mongo.png',
			skill: 2.8
		},
		{
			name: 'Python',
			img: '/python.png',
			skill: 3.6
		},
		{
			name: 'C++',
			img: '/cplusplus.png',
			skill: 2.6
		},
		{
			name: 'Kotlin',
			img: '/kotlin.png',
			skill: 2.5
		},
		{
			name: 'Azure',
			img: '/azure.png',
			skill: 3.6
		},
		{
			name: 'Docker',
			img: '/docker.png',
			skill: 4.2
		},
		{
			name: 'VEX',
			img: '/vex.png',
			skill: 4.2
		}
	];

	const projects = [
		{
			name: 'Reko',
			img: '/reko-banner.png',
			description: 'Discord bot to monitor Minecraft servers',
			link: '',
			github: 'https://github.com/TechnoTalksDev/Reko',
			tags: ['Discord', 'API', 'Minecraft', 'Server']
		},
		{
			name: 'HotDash',
			img: '/hot-dash.png',
			description: 'Display host temperatures and load',
			link: '',
			github: 'https://github.com/TechnoTalksDev/HotDash',
			tags: ['Server', 'Docker']
		},
		{
			name: '10A VEX',
			img: '/10A.png',
			description: 'VEX V5 Robotics programming',
			link: '',
			github: 'https://github.com/Exo10A',
			tags: ['VEX', ['c++']]
		},
		/*
		{
			name: "Retrospective",
			img: "https://fastrepair.biz/wp-content/uploads/2018/10/iStock-984996502-3.jpg",
			description: "Built by students for students",
			link: "",
			github: "",
			tags: ["startup"]
		},
		*/
		{
			name: 'Simeo',
			img: '/simeo_full.png',
			description: 'GPA and Grades for Synergy students',
			link: 'https://www.simeo.app/',
			github: 'https://github.com/TechnoTalksDev/Simeo',
			tags: ['FBLA', 'full-stack']
		},
		{
			name: 'Reko Link',
			img: '/reko-banner.png',
			description: 'Integration server-side for Reko',
			link: '',
			github: 'https://github.com/TechnoTalksDev/Reko-Link',
			tags: ['WebSockets', 'API', 'Minecraft', 'Server']
		},
		{
			name: 'Rider-MC',
			img: '/rider-banner.png',
			description: 'Ride any Minecraft mob!',
			link: 'https://www.spigotmc.org/resources/rider-simple-easy-ride-anything-1-8x-1-17x.93807/',
			github: 'https://github.com/TechnoTalksDev/Rider-MC',
			tags: ['Minecraft', 'Plugin', 'Java']
		},
		{
			name: 'CraftableSaddlesMC',
			img: '/saddle-banner.png',
			description: 'With a variety of permissions!',
			link: 'https://www.spigotmc.org/resources/craftablesaddles-simple-easy-1-8x-1-17x.93871/',
			github: 'https://github.com/TechnoTalksDev/CraftableSaddlesMC',
			tags: ['Minecraft', 'Plugin', 'Java']
		},
		{
			name: 'Spaceboi',
			img: '/spaceboi.png',
			description: 'Pilot and fight in 2D!',
			link: '',
			github: 'https://github.com/TechnoTalksDev/Spaceboi',
			tags: ['PyGame', 'Python', 'GameDev']
		},
		{
			name: 'SAHF',
			img: '/SAHF-banner.png',
			description: 'South Asian Heart Foundation website',
			link: 'https://www.sahf.life/',
			github: 'https://github.com/South-Asian-Heart-Foundation/SAHF-site',
			tags: ['SvelteKit', 'full-stack', 'Non-profit']
		}
	];

	const experiences = [
		{
			date: 'August 2023 - Present',
			company: 'Exothermic Alpha',
			position: 'Lead Developer',
			blurb: 'Working on large-scale applications using modern web technologies.'
		},
		{
			date: 'July - August 2024',
			company: 'Quadrant',
			position: 'Intern',
			blurb: 'Working on large-scale applications using modern web technologies.'
		},
		{
			date: 'August 2024 - Present',
			company: 'SAHF',
			position: 'CTO',
			blurb: 'Working on large-scale applications using modern web technologies.'
		},

		{
			date: 'Oct. 2024 - Present',
			company: 'NC FBLA',
			position: 'Tech Commitee',
			blurb: 'Working on large-scale applications using modern web technologies.'
		}
	];

	const featuredProject = {
		name: 'Simeo',
		description: 'A GPA and Grade solution for Synergy students',
		tags: ['FBLA', 'full-stack'],
		link: 'https://www.simeo.app/',
		github: 'https://github.com/TechnoTalksDev/Simeo',
		img: '/simeo_full.png'
	};
</script>

<Follow />

<div
	id="l-blob"
	class="z-[-3] absolute w-[20rem] h-[17rem] rounded-[50%] bg-gradient-to-br from-error-500 via-tertiary-500 to-secondary-500 opacity-40 top-[-5rem] left-[-10rem] overflow-x-hidden"
	style="animation-name: spin; animation-duration: 30s;"
></div>

<div
	id="r-blob"
	class="z-[-3] absolute w-[20rem] h-[17rem] rounded-[50%] bg-gradient-to-br from-warning-500 via-tertiary-500 to-secondary-500 opacity-40 top-[-5rem] right-[-10rem] overflow-x-hidden"
	style="animation-name: spin; animation-duration: 30s;"
></div>

<div
	id="m-blob"
	class="absolute top-[-6rem] left-0 right-0 ml-auto mr-auto w-[10rem] h-[8rem] rounded-[50%] bg-gradient-to-br from-surface-500 via-primary-500 to-white opacity-40 overflow-x-hidden"
	style="animation-name: spin; animation-duration: 30s;"
></div>

<!--
<div id="b-blob" class="absolute bottom-[-6rem] left-0 right-0 ml-auto mr-auto w-[10rem] h-[8rem] rounded-[50%] bg-gradient-to-br from-surface-500 via-primary-500 to-white opacity-40 overflow-x-hidden" style="animation-name: spin; animation-duration: 30s;">
</div>
-->

<div class="h-[100vh] w-[100vw] backdrop-blur-3xl overflow-x-hidden scroll-smooth">

	<div
		id="home"
		class="container h-[100vh] mx-auto flex flex-row flex-wrap lg:flex-col justify-center items-center z-[1] overflow-x-hidden space"
	>


      <div class="grid gap-4 lg:grid-cols-2 lg:grid-rows-2">

        <div class="relative max-lg:row-start-1">
          <div class="relative flex h-full flex-col overflow-hidden card variant-glass">
            1
          </div>
        </div>

        <div class="relative max-lg:row-start-2 lg:col-start-1 lg:row-start-2">
          <div class="relative flex h-full flex-col overflow-hidden card variant-glass">
            2
          </div>
        </div>


        <div class="relative lg:row-span-2">

          <div class="relative flex h-full flex-col overflow-hidden card variant-glass ">
            3
          </div>

        </div>
      </div>


  
  
  </div>
</div>

<style lang="postcss">
	.glow {
		text-shadow: 5px 0px 20px rgba(255, 255, 255, 0.26);
	}

	.cursor {
		@apply bg-primary-500;
		@apply rounded opacity-70;
		width: 0.25rem;
		height: 1.5rem;

		animation: blink 1s infinite;
	}

	@keyframes blink {
		0%,
		100% {
			background-color: transparent;
		}
		50% {
			@apply bg-primary-500;
		}
	}

	.animate-gradient {
		background-size: 300%;
		-webkit-animation: animatedgradient 6s ease infinite alternate;
		-moz-animation: animatedgradient 6s ease infinite alternate;
		animation: animatedgradient 6s ease infinite alternate;
	}

	@keyframes animatedgradient {
		0% {
			background-position: 0% 50%;
		}
		50% {
			background-position: 100% 50%;
		}
		100% {
			background-position: 0% 50%;
		}
	}

	@keyframes scroll {
		0% {
			transform: translateX(0);
		}
		100% {
			transform: translateX(-50%);
		}
	}

	.scroll-container {
		display: flex;
		overflow: hidden;
		white-space: nowrap;

		--mask: linear-gradient(
				to right,
				rgba(0, 0, 0, 0) 0%,
				rgba(0, 0, 0, 1) 10%,
				rgba(0, 0, 0, 1) 90%,
				rgba(0, 0, 0, 0) 100%
			)
			0% 0% / 100% 100% repeat-x;

		-webkit-mask: var(--mask);
		mask: var(--mask);
	}

	.scroll-content {
		display: flex;
		align-items: center;
		animation: scroll 20s linear infinite;
	}

	.project-hero {
		--mask: linear-gradient(180deg, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));

		-webkit-mask: var(--mask);
		mask: var(--mask);
	}

	@keyframes wave {
		0% {
			transform: rotate(0deg);
		}
		10% {
			transform: rotate(14deg);
		}
		20% {
			transform: rotate(-8deg);
		}
		30% {
			transform: rotate(14deg);
		}
		40% {
			transform: rotate(-4deg);
		}
		50% {
			transform: rotate(10deg);
		}
		60% {
			transform: rotate(0deg);
		} /* Reset for the next cycle */
		100% {
			transform: rotate(0deg);
		}
	}

	:global(.wave) {
		display: inline-block;
		animation: wave 1.5s infinite;
		transform-origin: 70% 70%;
	}
</style>
