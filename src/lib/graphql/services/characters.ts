import { client } from '../client';
import type { Episode, Characters, Character } from '../generated';
import { GET_CHARACTERS } from '../queries/characters';
export type FetchEpisodesByCharactersResultOld = Map<string, Episode[]>;  
export type FetchEpisodesByCharactersResult = Character[];

export const fetchEpisodesByCharacters = async (name: string | null = null): Promise<FetchEpisodesByCharactersResult> => {
  const characterToEpisodesMap: FetchEpisodesByCharactersResult = [];
  const episodesMap: Map<string, Episode> = new Map();
  let page = 1;

  try {
    while (true) {
      const result = await client.query(GET_CHARACTERS, { name, page }).toPromise();
      
      if (result.error) {
        episodesMap.clear();
        throw new Error(result.error.message);
      }
      const data: Characters = result.data.characters;
      
      if (!data.results?.length || !data.info?.next) break;
      
      characterToEpisodesMap.push(...(data.results as Character[]));

      page++;
    }

    return characterToEpisodesMap;
  } catch (error) {
    console.error('Error fetching characters:', error);
    throw error;
  }
};
