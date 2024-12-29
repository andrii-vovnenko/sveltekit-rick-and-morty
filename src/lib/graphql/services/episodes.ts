import { client } from '../client';
import type { Character, Episode } from '../generated';
import { GET_EPISODE } from '../queries/episode';

export type CharacterData = Pick<Character, 'name' | 'image'>;

type EpisodeData = Pick<Episode, 'name' | 'air_date'> & {
  characters: CharacterData[];
};

export const fetchEpisodeById = async (id: string | number): Promise<EpisodeData> => {
  
  try {
    const result = await client.query(GET_EPISODE, { id }).toPromise();

    if (result.error) {
      throw new Error(result.error.message);
    }

    return result.data.episode;
  } catch (error) {
    console.error('Error fetching episode:', error);
    throw error;
  }
};
