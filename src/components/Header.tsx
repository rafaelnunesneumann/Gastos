import React, { ReactNode } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { useLogin } from "../context/LoginContext";

interface HeaderProps {
  children?: ReactNode;
}

const Header: React.FC<HeaderProps> = ({ children }) => {
  const { logout } = useLogin();

  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Icon name="moon" size={25} />
      </TouchableOpacity>
      <Text style={styles.text}>{children}</Text>
      <TouchableOpacity onPress={() => logout()}>
        <Icon name="log-out" size={25} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "600",
  },
});

export default Header;
