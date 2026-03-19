<script lang="ts">
	import { cn } from '$lib/utils';
	import { Motion, useMotionValue, useSpring, useTransform } from 'svelte-motion';

	export let magnification = 60;
	export let distance = 160;
	export let mouseX = 0;
	export let mode: 'icon' | 'text' = 'icon';
	export let textMagnification = 1.25;
	let mint = useMotionValue(mouseX);
	let textWidthTarget = useMotionValue(0);
	$: mint.set(mouseX);

	let className: string | undefined = '';
	export { className as class };

	let iconElement: HTMLDivElement;
	let contentElement: HTMLDivElement;
	let baseWidth = 0;

	$: if (contentElement && mode === 'text') {
		requestAnimationFrame(() => {
			const nextWidth = Math.ceil(contentElement.scrollWidth);
			if (nextWidth > 0 && nextWidth !== baseWidth) {
				baseWidth = nextWidth;
			}
		});
	}

	let distanceCalc = useTransform(mint, (val: number) => {
		const bounds = iconElement?.getBoundingClientRect() ?? { x: 0, width: 0 };
		return val - bounds.x - bounds.width / 2;
	});

	let widthSync = useTransform(distanceCalc, [-distance, 0, distance], [38, magnification, 38]);

	let width = useSpring(widthSync, {
		mass: 0.1,
		stiffness: 150,
		damping: 12
	});

	$: {
		const bounds = iconElement?.getBoundingClientRect() ?? { x: 0, width: 0 };
		const delta = mouseX - bounds.x - bounds.width / 2;
		const minWidth = Math.max(baseWidth, 1);
		const proximity = Math.max(0, 1 - Math.abs(delta) / distance);
		textWidthTarget.set(minWidth + minWidth * (textMagnification - 1) * proximity);
	}

	let textWidth = useSpring(textWidthTarget, {
		mass: 0.1,
		stiffness: 180,
		damping: 15
	});

	let scaleSync = useTransform(distanceCalc, [-distance, 0, distance], [1, 1.03, 1]);

	let scale = useSpring(scaleSync, {
		mass: 0.1,
		stiffness: 150,
		damping: 12
	});

	let iconClass = cn(
		'flex cursor-pointer items-center justify-center shrink-0',
		mode === 'icon' ? 'aspect-square rounded-full' : 'px-1 whitespace-nowrap',
		className
	);
</script>

<Motion
	style={{
		width: mode === 'icon' ? width : baseWidth > 0 ? textWidth : 'auto',
		scale: mode === 'text' ? scale : 1
	}}
	let:motion
>
	<div use:motion bind:this={iconElement} class={iconClass}>
		<div bind:this={contentElement} class="flex items-center justify-center whitespace-nowrap">
			<slot></slot>
		</div>
	</div>
</Motion>
