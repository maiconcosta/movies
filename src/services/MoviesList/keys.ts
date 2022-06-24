import { QueryKey } from 'react-query/types/core/types';

export const createUseMoviesListKey = (query: string): QueryKey => [
  'useMoviesList',
  query,
];
