import { client } from '../client';
import type { Episode } from '../generated';
import { GET_EPISODE } from '../queries/episode';

export const fetchEpisodeById = async (id: string | number): Promise<Episode> => {
  
  try {
    const result = await client.query(GET_EPISODE, { id }).toPromise();

    if (result.error) {
      throw new Error(result.error.message);
    }

    return result.data.episode;
  } catch (error) {
    console.error('Error fetching characters:', error);
    throw error;
  }
};
