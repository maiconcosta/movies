import { FC, createContext, useState } from 'react';

type GlobalProviderProps = {
  children: React.ReactNode;
};

type GlobalContextProps = {
  search: string;
  setSearch: (value: string) => void;
};

export const GlobalContext = createContext<GlobalContextProps>({
  search: '',
  setSearch: () => {},
});

const GlobalProvider: FC<GlobalProviderProps> = ({ children }) => {
  const [search, setSearch] = useState('');

  return (
    <GlobalContext.Provider
      value={{
        search,
        setSearch,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
