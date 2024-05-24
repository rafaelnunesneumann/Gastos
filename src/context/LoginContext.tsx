import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useState, useContext, ReactNode } from "react";
import { useSpents } from "./SpentContext";

interface LoginContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: Function;
  login: () => void;
  logout: () => void;
}

const LoginContext = createContext<LoginContextType | undefined>(undefined);

export const LoginProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const { setSpents } = useSpents();

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = async () => {
    setIsLoggedIn(false);
    setSpents([]);
    await AsyncStorage.removeItem("token");
  };

  return (
    <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn, login, logout }}>
      {children}
    </LoginContext.Provider>
  );
};

export const useLogin = () => {
  const context = useContext(LoginContext);
  if (!context) {
    throw new Error("useLogin deve ser usado dentro de um LoginProvider");
  }
  return context;
};
