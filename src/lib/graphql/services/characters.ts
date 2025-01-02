import { client } from '../client';
import type { Episode, Characters } from '../generated';
import { GET_CHARACTERS } from '../queries/characters';
export type FetchEpisodesByCharactersResult = Map<string, Episode[]>;

export const fetchEpisodesByCharacters = async (name: string | null = null): Promise<FetchEpisodesByCharactersResult> => {
  const characterToEpisodesMap: FetchEpisodesByCharactersResult = new Map();
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
      
      if (!data.results?.length) {
        break;
      }

      for (const character of data.results) {
        const characterName: string = character?.name as string;
        characterToEpisodesMap.set(characterName, character?.episode as Episode[]);
        const episodes = (character?.episode || []) as Episode[];
          episodes.forEach((episode) => episodesMap.set(episode?.id as string, episode));
      }

      if (!data.info?.next) {
        break;
      }

      page++;
    }

    return characterToEpisodesMap;
  } catch (error) {
    console.error('Error fetching characters:', error);
    throw error;
  }
};
