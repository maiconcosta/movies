import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { GlobalContext } from '../../contexts/GlobalContext';
import { Card, Loading, Search } from '../../components';
import useDebounce from '../../hooks/useDebounce';
import { useMoviesList } from '../../services/MoviesList';

const Home = () => {
  const navigate = useNavigate();

  const { search, setSearch } = useContext(GlobalContext);
  const debouncedSearchQuery = useDebounce(search, 600);
  const isLongEnough = debouncedSearchQuery.length >= 3;

  const { data: movies, isFetching } = useMoviesList(debouncedSearchQuery, {
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
    keepPreviousData: true,
    enabled: isLongEnough,
  });

  const handleChangeSearch = (e: React.FormEvent<HTMLInputElement>) =>
    setSearch(e.currentTarget.value);

  const navigateToDetails = (movieId: number) => {
    navigate(`/movie/${movieId}`);
  };

  return (
    <main>
      <Search onChange={handleChangeSearch} />

      {isFetching ? (
        <Loading />
      ) : (
        movies?.results.map((movie) => (
          <Card
            key={movie.id}
            movie={movie}
            navigateToDetails={navigateToDetails}
          />
        ))
      )}
    </main>
  );
};

export default Home;
