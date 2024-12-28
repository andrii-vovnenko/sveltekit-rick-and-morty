<script lang="ts">
  import { page } from '$app/stores';
	import { fetchEpisodeById } from '$lib/graphql/services/episodes';
	import { onMount } from 'svelte';
  
  $: episodeId = $page.params.episodeId;
  let episodeName: string = '';

  onMount(async () => {
    const episode = await fetchEpisodeById(episodeId);
    episodeName = episode.name;
    console.log(episode);
  });

</script>

<div class="container">
  <h1>{episodeName}</h1>
  <p>Episode ID: {episodeId}</p>
</div>