import { createContext, useContext, useState } from "react";

const GlobalContext = createContext();

function GlobalProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <GlobalContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </GlobalContext.Provider>
  );
}

function useGlobal() {
  const context = useContext(GlobalContext);
  return context;
}

export { GlobalProvider, useGlobal };
