<script>
	import { blur } from 'svelte/transition';
</script>

<div
	id="top-blob"
	transition:blur={{ amount: 5, duration: 1500 }}
	class="absolute top-[-15rem] left-0 right-0 ml-auto mr-auto w-[80vw] h-[20rem] rounded-[50%] bg-gradient-to-br from-surface-500 via-primary-500 to-white opacity-40 overflow-x-hidden blur-3xl"
></div>

<div class="w-screen h-screen bg-black">
	<div class="h-screen w-full items-center justify-center flex">
		<div class="relative w-auto" transition:blur={{ amount: 5, duration: 1500 }}>
			<h1
				class="text-[36cqw] gradient-hero leading-normal font-[bumbbled] whitespace-nowrap select-none"
			>
				studio
			</h1>
			<h1
				class="text-[36cqw] gradient-hero leading-normal font-[bumbbled] blur-lg absolute inset-0 whitespace-nowrap select-none"
			>
				studio
			</h1>
		</div>
	</div>
</div>
