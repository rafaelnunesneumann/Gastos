import React, { useState } from "react";
import { SafeAreaView, StyleSheet, View, Text } from "react-native";
import MyTextInput from "../components/MyTextInput";
import Button from "../components/Button";
import Icon from "react-native-vector-icons/AntDesign";
import axios from "axios";

const BASE_URL = process.env.BASE_URL;

const SignupScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const handleRegister = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    setIsLoading(true);
    if (!verifyEmail(email)) {
      alert("Digite um email valido");
      setIsLoading(false);
      return;
    }
    try {
      axios
        .post(`${BASE_URL}/register`, {
          method: "POST",
          data: {
            email: email,
            password: password,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            alert("Usuario cadastrado com sucesso!");
            clearInputs();
          }
        })
        .catch((error) => {
          if (error.response) {
            if (error.response.status === 500) {
              alert("Esse email ja esta cadastrado!");
            }
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const verifyEmail = (email: string): boolean => {
    return reg.test(email);
  };

  const clearInputs = () => {
    setEmail("");
    setPassword("");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.container}>
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
            onChangeText={(text) => {
              setEmail(text);
            }}
            autoComplete={"email"}
            inputMode={"email"}
            value={email}
          />
          <MyTextInput
            inputStyle={styles.inputStyle}
            placeholder="Senha"
            onSelectStyle={styles.onSelectStyle}
            onChangeText={(text) => {
              setPassword(text);
            }}
            secureTextEntry={true}
            value={password}
          />
          <View style={styles.signupView}>
            <Button
              buttonStyle={styles.buttonSignup}
              textButton={"Cadastrar"}
              textStyle={styles.buttonSignupText}
              isLoading={isLoading}
              loadingColor="white"
              onPress={() => handleRegister({ email, password })}
            />
            <Button
              buttonStyle={styles.buttonLogin}
              textButton={"Entre na sua conta"}
              textStyle={styles.buttonLoginText}
              onPress={() => navigation.navigate("Login")}
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
