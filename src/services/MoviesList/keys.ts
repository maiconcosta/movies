import { QueryKey } from 'react-query/types/core/types';

export const createUseMoviesListKey = (
  query: string,
  page: number,
): QueryKey => ['useMoviesList', query, page];
