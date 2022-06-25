import { useQuery, UseQueryOptions } from 'react-query';
import { createUseMoviesListKey } from './keys';
import api from '../../services/api';
import { MovieList } from './types';

export const useMoviesList = (
  query: string,
  page: number = 1,
  options?: UseQueryOptions<MovieList>,
) => {
  return useQuery(
    createUseMoviesListKey(query, page),
    () =>
      api
        .get<MovieList>('search/movie', {
          params: {
            query,
            language: 'pt-BR',
            api_key: import.meta.env.VITE_TMDB_API_KEY,
            page,
          },
        })
        .then((response) => response.data),
    options,
  );
};
