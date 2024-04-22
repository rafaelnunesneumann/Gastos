import React from "react";
import { SafeAreaView, StyleSheet, View, Text } from "react-native";
import MyTextInput from "../components/MyTextInput";
import Button from "../components/Button";

import Icon from "react-native-vector-icons/AntDesign";

const SignupScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Criar conta</Text>
        <Text style={styles.subtitle}>
          Faça seu cadastro e começe a controlar os seus gastos
        </Text>
      </View>

      <View style={styles.signupSection}>
        <MyTextInput
          inputStyle={styles.inputStyle}
          placeholder="Email"
          onSelectStyle={styles.onSelectStyle}
        />
        <MyTextInput
          inputStyle={styles.inputStyle}
          placeholder="Senha"
          onSelectStyle={styles.onSelectStyle}
        />
        <View style={styles.signupView}>
          <Button
            buttonStyle={styles.buttonSignup}
            textButton={"Cadastrar"}
            textStyle={styles.buttonSignupText}
          />
          <Button
            buttonStyle={styles.buttonLogin}
            textButton={"Entre na sua conta"}
            textStyle={styles.buttonLoginText}
          />
        </View>
      </View>

      <View style={styles.googleSection}>
        <Text style={styles.textContinue}>Ou continue com</Text>
        <View style={styles.iconsView}>
          <View style={styles.iconContainer}>
            <Icon name="google" size={25} />
          </View>
          <View style={styles.iconContainer}>
            <Icon name="facebook-square" size={25} />
          </View>
          <View style={styles.iconContainer}>
            <Icon name="apple1" size={25} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 100,
  },
  content: {
    width: "70%",
  },
  title: {
    fontSize: 40,
    color: "green",
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    textAlign: "center",
    marginTop: 20,
    fontWeight: "600",
    fontSize: 20,
  },
  signupSection: {
    width: "80%",
  },
  inputStyle: {
    width: "100%",
    height: 50,
    backgroundColor: "#ECECEC",
    paddingHorizontal: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  onSelectStyle: {
    borderWidth: 2,
    borderColor: "green",
  },
  forgotPasswordButton: {
    width: "100%",
    backgroundColor: "#fff",
    alignItems: "flex-end",
  },
  forgotPasswordText: {
    color: "green",
    fontWeight: "600",
  },
  signupView: { alignItems: "center", marginTop: 15 },
  buttonSignup: {
    backgroundColor: "green",
    paddingVertical: 16,
    width: "100%",
    alignItems: "center",
    borderRadius: 5,
  },
  buttonSignupText: { fontSize: 20, color: "white", fontWeight: "600" },
  buttonLogin: {
    marginTop: 30,
    backgroundColor: "#fff",
    width: "100%",
    alignItems: "center",
    borderRadius: 5,
  },
  buttonLoginText: { fontSize: 15, color: "black", fontWeight: "600" },
  googleSection: {
    marginBottom: 100,
    width: "100%",
    alignItems: "center",
  },
  textContinue: {
    color: "green",
    fontWeight: "600",
    fontSize: 16,
  },
  iconsView: {
    marginTop: 20,
    width: "50%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  iconContainer: {
    backgroundColor: "#ECECEC",
    alignItems: "center",
    padding: 16,
    borderRadius: 5,
  },
});

export default SignupScreen;
