import { useQuery, UseQueryOptions } from 'react-query';
import { createUseMoviesListKey } from './keys';
import api from '../../services/api';
import { MovieList } from './types';

export const useMoviesList = (
  query: string,
  options?: UseQueryOptions<MovieList>,
) => {
  return useQuery(
    createUseMoviesListKey(query),
    () =>
      api
        .get<MovieList>('search/movie', {
          params: {
            query,
            language: 'pt-BR',
            api_key: import.meta.env.VITE_MOVIES_API_KEY,
            page: 1,
          },
        })
        .then((response) => response.data),
    options,
  );
};
