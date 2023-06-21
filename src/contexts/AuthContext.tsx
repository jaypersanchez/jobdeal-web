import { IUser } from "@/types";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { axiosInstance } from "./ApiContext";

const AuthContext = createContext<{
  user: IUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}>({
  user: null,
  login: async () => undefined,
  logout: () => null,
  loading: true,
});

export default function AuthProvider({ children }: PropsWithChildren) {
  const [auth, setAuth] = useState<{
    user: IUser | null;
    loading: boolean;
  }>({
    user: null,
    loading: true,
  });

  const login = async (email: string, password: string) => {
    const { data } = await axiosInstance.post("/auth/login", {
      email,
      password,
    });
    const { access_token } = data;
    localStorage.setItem("token", `Bearer ${access_token.trim()}`);

    fetchUser();
  };

  const fetchUser = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setAuth({
        user: null,
        loading: false,
      });
      return;
    }

    try {
      const { data } = await axiosInstance.get("/profile");
      setAuth({
        user: data,
        loading: false,
      });
    } catch (err) {
      setAuth({
        user: null,
        loading: false,
      });
    }
  };

  const logout = () => {
    localStorage.removeItem("token");

    setAuth({
      user: null,
      loading: false,
    });
  };

  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        ...auth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
