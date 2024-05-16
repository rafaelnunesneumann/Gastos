import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import BottomNav from "./src/navigation/BottomNavigator";
import MyStackNavigator from "./src/navigation/StackNavigator";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { LoginProvider, useLogin } from "./src/context/LoginContext";

export default function App() {
  return (
    <LoginProvider>
      <AppContent />
    </LoginProvider>
  );
}

function AppContent() {
  const { isLoggedIn, setIsLoggedIn, login, logout } = useLogin();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        axios
          .get("http://192.168.0.140:3000/auth", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            if (response.status === 200) {
              login();
              setIsLoading(false);
            }
          })
          .catch((error) => {
            logout();
            setIsLoading(false);
            console.log(error.response.data);
          });
      } catch (error) {
        console.error(error);
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
