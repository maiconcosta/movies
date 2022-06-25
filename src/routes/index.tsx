import { Route, Routes } from 'react-router-dom';
import { Header } from '../components';
import Home from '../pages/Home';
import Movie from '../pages/Movie';

const RoutesComponent = () => (
  <>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movie/:movieId" element={<Movie />} />
    </Routes>
  </>
);

export default RoutesComponent;
