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
          <svg
            class="name"
            viewBox="0 0 300 300"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
          >
            <path
              id="circlePath"
              d="
                M 150, 0
                a 150,150 0 1,1 0,300
                a 150,150 0 1,1 0,-300
              "
            />
            <text fill="#fff" dy="-5">
              <textPath href="#circlePath">
                {character.name}
              </textPath>
            </text>
          </svg>
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
    align-items: center;
    scroll-snap-type: x mandatory;
    padding: 50px 0;
    .carousel-slide {
      flex-grow: 1;
      flex-shrink: 0;
      aspect-ratio: 1;
      flex-flow: column nowrap;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      background-color: #fff;
      box-shadow: -2rem 0 3rem -2rem #000;
      max-width: 300px;
      border-radius: 50%;
      img {
        border-radius: 50%;
      }
      .name {
        position: absolute;
        overflow: visible;
        text {
          font-size: 36px;
        }
      }
      &:not(:first-child) {
        position: relative;
        margin-left: -150px;
      }
      transition: transform 0.2s;
      &:hover {
        transform: scale(1.1) rotate(-5deg);
        z-index: 1;

        ~ .carousel-slide {
          transform: translateX(200px);
        }
      }
    }
  }
</style>