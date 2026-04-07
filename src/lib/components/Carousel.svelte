<script lang="ts">
	import { prefersReducedMotion } from 'svelte/motion';
	import { fade } from 'svelte/transition';
	import { AnimationFrames, ScrollState } from 'runed';

	export type CarouselItem = {
		name: string;
		img: string;
		description: string;
		location?: string;
		date?: number;
		shotOn?: string;
	};

	type Props = {
		items: CarouselItem[];
		intervalMs?: number;
		ariaLabel?: string;
		class?: string;
	};

	let {
		items,
		intervalMs = 5000,
		ariaLabel = 'Photo highlights',
		class: className = ''
	}: Props = $props();

	let trackEl: HTMLDivElement | null = $state(null);
	// targetIndex is navigation intent; visibleIndex is the slide currently centered in the viewport.
	let targetIndex = $state(0);
	let visibleIndex = $state(0);
	let isProgrammaticScroll = $state(false);
	let requestedBackgroundImage = $derived(items[targetIndex]?.img ?? '');
	let displayedBackgroundImage = $state('');
	let settledCandidateIndex = -1;
	let settledCandidateFrames = 0;

	let canAnimate = $derived(!prefersReducedMotion.current);
	let shouldAutoPlay = $derived(items.length > 1 && canAnimate);

	function getBehavior(): ScrollBehavior {
		return canAnimate ? 'smooth' : 'auto';
	}

	function normalizeIndex(index: number): number {
		if (items.length === 0) return 0;
		return (index + items.length) % items.length;
	}

	function getClosestSlideIndex(): number {
		if (!trackEl || items.length === 0) return 0;

		const trackRect = trackEl.getBoundingClientRect();
		const viewportCenter = trackRect.left + trackRect.width / 2;
		let closestIndex = 0;
		let closestDistance = Number.POSITIVE_INFINITY;

		for (const slide of trackEl.querySelectorAll<HTMLElement>('[data-carousel-index]')) {
			const index = Number(slide.dataset.carouselIndex ?? 0);
			const rect = slide.getBoundingClientRect();
			const center = rect.left + rect.width / 2;
			const distance = Math.abs(center - viewportCenter);
			if (distance < closestDistance) {
				closestDistance = distance;
				closestIndex = index;
			}
		}

		return closestIndex;
	}

	function getSlideCenterDistance(index: number): number {
		if (!trackEl || items.length === 0) return Number.POSITIVE_INFINITY;

		const slide = trackEl.querySelector<HTMLElement>(`[data-carousel-index="${index}"]`);
		if (!slide) return Number.POSITIVE_INFINITY;

		const trackRect = trackEl.getBoundingClientRect();
		const viewportCenter = trackRect.left + trackRect.width / 2;
		const rect = slide.getBoundingClientRect();
		const center = rect.left + rect.width / 2;
		return Math.abs(center - viewportCenter);
	}

	function canFinalizeToTarget(closestIndex: number): boolean {
		if (!trackEl || items.length === 0) return true;

		const centerTolerancePx = 8;
		const targetDistance = getSlideCenterDistance(targetIndex);
		return closestIndex === targetIndex || targetDistance <= centerTolerancePx;
	}

	function scrollSlideIntoViewport(target: HTMLElement, behavior: ScrollBehavior) {
		if (!trackEl) return;

		const viewportRect = trackEl.getBoundingClientRect();
		const targetRect = target.getBoundingClientRect();
		const deltaToCenter =
			targetRect.left - viewportRect.left - (viewportRect.width / 2 - targetRect.width / 2);

		trackEl.scrollTo({
			left: trackEl.scrollLeft + deltaToCenter,
			behavior
		});
	}

	function finalizeProgrammaticScroll(index: number = getClosestSlideIndex()) {
		visibleIndex = index;
		targetIndex = index;
		isProgrammaticScroll = false;
		settledCandidateIndex = -1;
		settledCandidateFrames = 0;
		settleFrames.stop();
	}

	function syncVisibleToViewport(source: 'onScroll' | 'onStop' | 'manual' = 'manual') {
		const closestIndex = getClosestSlideIndex();
		visibleIndex = closestIndex;

		if (!isProgrammaticScroll) {
			targetIndex = closestIndex;
		}
	}

	const settleFrames = new AnimationFrames(
		() => {
			if (!isProgrammaticScroll) return;

			const closestIndex = getClosestSlideIndex();
			visibleIndex = closestIndex;

			if (closestIndex === settledCandidateIndex) {
				settledCandidateFrames += 1;
			} else {
				settledCandidateIndex = closestIndex;
				settledCandidateFrames = 1;
			}

			// Frame-stability convergence avoids hardcoded time waits while still tolerating in-flight snap physics.
			if (settledCandidateFrames >= 4) {
				const canFinalize = canFinalizeToTarget(closestIndex);

				if (canFinalize) {
					finalizeProgrammaticScroll(targetIndex);
				}
			}
		},
		{
			immediate: false,
			fpsLimit: 60
		}
	);

	const scrollState = new ScrollState({
		element: () => trackEl,
		idle: () => 260,
		onScroll: () => {
			syncVisibleToViewport('onScroll');
		},
		onStop: () => {
			if (isProgrammaticScroll) {
				const closestIndex = getClosestSlideIndex();
				const canFinalize = canFinalizeToTarget(closestIndex);

				if (canFinalize) {
					finalizeProgrammaticScroll(targetIndex);
				}
				return;
			}

			syncVisibleToViewport('onStop');
		}
	});

	$effect(() => {
		return () => {
			settleFrames.stop();
			scrollState.onScrollEndDebounced.cancel();
		};
	});

	function goTo(index: number, behavior: ScrollBehavior = getBehavior()) {
		if (!trackEl || items.length === 0) return;

		const normalizedTarget = normalizeIndex(index);
		const target = trackEl.querySelector<HTMLElement>(
			`[data-carousel-index="${normalizedTarget}"]`
		);
		if (!target) return;

		targetIndex = normalizedTarget;

		if (behavior === 'smooth' && canAnimate) {
			isProgrammaticScroll = true;
			settledCandidateIndex = -1;
			settledCandidateFrames = 0;
			settleFrames.start();
		} else {
			visibleIndex = normalizedTarget;
			isProgrammaticScroll = false;
			settleFrames.stop();
		}

		scrollSlideIntoViewport(target, behavior);
	}

	function onControlKeydown(event: KeyboardEvent) {
		if (event.key === 'ArrowRight') {
			event.preventDefault();
			goTo(targetIndex + 1);
		}

		if (event.key === 'ArrowLeft') {
			event.preventDefault();
			goTo(targetIndex - 1);
		}
	}

	$effect(() => {
		if (items.length === 0) {
			targetIndex = 0;
			visibleIndex = 0;
			isProgrammaticScroll = false;
			settleFrames.stop();
			return;
		}

		if (targetIndex >= items.length) {
			targetIndex = 0;
		}

		if (visibleIndex >= items.length) {
			visibleIndex = 0;
		}
	});

	$effect(() => {
		const next = requestedBackgroundImage;
		if (!next) {
			displayedBackgroundImage = '';
			return;
		}

		if (next === displayedBackgroundImage) return;

		let canceled = false;
		const preload = new Image();
		const commit = () => {
			if (canceled) return;
			displayedBackgroundImage = next;
		};

		preload.src = next;
		if (typeof preload.decode === 'function') {
			preload
				.decode()
				.then(commit)
				.catch(commit);
		} else if (preload.complete) {
			commit();
		} else {
			preload.onload = commit;
			preload.onerror = commit;
		}

		return () => {
			canceled = true;
			preload.onload = null;
			preload.onerror = null;
		};
	});

	$effect(() => {
		if (!shouldAutoPlay) return;
		const timer = setInterval(() => {
			if (trackEl?.matches(':hover') || trackEl?.matches(':focus-within')) {
				return;
			}

			if (isProgrammaticScroll || scrollState.isScrolling) {
				return;
			}

			goTo(targetIndex + 1, 'smooth');
		}, intervalMs);

		return () => {
			clearInterval(timer);
		};
	});
