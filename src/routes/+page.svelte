<script lang="ts">
  import { fetchEpisodesByCharacters, type FetchEpisodesByCharactersResult } from '$lib/graphql/services/characters';
  import type { Episode } from '$lib/graphql/types';

  let query: string = '';
  let searchBy: 'character' | 'episode' = 'character';
  let result: FetchEpisodesByCharactersResult = new Map();
  let errorMessage: string = '';
  let isLoading: boolean = false;
  let noResults: boolean = false;
  let isInvalid: boolean = false;

  function validateQuery(): boolean {
    return query.length >= 3;
  }

  async function search(event: Event) {
    event.preventDefault();

    if (!validateQuery()) {
      isInvalid = true;
      return;
    }

    isLoading = true;
    errorMessage = '';
    noResults = false;

    try {
      result = await fetchEpisodesByCharacters(query);
      
      if (!result.size) {
        noResults = true;
      }
    } catch (error) {
      errorMessage = 'Error fetching characters. Please try again.';
      console.error('Error:', error);
    } finally {
      isLoading = false;
    }
  }
</script>

<div class="container">
  <form on:submit={search} novalidate>
    <fieldset>
      <legend>Search episodes by:</legend>
      <input type="radio" id="character" name="search-by" checked bind:group={searchBy} value="character" />
      <label for="character">Character</label>
      <input type="radio" id="episode" name="search-by" bind:group={searchBy} value="episode" />
      <label for="episode">Episode</label>
    </fieldset>

    <input
      type="text"
      bind:value={query}
      placeholder={`Search for ${searchBy}`}
      on:input={() => isInvalid = query.length < 3}
      class:invalid={isInvalid}
      aria-invalid={isInvalid ? 'true' : 'false'}
      required
    />
    {#if isInvalid}
      <p class="error">Please enter at least 3 characters to search.</p>
    {/if}
    
    <button type="submit" disabled={isLoading || isInvalid}>
      {#if isLoading}
        Loading...
      {:else}
        Search
      {/if}
    </button>
  </form>

  {#if errorMessage}
    <p class="error">{errorMessage}</p>
  {/if}

  {#if noResults}
    <p>No results found.</p>
  {/if}

  {#if result.size > 0 && !noResults}
    <ul>
      {#each result.keys() as characterName}
        <p>{characterName}</p>
        <ul>
          {#each (result.get(characterName) as Episode[]) as episode}
            <li>
              <a href="/episode/{episode.episode}/{episode.id}">{episode.episode} - {episode.name}</a>
            </li>
          {/each}
        </ul>
      {/each}
    </ul>
  {/if}
</div>

<style>
  .invalid {
    border: 1px solid red;
  }

  .error {
    color: red;
  }

  button[disabled] {
    background-color: gray;
    cursor: not-allowed;
  }
</style>
