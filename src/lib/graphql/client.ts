import { createClient, Client, cacheExchange, fetchExchange } from '@urql/svelte';

export const client: Client = createClient({
  url: 'https://rickandmortyapi.com/graphql',
 fetchOptions: {
    headers: {
      'Content-Type': 'application/json',
    },
  },
  exchanges: [cacheExchange, fetchExchange],
});
