import Axios, { AxiosInstance } from "axios";
import { PropsWithChildren, createContext, useContext, useEffect } from "react";

export const axiosInstance = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "content-type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

const ApiContext = createContext<{
  api: AxiosInstance;
}>({
  api: axiosInstance,
});

export default function ApiProvider({ children }: PropsWithChildren) {
  useEffect(() => {
    axiosInstance.interceptors.response.use(
      (res) => {
        return res;
      },
      (err) => {
        console.error(err.response);

        if (err.response.status === 401) {
          // toast.error("Unauthorized", {
          //   id: err.response
          // });
        }
        return Promise.reject(err);
      }
    );
  }, []);

  return (
    <ApiContext.Provider value={{ api: axiosInstance }}>
      {children}
    </ApiContext.Provider>
  );
}

export const useApi = () => useContext(ApiContext);
