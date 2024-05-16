import React, { useState } from "react";
import { SafeAreaView, StyleSheet, View, Text } from "react-native";
import MyTextInput from "../components/MyTextInput";
import Button from "../components/Button";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Icon from "react-native-vector-icons/AntDesign";

const BASE_URL = process.env.BASE_URL;

const LoginScreen: React.FC<{ navigation: any; setIsLoggedIn: Function }> = ({
  navigation,
  setIsLoggedIn,
}) => {
  const handleLogin = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    if (!verifyEmail(email)) {
      alert("Digite um email valido");
      return;
    }
    try {
      axios
        .post(`${BASE_URL}/login`, {
          method: "POST",
          data: {
            email: email,
            password: password,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            setIsLoggedIn(true);
            AsyncStorage.setItem("token", response.data.token);
          }
        })
        .catch((error) => {
          if (error.response) {
            if (error.response.status === 500) {
              alert(error.response.data.message);
            }
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const verifyEmail = (email: string): boolean => {
    return reg.test(email);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Login</Text>
          <Text style={styles.subtitle}>
            Bem vindo de volta! Sentimos a sua falta!
          </Text>
        </View>

        <View style={styles.loginSection}>
          <MyTextInput
            inputStyle={styles.inputStyle}
            placeholder="Email"
            onSelectStyle={styles.onSelectStyle}
            inputMode={"email"}
            onChangeText={(value) => setEmail(value)}
          />
          <MyTextInput
            inputStyle={styles.inputStyle}
            placeholder="Senha"
            onSelectStyle={styles.onSelectStyle}
            secureTextEntry={true}
            onChangeText={(value) => setPassword(value)}
          />
          <Button
            buttonStyle={styles.forgotPasswordButton}
            textButton={"Esqueceu a sua senha?"}
            textStyle={styles.forgotPasswordText}
          />
          <View style={styles.loginView}>
            <Button
              buttonStyle={styles.buttonLogin}
              textButton={"Entrar"}
              textStyle={styles.buttonLoginText}
              onPress={() => handleLogin({ email, password })}
            />
            <Button
              buttonStyle={styles.buttonSignup}
              textButton={"Criar uma nova conta"}
              textStyle={styles.buttonSignupText}
              onPress={() => navigation.navigate("Signup")}
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
  loginSection: {
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
  loginView: { alignItems: "center", marginTop: 30 },
  buttonLogin: {
    backgroundColor: "green",
    paddingVertical: 16,
    width: "100%",
    alignItems: "center",
    borderRadius: 5,
  },
  buttonLoginText: { fontSize: 20, color: "white", fontWeight: "600" },
  buttonSignup: {
    marginTop: 30,
    backgroundColor: "#fff",
    width: "100%",
    alignItems: "center",
    borderRadius: 5,
  },
  buttonSignupText: { fontSize: 15, color: "black", fontWeight: "600" },
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

export default LoginScreen;
