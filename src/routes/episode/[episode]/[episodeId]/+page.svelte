<script lang="ts">
  import { page } from '$app/stores';
	import { fetchEpisodeById, type CharacterData } from '$lib/graphql/services/episodes';
	import { onMount } from 'svelte';
  
  const episodeId = $page.params.episodeId;
  let episodeName: string = '';
  let characters: CharacterData[] = [];
  let loading = true;
  const { season, episode } = parseEpisodePath($page.params.episode);

  function parseEpisodePath(episodePath: string): { season: number, episode: number } {
    const match = episodePath.match(/\D(?<season>\d+)\D(?<episode>\d+)/);

    const result = {
      season: 0,
      episode: 0,
    };

    if (match && match.groups) {
      result.season = parseInt(match.groups.season, 10);
      result.episode = parseInt(match.groups.episode, 10);
    }

    return result;
  }

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
    <div class="header-container">
      <h1>{episodeName}</h1>
      <p>{`Season - ${season} Episode - ${episode}`}</p>  
    </div>
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
  .header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #e0e0e0;
    margin-bottom: 24px;
    padding-bottom: 6px;
    h1, p {
      margin: 0;
      padding: 0;
    }
  }
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
      padding-bottom: 32px;
      background-color: #fff;
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