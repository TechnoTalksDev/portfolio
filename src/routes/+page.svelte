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
	import IntroCard from '$lib/components/introCard.svelte';
	import SkillSlider from '$lib/components/skillSlider.svelte';
	import ProjectCard from '$lib/components/projectCard.svelte';
	import LatestCommit from '$lib/components/latestCommit.svelte';
	import SkillsSliderHorizontal from '$lib/components/skillsSliderHorizontal.svelte';
	import NewExperience from '$lib/components/newExperience.svelte';
	import ContactCall from '$lib/components/contactCall.svelte';
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
			"<strong>Hey! <span class='wave text-2xl'>👋</span></strong> <br/>Look's like you ❤️ my work! <br/> Want experiences like this for yourself? 🚧 <br/> <a href='#contact' class='btn btn-md btn-hover variant-glass-success mt-1 font-semibold'>Get in touch!</a>",
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
		},
		{
			name: 'PocketBase',
			img: '/pb.svg',
			skill: 4.2
		},
		{ name: 'Flutter', img: '/flutter.svg', skill: 3.2 }
	];

	const projects = [
		{
			name: '10A VEX',
			img: '/10A.png',
			description:
				'<strong>Innovate Award @ State</strong><br/>VEX V5 Robotics programming, implementing various motion algorithms, telemetry systems, localization, and more.',
			link: 'https://www.instagram.com/exothermicalpha/',
			github: 'https://github.com/Exo10A',
			tags: ['VEX', 'c++'],
			skills: [8, 4, 3, 7]
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
			description:
				'<strong>1.3k+ views per month</strong><br/>GPA and Grade caluculation for Synergy students. With seamless integration with Synergy, and highly customizable calculations.',
			link: 'https://www.simeo.app/',
			github: 'https://github.com/TechnoTalksDev/Simeo',
			tags: ['FBLA', 'full-stack'],
			skills: [0, 1, 2, 6]
		},
		{
			name: 'SAHF',
			img: '/SAHF-banner.png',
			description:
				'South Asian Heart Foundation website, featuring a variety of services, along with a blog.',
			link: 'https://www.sahf.life/',
			github: 'https://github.com/South-Asian-Heart-Foundation/SAHF-site',
			tags: ['SvelteKit', 'full-stack', 'Non-profit'],
			skills: [0, 1, 9, 6]
		},
		{
			name: 'ThePiSchool',
			img: '/thepischool.png',
			description:
				'Freelance web development client, featuring a tutoring service paired with tastefull design.',
			link: 'https://thepischools.com/',
			github: '',
			tags: ['SvelteKit', 'full-stack', 'Business'],
			skills: [0, 1, 6]
		},
		{
			name: 'Reko',
			img: '/reko-banner.png',
			description:
				'<strong>150+ commits </strong><br/>Discord bot integration for Minecraft servers. Monitor through panels, charts, and more.',
			link: '',
			github: 'https://github.com/TechnoTalksDev/Reko',
			tags: ['Discord', 'API', 'Minecraft', 'Server'],
			skills: [3, 2, 7]
		},
		{
			name: 'Rider-MC',
			img: '/rider-banner.png',
			description:
				'<strong>1000+ downloads</strong><br/>Ride any Minecraft mob! With a variety of permissions, and customization.',
			link: 'https://www.spigotmc.org/resources/rider-simple-easy-ride-anything-1-8x-1-17x.93807/',
			github: 'https://github.com/TechnoTalksDev/Rider-MC',
			tags: ['Minecraft', 'Plugin', 'Java'],
			skills: [5]
		},
		{
			name: 'CraftableSaddlesMC',
			img: '/saddle-banner.png',
			description:
				'<strong>500+ downloads</strong><br/>Craft saddles for any mob! With a variety of permissions, and customization.',
			link: 'https://www.spigotmc.org/resources/craftablesaddles-simple-easy-1-8x-1-17x.93871/',
			github: 'https://github.com/TechnoTalksDev/CraftableSaddlesMC',
			tags: ['Minecraft', 'Plugin', 'Java'],
			skills: [5]
		},
		{
			name: 'Reko Link',
			img: '/reko-banner.png',
			description:
				'Integration server-side for Reko with WebSockets, API, and more. Allowing access to server console, 2 way chat, active roles, and more.',
			link: '',
			github: 'https://github.com/TechnoTalksDev/Reko-Link',
			tags: ['WebSockets', 'API', 'Minecraft', 'Server'],
			skills: [5, 3]
		},
		{
			name: 'HotDash',
			img: '/hot-dash.png',
			description: 'Simple dashboard for host temperatures and load',
			link: '',
			github: 'https://github.com/TechnoTalksDev/HotDash',
			tags: ['Server', 'Docker'],
			skills: [0, 1]
		},
		{
			name: 'Spaceboi',
			img: '/spaceboi.png',
			description: 'Pilot and fight in 2D! Built with pygame, and python.',
			link: '',
			github: 'https://github.com/TechnoTalksDev/Spaceboi',
			tags: ['PyGame', 'Python', 'GameDev'],
			skills: [3]
		}
	];

	/*
	const experiences = [
		{
			date: 'August 2023 - Present',
			company: 'Exothermic Alpha',
			position: 'Lead Developer',
			blurb: 'Lead Software Developer for Exothermic Alpha 10A. Developing motion algorithms, autonomous routines, localization, and more for VEX Robotics'
		},
		{
			date: 'July - August 2024',
			company: 'Quadrant',
			position: 'Intern',
			blurb: 'Lead a team of Interns as a SCRUM master to develop an data driven application for a company project pitch. Learned various technologies like: Azure DevOps, Data Engineering, Data Warehousing, SQL Server, Deep Learning, Artificial Intelligence, Generative AI'
		},
		{
			date: 'August 2024 - Present',
			company: 'SAHF',
			position: 'CTO',
			blurb: 'Manage all technology affairs of SAHF. Designed a full stack website to drive conversions. Along with designing a blog system with SEO performance, interactive quizzes to promote engagement in events and more.'
		},

		{
			date: 'Oct. 2024 - Present',
			company: 'NC FBLA',
			position: 'Tech Commitee',
			blurb: 'Maintain technology initiatives of North Creek FBLA Work on the NC FBLA mobile app Build technology solutions for local business partners'
		}
	];
	*/

	const experiences = [
		{
			date: 'August 2023 - 2025',
			company: 'Exothermic Alpha',
			position: 'Lead Developer',
			blurb:
				'Developing motion algorithms and autonomous routines for VEX Robotics, optimizing localization and system performance.',
			skills: [4, 7, 8]
		},
		{
			date: 'July - August 2024',
			company: 'Quadrant',
			position: 'Intern',
			blurb:
				'Led interns as SCRUM master to build a data-driven application for a company pitch, leveraging modern cloud and AI technologies.',
			skills: [0, 6, 7, 9]
		},
		{
			date: 'August 2024 - Present',
			company: 'SAHF',
			position: 'CTO',
			blurb:
				'Oversee technology strategy, develop conversion-driven web solutions, and implement SEO-focused blogs and interactive tools.',
			skills: [0, 6, 9]
		},
		{
			date: 'Oct. 2024 - 2024',
			company: 'NC FBLA',
			position: 'Tech Committee',
			blurb:
				'Maintain NC FBLA’s tech initiatives, develop mobile solutions, and build digital tools for local business partners.',
			skills: [10]
		},
		{
			date: '2025 - Present',
			company: 'STEAMOJI ROBOTICS',
			position: 'Public Relations',
			blurb:
				'A student-created and led robotics organization. Created a website to inform parents and students of updates, including live feeds of event and award data. Currently used as the primary communication center for all parents and students of the organization.',
			skills: [0, 1, 8]
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
></div>

<!--
<div id="b-blob" class="absolute bottom-[-6rem] left-0 right-0 ml-auto mr-auto w-[10rem] h-[8rem] rounded-[50%] bg-gradient-to-br from-surface-500 via-primary-500 to-white opacity-40 overflow-x-hidden" style="animation-name: spin; animation-duration: 30s;">
</div>
-->

<div class="h-[100vh] w-[100vw] backdrop-blur-3xl overflow-x-hidden scroll-smooth">
	<div
		id="hey"
		class="container h-[100vh] mx-auto flex flex-col justify-center items-center z-[1] overflow-x-hidden"
	>
		<div class="h-full text-center flex flex-col items-center justify-center">
			<IntroCard />
			<span class="my-1.5"></span>
			<SkillsSliderHorizontal {skills} />
		</div>

		<!--arrow-->
		<div class="flex-end">
			<div
				class="flex justify-center items-center w-[50px] h-[50px] rounded-full variant-soft-primary animate-bounce"
			>
				<a href="#experience"><ArrowDown size="30" strokeWidth="2.5" /></a>
			</div>
			<div
				id="b-blob"
				class="absolute bottom-[0rem] left-0 right-0 ml-auto mr-auto w-[5rem] h-[5rem] rounded-[50%] bg-gradient-to-br from-surface-500 via-primary-500 to-white opacity-40 overflow-x-hidden -z-10 blur-3xl"
			></div>
		</div>
	</div>

	<div
		id="experience"
		class="container min-h-[100vh] h-fit w-fit mx-auto flex flex-col justify-center items-center z-[1] overflow-x-hidden"
	>
		<div class="h-full flex flex-col col-span-2 flex-wrap items-center justify-center my-8">
			<NewExperience {experiences} {skills} />
		</div>
		<!--arrow-->
		<div class="flex-end">
			<div
				class="flex justify-center items-center w-[50px] h-[50px] rounded-full variant-soft-primary animate-bounce"
			>
				<a href="#projects"><ArrowDown size="30" strokeWidth="2.5" /></a>
			</div>
			<div
				id="b-blob"
				class="absolute bottom-[0rem] left-0 right-0 ml-auto mr-auto w-[5rem] h-[5rem] rounded-[50%] bg-gradient-to-br from-surface-500 via-primary-500 to-white opacity-40 overflow-x-hidden -z-10 blur-3xl"
			></div>
		</div>
	</div>

	<div
		id="projects"
		class="container min-h-[100vh] h-fit w-fit mx-auto flex flex-col justify-center items-center z-[1] overflow-x-hidden"
	>
		<div class="h-full flex flex-col items-center justify-center my-8">
			<ProjectCard {projects} {skills} />
		</div>
	</div>

	<div
		id="contact"
		class="container h-[100vh] mx-auto flex flex-col justify-center items-center z-[1] overflow-x-hidden"
	>
		<ContactCall />
	</div>

	<!--
	<div id="hero" class="container h-[100vh] mx-auto flex flex-col justify-center items-center z-[1] overflow-x-hidden">
		
		<div class="space-y-10 h-full text-center flex flex-col items-center justify-center">
			
			<div>

				<h2 class="h1 text-7xl glow">Chandan C.</h2>
				<div class="flex flex-row justify-center items-center mt-3">
					<h2 class="text-2xl gradient-heading">{sub}</h2>
					<div class="cursor my-1"></div>
				</div>

				<hr class="mt-6 !border-t-4 rounded-xl"/>
				<div class="mt-6 h-[4px] bg-white rounded-3xl gradient-bar animate-gradient"></div>
			
			</div>




		</div>

		<div class="flex-end">
			<div class="flex justify-center items-center w-[50px] h-[50px] rounded-full variant-soft-primary animate-bounce">
				<a href="#about"><ArrowDown size="30" strokeWidth=2.5/></a>
			</div>
			<div id="b-blob" class="absolute bottom-[0rem] left-0 right-0 ml-auto mr-auto w-[5rem] h-[5rem] rounded-[50%] bg-gradient-to-br from-surface-500 via-primary-500 to-white opacity-40 overflow-x-hidden -z-10 blur-3xl">
			</div>
		</div>

	</div>
	-->

	<!--
	<div
		id="home"
		class="container h-[100vh] mx-auto flex flex-row flex-wrap lg:flex-col justify-center items-center z-[1] overflow-x-hidden space"
	>

		<div class="h-full flex flex-col justify-center items-center">

			<div class="text-center flex flex-row items-center justify-center">


						<IntroCard />

						<SkillSlider skills={skills} />

					<div class="card variant-glass-surface py-2 w-[25rem] max-w-[98vw] mt-2">
						<div class="scroll-container">
							<div class="scroll-content">
								{#each skills.concat(skills) as skill, index}
									<div class="flex-none w-[35px] mx-10">
										<a href="/" class="flex flex-row items-center">
											<img src="{skill.img}" alt="{skill.name + " logo"}" class="opacity-[65%]"/>
											<p class="ml-1 h5">{skill.name}</p>
										</a>
									</div>
								{/each}
							</div>
						</div>

					</div>






			</div>

			<LatestCommit />

			<Experience experiences={experiences} />
		
		</div>

		<ProjectCard projects={projects} />

	</div>
	-->

	<!--
	<div id="contact" class="container h-[100vh] mx-auto flex justify-center items-center z-[1] overflow-x-hidden">
		<div class="space-y-10 text-center flex flex-col items-center">
			
			<div>
				<h3 class="h3 text-7xl glow">Stay in touch</h3>
				<h3 class="h3 opacity-[65%] mb-2">Let me know when cool projects go live</h3>
				<form class="flex flex-row" on:submit={handleMailList}>
					<input class="input variant-glass mr-1" placeholder="Enter your email"/>
					<button type="submit" class="btn variant-glass-primary ml-1" data-umami-event="mail-signup">Join</button>
				</form>
				
			</div>
		
		</div>
	</div>
	-->
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
