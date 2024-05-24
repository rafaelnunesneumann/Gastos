import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import BottomNav from "./src/navigation/BottomNavigator";
import MyStackNavigator from "./src/navigation/StackNavigator";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { LoginProvider, useLogin } from "./src/context/LoginContext";
import { SpentProvider, useSpents } from "./src/context/SpentContext";
import * as SplashScreen from "expo-splash-screen";
import SpentControl from "./src/hooks/SpentControl";

const BASE_URL = process.env.BASE_URL;

SplashScreen.preventAutoHideAsync();

export default function App() {
  return (
    <SpentProvider>
      <LoginProvider>
        <AppContent />
      </LoginProvider>
    </SpentProvider>
  );
}

function AppContent() {
  const { isLoggedIn, setIsLoggedIn, login, logout } = useLogin();
  const [isLoading, setIsLoading] = useState(true);
  const { getUserSpent } = SpentControl();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const id = await AsyncStorage.getItem("userId");

        if (token) {
          try {
            const response = await axios.get(`${BASE_URL}/auth`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });

            if (response.status === 200) {
              if (id) {
                await getUserSpent(id, token);
                login();
              } else {
                throw new Error("Id não encontrado!");
              }
            }
          } catch (error) {
            console.error(error);
            logout();
          }
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
        await SplashScreen.hideAsync();
      }
    };

    checkAuth();
  }, []);

  return (
    <NavigationContainer>
      {!isLoading ? (
        isLoggedIn ? (
          <BottomNav />
        ) : (
          <MyStackNavigator setIsLoggedIn={setIsLoggedIn} />
        )
      ) : null}
    </NavigationContainer>
  );
}
