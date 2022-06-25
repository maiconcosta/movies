import { format } from 'date-fns';
import { Movie } from '../../types/Movie';
import { Label, Score } from '../../components';
import { useGenre } from '../../services/Genre';

import noPhoto from '../../assets/images/no-photo.png';
import './styles.scss';

type CardProps = {
  movie: Movie;
  navigateToDetails(e: number): void;
};

export const Card = ({ movie, navigateToDetails }: CardProps) => {
  const { data } = useGenre({
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60,
  });

  const imagePath = movie.poster_path
    ? `https://www.themoviedb.org/t/p/w220_and_h330_bestv2/${movie.poster_path}`
    : noPhoto;

  return (
    <section onClick={() => navigateToDetails(movie.id)}>
      <img src={imagePath} alt={movie?.title} />

      <div className="cardInfo">
        <div className="cardHeader">
          <h2>{movie.title}</h2>
        </div>

        <div className="cardContent">
          <div className="movieScore">
            <Score>{movie.vote_average * 10}%</Score>
          </div>

          <h3>
            {movie.release_date
              ? format(new Date(movie.release_date), 'dd/MM/yyyy')
              : 'Data de lançamento desconhecida'}
          </h3>

          <p className="synopsis">
            {movie.overview
              ? movie.overview
              : 'Nenhuma sinopse disponível para esse filme.'}
          </p>

          {data?.genres
            .filter((genre) => movie.genre_ids.includes(genre.id))
            .map((genre) => (
              <Label>{genre.name}</Label>
            ))}
        </div>
      </div>
    </section>
  );
};
