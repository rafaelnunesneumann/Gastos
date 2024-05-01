import React, { useState } from "react";
import MyStackNavigator from "./src/navigation/StackNavigator";
import { NavigationContainer } from "@react-navigation/native";
import BottomNav from "./src/navigation/BottomNavigator";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      axios
        .get("http://192.168.0.139:3000/auth", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            setIsLoggedIn(true);
            setIsLoading(false);
          }
        })
        .catch((error) => {
          setIsLoggedIn(false);
          setIsLoading(false);
          console.log(error.response.data);
        });
    } catch (error) {
      console.error(error);
    }
  };

  checkAuth();

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
