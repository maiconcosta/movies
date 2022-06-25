import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import GlobalProvider from './contexts/GlobalContext';
import RoutesComponent from './routes';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalProvider>
        <BrowserRouter>
          <RoutesComponent />
        </BrowserRouter>
      </GlobalProvider>
    </QueryClientProvider>
  );
}

export default App;
