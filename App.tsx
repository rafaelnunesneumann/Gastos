import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import BottomNav from "./src/navigation/BottomNavigator";
import MyStackNavigator from "./src/navigation/StackNavigator";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { LoginProvider, useLogin } from "./src/context/LoginContext";
import { SpentProvider, useSpents } from "./src/context/SpentContext";

const BASE_URL = process.env.BASE_URL;

export default function App() {
  return (
    <LoginProvider>
      <SpentProvider>
        <AppContent />
      </SpentProvider>
    </LoginProvider>
  );
}

function AppContent() {
  const { isLoggedIn, setIsLoggedIn, login, logout } = useLogin();
  const [isLoading, setIsLoading] = useState(true);
  const { spents, setSpents } = useSpents();

  useEffect(() => {
    const getUserSpent = async (id: string, token: string) => {
      try {
        axios
          .get(`${BASE_URL}/spent?userId=${id}`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            if (response.status === 200) {
              response.data.map((item: any) => {
                spents.push(item);
              });
            }
          })
          .catch((error) => {
            console.log(error.response.data);
            console.log(error);
          });
      } catch (error) {
        console.error(error);
      }
    };

    const checkAuth = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const id = await AsyncStorage.getItem("userId");
        if (token) {
          axios
            .get(`${BASE_URL}/auth`, {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((response) => {
              if (response.status === 200) {
                if (id) {
                  getUserSpent(id, token);
                  login();
                } else {
                  throw new Error("Id nao encontrado!");
                }
              }
            })
            .catch((error) => {
              console.log(error);
              logout();
            })
            .finally(() => setIsLoading(false));
        } else {
          setIsLoading(false);
        }
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
