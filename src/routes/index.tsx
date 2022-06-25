import { Route, Routes } from 'react-router-dom';
import { Header } from '../components';
import Home from '../pages/Home';
import Movie from '../pages/Movie';
import ScrollToTop from './ScrollToTop';

const RoutesComponent = () => (
  <>
    <Header />
    <ScrollToTop>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:movieId" element={<Movie />} />
      </Routes>
    </ScrollToTop>
  </>
);

export default RoutesComponent;
