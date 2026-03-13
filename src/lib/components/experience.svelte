<script>
  export let experiences;
</script>


<div class="card variant-glass-surface flex flex-col p-8 w-fit max-w-[98vw] overflow-x-auto overflow-y-hidden h-fit row-start-2" style="grid-column: 1 / 2;">
				
  <div class="grid grid-flow-col gap-20 justify-items-center w-fit">
    {#each experiences as experience, index}
      {#if index % 2 == 0}
        <div
          class="card variant-glass-surface p-4 relative flex flex-col items-center w-[10rem] max-h-[15rem]"
        >
          <time class="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500"
            >{experience.date}</time
          >
          <h4 class="text-lg font-semibold gradient-heading animate-gradient">
            {experience.company}
          </h4>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            {experience.position}
          </h3>

          <!--
        <div class="my-2 h-[4px] w-[80%] rounded-xl gradient-bar animate-gradient"/>
        
        <p class="text-base font-normal text-gray-500 dark:text-gray-400">
          {experience.blurb}
        </p>
        -->
          <!-- Dot centered on the line -->
        </div>
      {/if}
    {/each}
  </div>
  <div class="inline my-8 h-[4px] rounded-xl gradient-bar animate-gradient" />

  <div class="grid grid-flow-col gap-20 justify-items-center ml-[6rem] w-fit">
    {#each experiences as experience, index}
      {#if index % 2 == 1}
        <div
          class="card variant-glass-surface p-4 relative flex flex-col items-center w-[10rem] max-h-[15rem]"
        >
          <time class="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500"
            >{experience.date}</time
          >
          <h4 class="text-lg font-semibold gradient-heading animate-gradient">
            {experience.company}
          </h4>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            {experience.position}
          </h3>

          <!--
        <div class="my-2 h-[4px] w-[80%] rounded-xl gradient-bar animate-gradient"/>
        
        <p class="text-base font-normal text-gray-500 dark:text-gray-400">
          {experience.blurb}
        </p>
        -->
          <!-- Dot centered on the line -->
        </div>
      {/if}
    {/each}
  </div>
</div>