import React from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Text,
  Platform,
} from "react-native";
import Header from "../components/Header";

const HomeScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView style={styles.container} alwaysBounceVertical={false}>
        <Header>GASTOS</Header>
        <View style={styles.month}>
          <Text style={styles.monthSpentText}>Gastos esse mes</Text>
          <View style={styles.monthTotalView}>
            <Text style={{ fontSize: 35, marginTop: 6, color: "#d80000" }}>
              R$
            </Text>
            <Text style={{ fontSize: 35, marginTop: 6, color: "#d80000" }}>
              -
            </Text>
            <Text style={{ fontSize: 50, color: "#d80000" }}>750</Text>
            <Text style={{ fontSize: 35, marginTop: 6, color: "#d80000" }}>
              .00
            </Text>
          </View>
        </View>

        <View style={styles.today}>
          <Text style={styles.todayText}>Hoje</Text>
          <Text style={styles.todayText}>-750.00</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === "android" ? 60 : 10,
    backgroundColor: "#fff",
  },
  month: {
    marginTop: 150,
    alignItems: "center",
    justifyContent: "center",
  },
  monthSpentText: {
    color: "#3A3B3C",
    fontSize: 15,
  },
  monthTotalView: {
    marginTop: 8,
    flexDirection: "row",
  },
  today: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
    marginTop: 100,
  },
  todayText: {
    fontSize: 16,
  },
});

export default HomeScreen;
