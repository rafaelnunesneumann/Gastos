import React from "react";
import MyStackNavigator from "./src/navigation/StackNavigator";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  return (
    <NavigationContainer>
      <MyStackNavigator />
    </NavigationContainer>
  );
}
