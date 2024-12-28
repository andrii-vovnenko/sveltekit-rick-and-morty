<script lang="ts">
  import { page } from '$app/stores';


  $: episode = $page.params.episode;
  $: episodeId = $page.params.episodeId;

</script>

<div>
  <h1>Episode {episode}</h1>
  <p>Episode ID: {episodeId}</p>
</div>