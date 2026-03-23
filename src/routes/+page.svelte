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
	import { currentSection } from '$lib/stores/sectionStore';
	import type { Project, Skill } from '$lib/types';
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
			"<strong>Hey! <span class='wave text-2xl'>👋</span></strong> <br/>Looks like you might ❤️ my work! <br/> Want experiences like this for yourself? 🚧 <br/> <a href='#contact' class='btn btn-md btn-hover variant-glass-success mt-1 font-semibold'>Get in touch!</a>",
		background: 'variant-glass-primary',
		timeout: 60000
	};

	onMount(() => {
		typeSub();

		// Setup Intersection Observer for section tracking
		const sections = ['hey', 'experience', 'projects', 'contact'];
		const sectionElements = sections.map((id) => document.getElementById(id));

		const observer = new IntersectionObserver(
			(entries) => {
				let maxIntersectionRatio = 0;
				let largestSection: string | null = null;

				entries.forEach((entry) => {
					const id = (entry.target as HTMLElement).id;
					const ratio = entry.intersectionRatio;

					// console.log(
					// 	`[${id}] intersectionRatio: ${(ratio * 100).toFixed(1)}%, isIntersecting: ${entry.isIntersecting}`
					// );

					if (entry.isIntersecting && ratio > maxIntersectionRatio) {
						maxIntersectionRatio = ratio;
						largestSection = id;
					}
				});

				// console.log(
				// 	`Largest section: ${largestSection} (${(maxIntersectionRatio * 100).toFixed(1)}%)\n`
				// );

				// Only update if the section has at least 50% visibility
				if (maxIntersectionRatio >= 0.5 && largestSection) {
					currentSection.set(largestSection);
				}
			},
			{ threshold: [0, 0.5, 1.0] }
		);

		sectionElements.forEach((el) => {
			if (el) observer.observe(el);
		});

		const timer = setTimeout(() => {
			//console.log("User has been on site for: "+longWhile+ " s");
			toastStore.trigger(comingSoon);
		}, longWhile);

		return () => {
			observer.disconnect();
			clearTimeout(timer);
		};
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

	const skills: Skill[] = [
		{
			name: 'SvelteKit',
			img: '/skills/svelte.png',
			skill: 4.4,
			link: 'https://svelte.dev/'
		},
		{
			name: 'TypeScript',
			img: '/skills/typescript.png',
			skill: 3.8,
			link: 'https://www.typescriptlang.org/'
		},
		{
			name: 'MongoDB',
			img: '/skills/mongo.png',
			skill: 2.8,
			link: 'https://www.mongodb.com/'
		},
		{
			name: 'Python',
			img: '/skills/python.png',
			skill: 3.6,
			link: 'https://www.python.org/'
		},
		{
			name: 'C++',
			img: '/skills/cplusplus.png',
			skill: 2.6,
			link: 'https://isocpp.org/'
		},
		{
			name: 'Kotlin',
			img: '/skills/kotlin.png',
			skill: 2.5,
			link: 'https://kotlinlang.org/'
		},
		{
			name: 'Azure',
			img: '/skills/azure.png',
			skill: 3.6,
			link: 'https://azure.microsoft.com/en-us'
		},
		{
			name: 'Docker',
			img: '/skills/docker.png',
			skill: 4.2,
			link: 'https://www.docker.com/'
		},
		{
			name: 'VEX',
			img: '/skills/vex.png',
			skill: 4.2,
			link: 'https://www.vexrobotics.com/v5/competition/vrc-current-game'
		},
		{
			name: 'PocketBase',
			img: '/skills/pb.svg',
			skill: 4.2,
			link: 'https://pocketbase.io/'
		},
		{ name: 'Flutter', img: 'skills/flutter.svg', skill: 3.2, link: 'https://flutter.dev/' },
		{ name: 'React', img: 'skills/react.png', skill: 3.0, link: 'https://react.dev/' },
		{
			name: 'Firebase',
			img: '/skills/firebase.png',
			skill: 3.0,
			link: 'https://firebase.google.com/'
		},
		{ name: 'Supabase', img: '/skills/supabase.webp', skill: 3.0, link: 'https://supabase.com/' },
		{
			name: 'Apple AppStore',
			img: '/skills/appstore.png',
			skill: 3.0,
			link: 'https://developer.apple.com/app-store/'
		},
		{ name: 'n8n', img: '/skills/n8n.png', skill: 3.0, link: 'https://n8n.io/' },
		{ name: 'Redis', img: '/skills/redis.png', skill: 3.0, link: 'https://redis.io/' }
	];

	const projects: Project[] = [
		// {
		// 	name: '10A VEX',
		// 	img: '/10A.png',
		// 	description:
		// 		'<strong>Innovate Award @ State</strong><br/>VEX V5 Robotics programming, implementing various motion algorithms, telemetry systems, localization, and more.',
		// 	link: 'https://www.instagram.com/exothermicalpha/',
		// 	github: 'https://github.com/Exo10A',
		// 	tags: ['VEX', 'c++'],
		// 	skills: [8, 4, 3, 7]
		// },
		{
			name: 'Simeo',
			img: '/projects/simeo/simeo_full.png',
			showcaseImgs: [],
			tagline:
				'Top 5 @ National FBLA Conference  <br/>1st @ Washington State FBLA Conference<br/>500+ active users',
			shortDescription:
				'The most powerful and intuitive grade calculator for StudentVue students with live editing, visual breakdowns, weighted GPA tracking, and AI-powered study insights.',
			longDescription:
				'Simeo was a <strong>6-month journey</strong> of learning full-stack web technologies while building a production-ready application. I had to master <strong>JWT authentication, database security, and server-side rendering performance</strong> optimizations. Starting with close friends as testers, it expanded to my entire school, eventually becoming a tool hundreds of students across the nation relied on for grade calculation. As my first public product, it was a milestone—though no longer operational due to legal and uptime considerations, it remains an incredible learning experience.<br/><br/>The app itself combines powerful features with beautiful simplicity: <strong>live grade editing</strong> lets you add future assignments and see exactly how your grade changes. <strong>Visual breakdowns</strong> instantly show how each category contributes to your final grade. Support for both weighted and unweighted GPAs across multiple years keeps your academic history organized. The <strong>AI-powered tutor</strong> provides study tips and resources for specific assignments. All without ever storing your StudentVue credentials.',
			link: 'https://www.simeo.app/',
			github: 'https://github.com/TechnoTalksDev/Simeo',
			tags: ['FBLA', 'full-stack'],
			skills: [0, 1, 2, 6],
			active: true
		},
		{
			name: 'Crusyn',
			img: '/projects/crusyn/crusyn-website.png',
			showcaseImgs: [],
			tagline: '100+ TestFlight signups within 2 weeks',
			shortDescription:
				'Real-world driving game that turns your city into an open-world playground with map-based challenges, live scoring, leaderboards, and shareable run results.',
			longDescription:
				'Crusyn started as an idea we wanted to test from the ground up, then grew into a real startup and a live product journey toward the App Store. I built it because I genuinely loved the feeling of playing it myself: <strong>that feeling behind the wheel is not gone</strong>.<br/><br/>The app turns your city into a real-world game. You explore an open-world map, discover challenges, and launch location-based experiences that get you off your phone and into your surroundings. In <strong>Blind Rally</strong> (available now), you memorize a route and drive it back without GPS, then get scored in real time on accuracy, speed, and decisions. <strong>Cruises</strong> (coming soon) adds freeroam drive tracking, XP progression, and skill-based scoring.<br/><br/>Every session builds your profile: review detailed run stats, compare performance over time, climb public leaderboards, compete with friends, and share custom stat cards with your driving archetype. Right now we are running a <strong>TestFlight beta</strong> and actively bringing on new drivers and testers through social media as we prepare for full App Store release. I had so much fun building and playing Crusyn, and I want to share that experience with the world.',
			link: 'https://crusyn.app',
			//github: 'https://github.com/TechnoTalksDev/crusyn-website',
			tags: ['iPhone app', 'Gaming', 'Marketing'],
			skills: [11, 1, 12, 14],
			active: true
		},
		{
			name: 'PROS Telemetry',
			img: '/projects/pros-telemetry/telemetry.png',
			showcaseImgs: [],
			tagline:
				'Innovate Award @ Washington State Regionals 2025<br/>Think Award @ Washington State Regionals 2026',
			shortDescription:
				'Award-winning real-time VEX V5 telemetry system that streams robot data into SQLite and Grafana for faster debugging, tuning, and match-ready iteration.',
			longDescription:
				'This telemetry stack is a completely bespoke system for VEX V5, and it became a repeat award winner in one of Washington&#39;s most competitive robotics regions.<br/><br/>For most VEX teams, software iteration is still mostly <strong>guess-and-check</strong>: maybe a few logs written to an SD card, then reviewed only after a match. After two years in the ecosystem, I felt that workflow was far behind modern robotics. Watching how Formula 1 teams use dense, continuous telemetry to tune every detail made me ask a simple question: why not do the same in VEX?<br/><br/>I found a couple of existing attempts, but neither delivered the <strong>live throughput</strong> I needed. In VEX, development is constant micro-iteration, so non-live pipelines quickly become too slow to matter. I explored multiple architectures, including direct Bluetooth links to the VEX Brain, but hardware restrictions made Bluetooth too limited in both bandwidth and connection reliability.<br/><br/>The breakthrough was using a proven wireless text path that already exists in VEX: the controller-to-brain link. A laptop connects to the controller and uses a spare channel to receive streamed text data. On the robot, I built a lightweight C++ library that publishes JSON packets; on the laptop, a Python service parses the stream, writes structured records to SQLite, and feeds live dashboards in Grafana.<br/><br/>This end-to-end design delivers <strong>low-latency, real-time telemetry</strong> while staying inside first-party VEX communication infrastructure. Across two seasons, it helped us identify failing motors, correct autonomous drift, and tune Monte Carlo particle localization with far more confidence. I plan to document and open-source this approach so more VEX teams can move from intuition-only tuning to a truly data-driven workflow.',
			github: 'https://github.com/TechnoTalksDev/pros-telemetry',
			tags: ['Python', 'VEX', 'Dev Tool'],
			skills: [3, 4, 8],
			active: true
		},
		{
			name: 'Steamoji Robotics',
			img: '/projects/steamoji/steamoji.png',
			showcaseImgs: [],
			tagline: 'Live event and award data for VEX robotics.',
			shortDescription:
				'Student-led VEX organization hub with live event feeds, team pages, and award tracking—the primary communication center for parents and students.',
			longDescription:
				"I recently joined this new student-led robotics organization and quickly noticed one major gap: there was <strong>no clear central hub</strong> for updates. Parents and students were constantly left searching for information, so I stepped in and helped build the website to solve that problem.<br/><br/>This SvelteKit platform now acts as the organization's <strong>single source of truth</strong>, pulling live data from the VEX Robot Events API to surface upcoming competitions, award wins, team updates, and more in real time. Beyond keeping everyone informed, the site is designed to feel welcoming and easy to navigate, helping <strong>new families discover and join our robotics community</strong>.",
			link: 'https://www.steamojibelredrobotics.org/',
			//github: 'https://github.com/TechnoTalksDev/steamoji-site',
			tags: ['Robotics', 'Community Hub', 'Live Data'],
			skills: [0, 1, 8],
			active: true
		},
		{
			name: 'trckr',
			img: '/projects/trckr/trckr.png',
			showcaseImgs: [],
			//tagline: 'GitHub-style commit graph for daily habits.',
			shortDescription:
				'Progressive web app for tracking habits with GitHub-style commit graphs, daily notifications, streak tracking, and historical accuracy.',
			longDescription:
				"I wanted a clean habit tracker that could actually motivate me by making progress feel visual and rewarding. After looking at the <strong>GitHub contribution graph</strong>, I was inspired to build something with the same familiar UX language, but focused specifically on daily habits and a more aesthetic, distraction-free experience.<br/><br/>trckr is a progressive web app where you check off habits each day and watch your consistency build over time through a GitHub-inspired <strong>habit graph</strong>. It includes daily notifications, detailed stats (streaks, reliability scores, best days), and <strong>historical accuracy</strong>.<br/><br/>It's installable as a PWA with local notifications and designed mobile-first for quick daily use. Built over a weekend with SvelteKit and PocketBase, so expect a few quirks here and there, but the core experience is solid and I genuinely find it useful in my day to day.",
			link: 'https://trckr-beige.vercel.app',
			github: 'https://github.com/TechnoTalksDev/trckr',
			tags: ['PWA', 'Productivity', 'Habit Tracking'],
			skills: [0, 1, 9]
		},
		{
			name: 'Liquid Glass',
			img: '/projects/liquid-glass/liquid-glass.png',
			showcaseImgs: [],
			shortDescription:
				'Recreation of iOS 26 Liquid Glass media player powered by live Spotify data, built with SvelteKit and n8n backend for real-time sync.',
			longDescription:
				"I was incredibly fascinated by the <strong>iOS 26 “liquid glass”</strong> update on my iPhone and wanted to recreate the effect using SVG filters and other css shader tricks. I stumbled upon this video and decided to see how far I could push it. <br/><br/>This project is my own take on the iOS media player UI, with a bit of personal flair. The interface you see here is actually powered by <strong>live Spotify data</strong>, pulled every ~5 seconds, which enables the real-time progress bar for the currently playing song.<br/><br/>Playback, track skip, and volume controls are just there for the sake of UI completeness (and my sanity)—they're non-functional, since I didn’t want to give the internet full control over my music.<br/><br/>The backend is built using an <strong>n8n workflow</strong> and <strong>Redis cache</strong> to avoid hitting Spotify’s rate limits when handling multiple users. Threw this together in a day, so if you run into any quirks... just pretend you didn’t :)",
			link: 'https://glass.chandanc.me/',
			github: 'https://github.com/TechnoTalksDev/liquid-glass',
			tags: ['Spotify API', 'UI/UX', 'Apple'],
			skills: [0, 1, 15, 16]
		},
		{
			name: 'ThePiSchool',
			img: '/projects/thepischool/thepischool.png',
			showcaseImgs: [],
			shortDescription:
				'Freelance SvelteKit site for boutique tutoring service, optimized for lead conversion with testimonials, CTAs, and professional design.',
			longDescription:
				'A freelance project building a professional web presence for The Pi School, a boutique tutoring service. The site combines clean, modern design with clear messaging about tutoring value and accessibility.<br/><br/><strong>Focused on converting visitors into leads</strong> through targeted CTAs, testimonial sections to build trust, and easy contact flows. The design reflects the personalized, thoughtful approach the tutoring service brings to education.',
			link: 'https://thepischools.com/',
			github: '',
			tags: ['Freelance', 'Lead Gen', 'Education Business'],
			skills: [0, 1, 6]
		},
		{
			name: 'buildpublic',
			img: '/projects/buildpublic/buildpublic.png',
			showcaseImgs: [],
			shortDescription:
				'SvelteKit UI demo showcasing clean dashboard patterns for startups and creators to transparently share progress and build community accountability.',
			longDescription:
				'A beautiful SvelteKit demo showcasing what a "build in public" dashboard looks like. Perfect for startups, creators, and clubs who want to share their progress transparently with their audience.<br/><br/>This project is all about <strong>clean UI patterns</strong>—landing pages, dashboard layouts, cards, and sections that make <strong>progress updates feel natural and engaging</strong>. Think of it as a template for anyone wanting to build accountability into their public journey.',
			link: 'https://www.buildpublic.app/',
			github: 'https://github.com/TechnoTalksDev/buildpublic',
			tags: ['UI/UX', 'Dashboard', 'Build in Public'],
			skills: [0, 1]
		},
		{
			name: 'Flow',
			img: '/projects/flow/flow.png',
			showcaseImgs: [],
			//tagline: 'Implements Parkinson\'s Law for task efficiency.',
			shortDescription:
				'Gamified productivity app using intentional time pressure and XP rewards to keep tasks focused, featuring grace periods and real-time progress tracking.',
			longDescription:
				'Built on the insight that <strong>work expands to fill available time</strong>. Flow uses intentional time pressure and gamification to keep you focused and productive.<br/><br/>Features include time-boxed task sessions, real-time XP rewards based on time spent, performance tracking with completion stats, and a clean distraction-free focus interface. The <strong>grace period system</strong> balances challenge with fairness—you get a minute to wrap up before auto-fail.<br/><br/>Targeted at Gen Z/Gen Alpha, with built-in achievements and streak systems ready to go. Designed to make productivity feel like a game, not a chore.',
			link: 'https://flow.technotalks.net/',
			github: 'https://github.com/TechnoTalksDev/flow',
			tags: ['Productivity', 'Gamification', 'Focus Tool'],
			skills: [0, 1, 13]
		},
		{
			name: 'Rider-MC',
			img: '/projects/rider-mc/rider-banner.png',
			showcaseImgs: [],
			tagline: '1000+ downloads on SpigotMC',
			shortDescription:
				'Java Minecraft plugin enabling players to ride any mob with full permission control, custom behavior, and cross-version compatibility.',
			longDescription:
				'A simple but popular Minecraft plugin that adds a fun mechanic: ride any mob in your world. <strong>Full permission support</strong> for fine-grained control, customizable behavior, and works across versions.<br/><br/>Over 1000 downloads shows the community appreciates the simplicity and polish. Easy to install, intuitive to use, and genuinely fun to play with.',
			link: 'https://www.spigotmc.org/resources/rider-simple-easy-ride-anything-1-8x-1-17x.93807/',
			github: 'https://github.com/TechnoTalksDev/Rider-MC',
			tags: ['Minecraft', 'Plugin', 'Java'],
			skills: [5]
		},
		{
			name: 'Reko',
			img: '/projects/reko/reko-banner.png',
			showcaseImgs: [],
			tagline: '150+ commits on Discord bot',
			shortDescription:
				'Python Discord bot providing real-time Minecraft server monitoring with player count, latency, MOTD, and per-guild server tracking.',
			longDescription:
				"A Discord bot that keeps you updated on your Minecraft server's health. Get player count, online players, server version, MOTD, latency, and approximate location all in one place.<br/><br/>Built with Python and Docker, so it's easy to deploy and scale. The bot lets you set <strong>per-guild server tracking</strong>, handles latency pings from the bot to your server, and has planned features for player join/leave tracking and automatic role assignment for online players.",
			github: 'https://github.com/TechnoTalksDev/Reko',
			tags: ['Discord', 'Minecraft', 'API'],
			skills: [3, 2, 7]
		},
		{
			name: 'filecord',
			img: '/projects/filecord/filecord-demo.gif',
			shortDescription:
				'Web app that converts videos from any format into Discord-ready ~10MB MP4 files using a FastAPI + FFmpeg backend, real-time progress streaming, and automatic hardware-accelerated encoding.',
			longDescription:
				"I built FileCord in a day because I was annoyed by Discord's 10MB upload limit. I tried to share a short 19-second 1080p clip with friends, but it was too large, and every “free” compressor I found was clunky, paywalled, or just unusable.<br/><br/>So I asked AI to help me build the tool I actually wanted. The frontend came together quickly with a clean interface and smooth UX, but the backend took real iteration: I assembled a FastAPI service with a robust processing flow, live conversion progress over <strong>Server-Sent Events</strong>, and hardware acceleration support for faster encoding.<br/><br/>The result is a simple, fast, and completely free micro app that just works. For me, FileCord is proof that <strong>micro apps are the future</strong>: idea to working product is collapsing from weeks to hours, and the bottleneck is shifting from stack decisions to execution speed.",
			//link: 'https://github.com/TechnoTalksDev/filecord',
			github: 'https://github.com/TechnoTalksDev/filecord',
			tags: ['Python', 'FastAPI', 'FFmpeg', 'MicroApp'],
			skills: [3, 7],
			active: true
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
		// {
		// 	date: 'August 2025 - Present',
		// 	company: 'Retrospective',
		// 	position: 'Founder',
		// 	blurb:
		// 		'Building experiences that connect people to the real world and each other. Currently developing Crusyn ',
		// 	skills: [4, 7, 8]
		// },
		{
			date: 'August 2023 - 2026',
			company: '10A & 1523W',
			position: 'Lead Developer',
			blurb:
				'Developing <strong>motion algorithms and autonomous routines</strong> for VEX Robotics, optimizing localization and system performance.<br/><br/>Designed and implemented an <strong>award-winning custom telemetry system</strong> to stream live robot data for faster debugging and iteration.',
			skills: [4, 7, 8]
		},
		{
			date: 'July - August 2024',
			company: 'Quadrant Technologies',
			position: 'Intern',
			blurb:
				'Led interns as <strong>SCRUM Master</strong> to build a data-driven application for a company pitch, leveraging modern cloud and AI technologies.<br/><br/>Competed with <strong>11+ collegiate teams</strong> as a high school intern and placed <strong>Top 3</strong> in the final pitch competition to top-level executives.',
			skills: [0, 6, 7, 9]
		},
		{
			date: 'August 2024 - 2026',
			company: 'SAHF',
			position: 'CTO',
			blurb:
				'Oversee <strong>technology strategy</strong> and build conversion-driven web solutions.<br/><br/>Implement <strong>SEO-focused blogs and interactive tools</strong> to improve growth and engagement.',
			skills: [0, 6, 9]
		},
		{
			date: 'Oct. 2024 - 2024',
			company: 'NC FBLA',
			position: 'Tech Committee',
			blurb:
				"Maintain <strong>NC FBLA's technology initiatives</strong> and develop mobile solutions.<br/><br/>Build digital tools for local business partners to support chapter and community impact.",
			skills: [10]
		},
		{
			date: 'August 2025 - 2026',
			company: 'STEAMOJI ROBOTICS',
			position: 'Public Relations',
			blurb:
				'A <strong>student-created, student-led robotics organization</strong> focused on communication and community growth.<br/><br/>Created the website to inform parents and students with live event and award data, now used as the <strong>primary communication center</strong> for the organization.',
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
		<!-- <div class="flex-end">
			<div
				class="flex justify-center items-center w-[50px] h-[50px] rounded-full variant-soft-primary animate-bounce"
			>
				<a href="#projects"><ArrowDown size="30" strokeWidth="2.5" /></a>
			</div>
			<div
				id="b-blob"
				class="absolute bottom-[0rem] left-0 right-0 ml-auto mr-auto w-[5rem] h-[5rem] rounded-[50%] bg-gradient-to-br from-surface-500 via-primary-500 to-white opacity-40 overflow-x-hidden -z-10 blur-3xl"
			></div>
		</div> -->
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
