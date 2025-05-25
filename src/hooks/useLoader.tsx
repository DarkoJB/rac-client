import { useContext } from "react";
import { LoaderContext } from "../contexts/LoaderContext";

const useLoader = () => {
  const loader = useContext(LoaderContext);
  return loader.setIsLoading;
};

export default useLoader;
