<script lang="ts">
  import { page } from '$app/stores';
	import { fetchEpisodeById, type CharacterData } from '$lib/graphql/services/episodes';
	import type { Character } from '$lib/graphql/types';
	import { onMount } from 'svelte';
  
  $: episodeId = $page.params.episodeId;
  let episodeName: string = '';
  let characters: CharacterData[] = [];
  let loading = true;

  onMount(async () => {
    const episode = await fetchEpisodeById(episodeId)
      .catch((error) => {
        console.error(error);
        return null;
      });

    if (episode) {
      episodeName = episode.name || '';
      characters = episode.characters;
      loading = false;
    }
  });

</script>

<div class="container">
  {#if loading}
    <p>Loading...</p>
  {:else}
    <h1>{episodeName}</h1>
    <ul class="carousel-container">
      {#each characters as character}
        <li class="carousel-slide">
          <img width="300" height="300" loading="lazy" src="{character.image}" alt="{character.name}"/>
          <span class="name">{character.name}</span>
        </li>
      {/each}
    </ul>
  {/if}
</div>

<style>
  .carousel-container {
    width: 100%;
    overflow-x: auto;
    display: flex;
    width: 100%;
    gap: 8px;
    align-items: center;
    scroll-snap-type: x mandatory;
    .carousel-slide {
      flex-grow: 1;
      flex-shrink: 0;
      aspect-ratio: 1;
      flex-flow: column nowrap;
      display: flex;
      justify-content: center;
      align-items: center;
      scroll-snap-align: center;
      position: relative;
      .name {
        position: absolute;
        text-shadow: #474747 0px 3px 5px;
        bottom: 0;
        font-size: 24px;
        font-weight: 700;
        color: #000;
      }
    }
  }
</style>