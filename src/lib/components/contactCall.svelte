<script lang="ts">
	import GmailSvg from '$lib/svg/icons/gmail.svg';
	import GithubSvg from '$lib/svg/icons/github-white.svg';
	import DiscordSvg from '$lib/svg/icons/discord-color.svg';
	import LinkedInSvg from '$lib/svg/icons/linkedin.svg';
	//   Major Components
	import Dock from '$lib/components/Dock.svelte';
	import DockIcon from '$lib/components/DockIcon.svelte';

	let navs = {
		navbar: [
      { label: 'Discord', icon: DiscordSvg, href: 'https://discord.gg/8vNHAA36fR' },
			{ label: 'Github', icon: GithubSvg, href: 'https://github.com/TechnoTalksDev' },
			
			{ label: 'LinkedInSvg', icon: LinkedInSvg, href: 'https://www.linkedin.com/in/murali-sri-chandan-chengalvala-a31501288/' },
      { label: 'Mail', icon: GmailSvg, href: 'mailto:chandan.chengalvala@gmail.com' },
		]
	};
</script>

<span
	class="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-6xl md:text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10"
>
	Get in touch
</span>

<div>
	<Dock
		direction="middle"
		class="relative scale-[150%] card border-2 border-zinc-100/50 variant-glass"
		let:mouseX
		let:distance
		let:magnification
	>
		{#each navs.navbar as item}
			<DockIcon {mouseX} {magnification} {distance}>
				<a href={item.href} target="_blank">
        <div class="hover:bg-zinc-200/20 transition-all duration-200 rounded-full p-2">
					<img src={item.icon} alt={item.label} class="h-7 w-7" />
				</div>
        </a>
			</DockIcon>
		{/each}
	</Dock>
</div>

