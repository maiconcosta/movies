import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { GlobalContext } from '../../contexts/GlobalContext';
import { Card, Loading, Pagination, Search } from '../../components';
import useDebounce from '../../hooks/useDebounce';
import { useMoviesList } from '../../services/MoviesList';

const Home = () => {
  const navigate = useNavigate();

  const { search, setSearch, currentPage, setCurrentPage } =
    useContext(GlobalContext);
  const debouncedSearchQuery = useDebounce(search, 600);
  const isLongEnough = debouncedSearchQuery.length >= 3;

  const { data: movies, isFetching } = useMoviesList(
    debouncedSearchQuery,
    currentPage,
    {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
      keepPreviousData: true,
      enabled: isLongEnough,
    },
  );

  const handleChangeSearch = (e: React.FormEvent<HTMLInputElement>) =>
    setSearch(e.currentTarget.value);

  const navigateToDetails = (movieId: number) => {
    navigate(`/movie/${movieId}`);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchQuery]);

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

      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={movies?.total_results || 0}
        pageSize={20}
        onPageChange={(page: number) => setCurrentPage(page)}
      />
    </main>
  );
};

export default Home;
