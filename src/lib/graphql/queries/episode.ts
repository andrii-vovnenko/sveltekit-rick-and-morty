import { gql } from 'graphql-tag';

export const GET_EPISODE = gql`
  query GetEpisode($id: ID!) {
    episode(id: $id) {
      name
      air_date
      characters {
        name
      }
    }
  }
`;
