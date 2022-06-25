import { useQuery, UseQueryOptions } from 'react-query';
import { createUseGenreKey } from './keys';
import api from '../../services/api';
import { GenreList } from './types';

export const useGenre = (options?: UseQueryOptions<GenreList>) => {
  return useQuery(
    createUseGenreKey(),
    () =>
      api
        .get<GenreList>('genre/movie/list', {
          params: {
            language: 'pt-BR',
            api_key: import.meta.env.VITE_TMDB_API_KEY,
          },
        })
        .then((response) => response.data),
    options,
  );
};
