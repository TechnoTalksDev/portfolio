<script>

	import { Marquee } from "@selemondev/svelte-marquee";

  export let skills;

</script>
<div class="card variant-glass-surface w-fit">
  <div class="grid gap-4 p-4 h-[25rem]">
    <Marquee direction="up" fade={true} class="[--duration:10s]" pauseOnHover={true}>
      {#each skills as skill, index}
        <div class="flex flex-row items-center">
          <div class="flex-none w-[35px]">
            <a href="/" class="">
              <img src={skill.img} alt={skill.name + ' logo'} class="opacity-[65%]" />
            </a>
          </div>
          <p class="ml-5 h5">{skill.name}</p>
        </div>
      {/each}
    </Marquee>
  </div>
</div>