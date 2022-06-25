import { useQuery, UseQueryOptions } from 'react-query';
import { createUseMovie } from './keys';
import api from '../api';
import { Movie } from '../../types/Movie';

export const useMovie = (
  movieId: string | undefined,
  options?: UseQueryOptions<Movie>,
) => {
  return useQuery(
    createUseMovie(),
    () =>
      api
        .get<Movie>(`movie/${movieId}`, {
          params: {
            api_key: import.meta.env.VITE_TMDB_API_KEY,
            language: 'pt-BR',
          },
        })
        .then((response) => response.data),
    options,
  );
};
