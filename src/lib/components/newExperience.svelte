<script>
	import exp from 'constants';
	import SkillsSliderHorizontal from './skillsSliderHorizontal.svelte';
	export let experiences;
	export let skills;
</script>

<div
	class="card variant-glass-surface flex flex-col p-4 sm:p-6 w-fit max-w-[98vw] overflow-x-auto overflow-y-hidden h-fit row-start-2"
	style="grid-column: 1 / 2;"
>
	<div class="flex flex-row flex-wrap gap-6 justify-center w-fit max-w-[56rem]">
		{#each experiences as experience, index}
			<div
				class="card card-hover p-4 relative flex flex-row items-center w-[25rem] max-w-[85vw] max-h-[15rem]"
				style="background-color: transparent;"
			>
				<!-- 
        <div class="w-[70%]">
          <time class="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500"
            >{experience.date}</time
          >
          <h4 class="text-lg font-semibold gradient-heading animate-gradient">
            {experience.company}
          </h4>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            {experience.position}
          </h3>

        </div>
        <span class="w-[6px] h-[80%] rounded-xl gradient-bar animate-gradient ml-1 mr-2" />
        
        <p class="max-w-[65%] text-base font-normal text-gray-300 ">
          {@html experience.blurb}
        </p>
        -->
				<div class="">
					<div class="flex flex-row">
						<time class="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500"
							>{experience.date}
						</time>
						<div class="flex flex-row items-center ml-2">
							{#each experience.skills as index}
								<div class="flex-none w-[15px] mx-1">
									<a href={skills[index].link} target="_blank" rel="noopener noreferrer">
										<img src={skills[index].img} alt={skills[index].name + ' logo'} class="" />
									</a>
								</div>
							{/each}
						</div>
					</div>

					<div class="flex flex-row">
						<h4 class="text-lg font-semibold gradient-heading animate-gradient">
							{experience.company}
						</h4>

						<span class="mx-1 text-xl">•</span>

						<h3 class="text-lg font-semibold text-gray-900 dark:text-white">
							{experience.position}
						</h3>
					</div>

					<p class="text-base font-normal">
						{@html experience.blurb}
					</p>
				</div>
			</div>
		{/each}
	</div>
</div>
