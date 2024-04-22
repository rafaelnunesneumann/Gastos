import React from "react";
import { Text, View, StyleSheet, SafeAreaView } from "react-native";
import SVGImg from "../../assets/images/image1.svg";
import Button from "../components/Button";

const MainScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.container}>
        <SVGImg width={350} height={350} />
        <View style={styles.content}>
          <Text style={styles.title}>Controle seus gastos aqui</Text>
          <Text style={styles.subtitle}>
            Adicione e controle todos os seus gastos de forma simples e sem
            complicações
          </Text>
        </View>
        <View style={styles.buttonView}>
          <Button
            buttonStyle={[styles.button, { backgroundColor: "green" }]}
            textButton={"Login"}
            textStyle={[styles.buttonText, { color: "white" }]}
            onPress={() => navigation.navigate("Login")}
          />
          <Button
            buttonStyle={[styles.button, { backgroundColor: "#fff" }]}
            textButton={"Cadastrar"}
            textStyle={[styles.buttonText, { color: "black" }]}
            onPress={() => navigation.navigate("Signup")}
          />
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
    marginTop: 40,
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
  subtitle: { textAlign: "center", marginTop: 20 },
  buttonView: {
    marginBottom: 100,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "75%",
  },
  button: {
    paddingVertical: 15,
    borderRadius: 10,
    width: "50%",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 15,
    fontWeight: "bold",
  },
});

export default MainScreen;
