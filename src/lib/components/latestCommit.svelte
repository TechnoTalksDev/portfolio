<script>
	import { onMount } from "svelte";
  import 'ldrs/mirage'
  import 'ldrs/hourglass'


  let commits = [];


  function timeAgo(timestamp) {
    const now = new Date();
    const past = new Date(timestamp);
    const diffInSeconds = Math.floor((now - past) / 1000);

    const intervals = [
        { label: "month", seconds: 2592000 },
        { label: "day", seconds: 86400 },
        { label: "hour", seconds: 3600 },
        { label: "minute", seconds: 60 },
    ];

    for (const interval of intervals) {
        const count = Math.floor(diffInSeconds / interval.seconds);
        if (count >= 1) {
            return `${count} ${interval.label}${count > 1 ? "s" : ""} ago`;
        }
    }

    return "just now";
}



  onMount(() => {
    fetch("https://api.github.com/users/technotalksdev/events/public")
      .then((response) => response.json())
      .then((data) => {
        commits = data;
      });
  });
  
</script>





{#if commits.length > 0}
  <div class="card variant-glass-surface flex flex-row justify-center items-center overflow-x-hidden overflow-y-hidden px-6 py-3 w-full">


    
      <h2 class="h4">
      <span class="animate-pulse">🪄</span>

      Latest 
      <l-mirage
        size="40"
        bg-opacity="0.5"
        speed="4"
        color="white" 
      ></l-mirage>
    
    

    <a href="https://github.com/{commits[0].repo.name}" class="gradient-heading font-bold">{commits[0].repo.name}</a>
    </h2>
    <p class="ml-2 text-sm text-gray-500">{timeAgo(commits[0].created_at)}</p>

  </div>

{/if}