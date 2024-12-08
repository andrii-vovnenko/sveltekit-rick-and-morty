import { gql } from 'graphql-tag';

export const GET_CHARACTERS = gql`
  query GetCharacters($name: String, $page: Int) {
    characters(page: $page, filter: { name: $name }) {
      info{
        next
      }
      results {
        id
        name
        episode {
          name
          episode
          id
        }
      }
    }
  }
`;
