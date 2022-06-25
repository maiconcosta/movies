import { useQuery, UseQueryOptions } from 'react-query';
import { createUseTrailerKey } from './keys';
import api from '../api';
import { TrailerList } from './types';

export const useTrailer = (
  movieId: string | undefined,
  options?: UseQueryOptions<TrailerList>,
) => {
  return useQuery(
    createUseTrailerKey(),
    () =>
      api
        .get<TrailerList>(`movie/${movieId}/videos`, {
          params: {
            api_key: import.meta.env.VITE_TMDB_API_KEY,
          },
        })
        .then((response) => response.data),
    options,
  );
};
