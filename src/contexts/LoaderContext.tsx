import { createContext, FC, ReactNode, useState } from "react";
import { iLoaderContextValue } from "../shared/interfaces";
import Loader from "../components/Loader/Loader";

export const LoaderContext = createContext<iLoaderContextValue>({
  isLoading: false,
  setIsLoading: () => {},
});

const LoaderProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const value = {
    isLoading,
    setIsLoading,
  };
  return (
    <LoaderContext.Provider value={value}>
      {children}
      {isLoading && <Loader />}
    </LoaderContext.Provider>
  );
};

export default LoaderProvider;
