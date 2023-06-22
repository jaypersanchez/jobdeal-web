import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { axiosInstance } from "./ApiContext";

const DataContext = createContext<{
  categories: ICategory[];
}>({
  categories: [],
});

export default function DataProvider({ children }: PropsWithChildren) {
  const [categories, setCategories] = useState<ICategory[]>([]);

  const fetchData = async () => {
    const { data } = await axiosInstance.get("/categories");
    setCategories(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <DataContext.Provider value={{ categories }}>
      {children}
    </DataContext.Provider>
  );
}
export const useData = () => useContext(DataContext);
