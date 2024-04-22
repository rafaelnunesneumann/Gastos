import React from "react";
import { Text, View, StyleSheet, SafeAreaView } from "react-native";
import SVGImg from "../../assets/images/image1.svg";
import Button from "../components/Button";

const MainScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
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
        />
        <Button
          buttonStyle={[styles.button, { backgroundColor: "#fff" }]}
          textButton={"Cadastrar"}
          textStyle={[styles.buttonText, { color: "black" }]}
        />
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
  subtitle: { textAlign: "center", marginTop: 20 },
  buttonView: {
    marginBottom: 100,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "75%",
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 55,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: "bold",
  },
});

export default MainScreen;
