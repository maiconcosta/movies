import { FC, createContext, useState } from 'react';

type GlobalProviderProps = {
  children: React.ReactNode;
};

type GlobalContextProps = {
  search: string;
  setSearch: (value: string) => void;
  currentPage: number;
  setCurrentPage: (value: number) => void;
};

export const GlobalContext = createContext<GlobalContextProps>({
  search: '',
  setSearch: () => {},
  currentPage: 1,
  setCurrentPage: () => {},
});

const GlobalProvider: FC<GlobalProviderProps> = ({ children }) => {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <GlobalContext.Provider
      value={{
        search,
        setSearch,
        currentPage,
        setCurrentPage,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
