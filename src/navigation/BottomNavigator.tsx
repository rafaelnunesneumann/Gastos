import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import Icon from "react-native-vector-icons/AntDesign";
import Icon2 from "react-native-vector-icons/Entypo";
import { Platform, Text } from "react-native";

const Tab = createBottomTabNavigator();

const BottomNav = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color }) => {
          if (route.name === "Home") {
            return <Icon name={"pluscircle"} size={30} color={color} />;
          }
          if (route.name === "Análise") {
            return <Icon name={"piechart"} size={20} color={color} />;
          }
          if (route.name === "Changelog") {
            return <Icon2 name={"megaphone"} size={20} color={color} />;
          }
        },
        tabBarLabel: ({ focused }) => (
          <Text style={focused ? { color: "green" } : { color: "gray" }}>
            {route.name}
          </Text>
        ),
        tabBarActiveTintColor: "green",
        tabBarInactiveTintColor: "gray",
        tabBarLabelStyle: {
          fontSize: 16,
        },
        tabBarStyle: {
          height: Platform.OS === "android" ? 70 : 95,
        },
      })}
    >
      <Tab.Screen name="Análise" component={HomeScreen} />
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Changelog" component={HomeScreen} />
    </Tab.Navigator>
  );
};

export default BottomNav;
