import { format, intervalToDuration } from 'date-fns';

import { useParams } from 'react-router-dom';
import { useMovie } from '../../services/Movie';
import { useTrailer } from '../../services/Trailer';

import { Label, Loading, Score } from '../../components';

import noPhoto from '../../assets/images/no-photo.png';
import './styles.scss';

type MovieStatus = {
  [key: string]: string;
};

const Movie = () => {
  const params = useParams();

  const { data: movie, isFetching } = useMovie(params?.movieId, {
    refetchOnWindowFocus: false,
  });
  const { data: trailer } = useTrailer(params?.movieId, {
    refetchOnWindowFocus: false,
  });

  const imagePath = movie?.poster_path
    ? `https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${movie.poster_path}`
    : noPhoto;

  const duration =
    movie?.runtime &&
    intervalToDuration({ start: 0, end: movie?.runtime * 1000 * 60 });

  const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  const movieStatus: MovieStatus = {
    Released: 'Lançado',
    'In Production': 'Em produção',
    'Post Production': 'Pós-produção',
  };

  return (
    <>
      {isFetching ? (
        <Loading />
      ) : (
        <div className="container">
          <div className="title">
            <h2>{movie?.title}</h2>
            <h4>
              {movie?.release_date
                ? format(new Date(movie.release_date), 'dd/MM/yyyy')
                : 'Data de lançamento desconhecida'}
            </h4>
          </div>
          <div className="detail">
            <div className="info">
              <h3>Sinopse</h3>
              <p className="synopsis">
                {movie?.overview
                  ? movie?.overview
                  : 'Nenhuma sinopse disponível para esse filme.'}
              </p>

              <h3>Informações</h3>

              <div className="movieInfos">
                <div>
                  <h4>Situação</h4>
                  <p>{movie?.status ? movieStatus[movie?.status] : '--'}</p>
                </div>
                <div>
                  <h4>Idioma</h4>
                  <p>{movie?.original_language}</p>
                </div>
                <div>
                  <h4>Duração</h4>
                  <p>
                    {duration
                      ? `${duration.hours}h${duration.minutes}min`
                      : '--'}
                  </p>
                </div>
                <div>
                  <h4>Orçamento</h4>
                  <p>
                    {movie?.budget
                      ? currencyFormatter.format(movie?.budget)
                      : '--'}
                  </p>
                </div>
                <div>
                  <h4>Receita</h4>
                  <p>
                    {movie?.revenue
                      ? currencyFormatter.format(movie?.revenue)
                      : '--'}
                  </p>
                </div>
                <div>
                  <h4>Lucro</h4>
                  <p>
                    {movie?.budget && movie?.revenue
                      ? currencyFormatter.format(movie?.revenue - movie?.budget)
                      : '--'}
                  </p>
                </div>
              </div>

              <div className="tagsScore">
                <div>
                  {movie?.genres.map((genre) => (
                    <Label>{genre.name}</Label>
                  ))}
                </div>

                <Score className="bigScore">
                  {movie?.vote_average && (movie?.vote_average * 10).toFixed(0)}
                  %
                </Score>
              </div>
            </div>

            <img src={imagePath} alt={movie?.title} />
          </div>
        </div>
      )}
      {trailer && trailer?.results?.length > 0 && (
        <div className="video-container">
          <iframe
            id="ytplayer"
            src={`http://www.youtube.com/embed/${
              trailer?.results[trailer?.results.length - 1].key
            }?autoplay=0`}
          />
        </div>
      )}
    </>
  );
};

export default Movie;