</script>

<div
	class={[
		'relative isolate flex h-full w-full flex-col justify-center overflow-x-hidden overflow-y-visible',
		className
	]}
>

<!-- 

		<svg
			class="absolute h-0 w-0 overflow-hidden opacity-0"
			aria-hidden="true"
			focusable="false"
			xmlns="http://www.w3.org/2000/svg"
		>
			<defs>
				<filter
					id="carouselBackdropFilter"
					color-interpolation-filters="sRGB"
					x="-12%"
					y="-12%"
					width="124%"
					height="124%"
				>
					<feGaussianBlur in="SourceGraphic" stdDeviation="20" result="blurred" />
					<feTurbulence
						type="fractalNoise"
						baseFrequency="0.38"
						numOctaves="2"
						stitchTiles="stitch"
						seed="2"
						result="noise"
					/>
					<feGaussianBlur in="noise" stdDeviation="0.3" result="softNoise" />
					<feColorMatrix
						in="softNoise"
						type="matrix"
						values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 0.12 0"
						result="grain"
					/>
					<feBlend in="blurred" in2="grain" mode="soft-light" />
				</filter>
			</defs>
		</svg>
-->

	<section
		aria-roledescription="carousel"
		aria-label={ariaLabel}
		style="--slide-width: min(80vw, 64rem);"
		class="relative z-10 my-auto w-full overflow-visible outline-none"
	>
		<div class="mb-4 flex items-center justify-between px-4 sm:px-6">
			<p class="text-sm tracking-wide text-surface-300">
				{items.length === 0 ? '0 / 0' : `${visibleIndex + 1} / ${items.length}`}
			</p>
			<div class="flex items-center gap-2">
				<button
					type="button"
					class="text-white transition-opacity hover:opacity-80 focus-visible:outline-none"
					onclick={() => goTo(targetIndex - 1)}
					onkeydown={onControlKeydown}
					aria-label="Show previous slide"
				>
					<svg
						class="h-6 w-6"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						aria-hidden="true"
					>
						<path
							d="M15 6L9 12L15 18"
							stroke="white"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				</button>
				<button
					type="button"
					class="text-white transition-opacity hover:opacity-80 focus-visible:outline-none"
					onclick={() => goTo(targetIndex + 1)}
					onkeydown={onControlKeydown}
					aria-label="Show next slide"
				>
					<svg
						class="h-6 w-6"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						aria-hidden="true"
					>
						<path
							d="M9 6L15 12L9 18"
							stroke="white"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				</button>
			</div>
		</div>

		<div bind:this={trackEl} class="carousel-viewport py-8">
			<div class="carousel-track flex items-center gap-48">
				{#each items as item, index (`${item.img}-${index}`)}
					<div
						data-carousel-index={index}
						role="group"
						aria-roledescription="slide"
						aria-label={`${index + 1} of ${items.length}: ${item.name}`}
						class={[
							'carousel-slide group relative flex shrink-0 items-center justify-center overflow-visible',
							index === visibleIndex ? 'scale-100 opacity-100' : 'scale-[0.96] opacity-70'
						]}
					>
						<div class="relative overflow-visible">
							<img
								id={`bg-${item.name}`}
								src={item.img}
								alt=""
								aria-hidden="true"
								class="pointer-events-none absolute -inset-0 z-0 h-[calc(100%)] w-[calc(100%)] max-w-none object-cover object-center opacity-60 blur-lg"
								draggable="false"
							/>
							<article class="relative z-10 overflow-hidden rounded-2xl bg-surface-900/70 shadow-none">
								<img src={item.img} alt={item.name} class="block h-auto w-full" draggable="false" />
								<div
									class="absolute inset-x-0 bottom-0 rounded-b-2xl p-4 sm:p-6"
								>
									<div
										class="pointer-events-none absolute inset-x-0 bottom-0 h-full rounded-b-2xl bg-gradient-to-t from-black/85 via-black/40 to-transparent opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100"
									></div>
									<div class="relative z-10 transition-transform duration-500 ease-out group-hover:-translate-y-1">
										<h3 class="text-xl text-white sm:text-2xl font-[bumbbled]">{item.name}</h3>
										<div
											class="max-h-0 overflow-hidden opacity-0 transition-all duration-500 ease-out group-hover:mt-2 group-hover:max-h-48 group-hover:opacity-100"
										>
											<p class="max-w-prose text-sm text-surface-100 sm:text-base">{item.description}</p>
											{#if item.location || item.date || item.shotOn}
												<p class="mt-2 text-xs uppercase tracking-wide text-surface-300 sm:text-sm">
													{#if item.location}{item.location}{/if}
													{#if item.location && item.date}
														-
													{/if}
													{#if item.date}{item.date}{/if}
													{#if item.shotOn}
														- Shot on {item.shotOn}{/if}
												</p>
											{/if}
										</div>
									</div>
								</div>
							</article>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>
</div>

<style>
	.carousel-viewport {
		scroll-snap-type: x mandatory;
		scroll-behavior: smooth;
		overflow-anchor: none;
		overscroll-behavior-x: contain;
		overflow-x: auto;
		overflow-y: visible;
		scrollbar-width: none;
		-ms-overflow-style: none;
	}

	.carousel-viewport::-webkit-scrollbar {
		display: none;
	}

	.carousel-track {
		width: max-content;
		padding-block: 0.25rem;
		padding-inline: max(0px, calc((100% - var(--slide-width)) / 2));
	}

	.carousel-slide {
		width: var(--slide-width);
		scroll-snap-align: center;
		align-items: center;
		transition:
			transform 320ms ease,
			opacity 320ms ease;
	}

	.carousel-slide:hover {
		transform: scale(1.005);
		opacity: 1;
	}

	@media (prefers-reduced-motion: reduce) {
		.carousel-viewport {
			scroll-behavior: auto;
		}

		.carousel-slide {
			transition: none;
		}
	}
</style>
