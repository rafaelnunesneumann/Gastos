import React from "react";
import { Platform, StyleSheet } from "react-native";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import Header from "../components/Header";
import { useSpents } from "../context/SpentContext";
import Chart from "./components/AnalyticsScreen/BarChart";

const AnalyticsScreen = () => {
  const { monthSpents } = useSpents();

  const totalInteger = (): number => {
    let total = 0;
    monthSpents.map((value) => {
      total += value.value;
    });
    return ~~total;
  };

  const totalCents = (): string => {
    let total = 0;
    monthSpents.map((value) => {
      total += value.value;
    });
    const output = total.toFixed(2).toString().split(".")[1];
    return output;
  };

  const barData = [
    { value: 250, label: "1" },
    { value: 500, label: "2" },
    { value: 745, label: "3" },
    { value: 320, label: "4" },
    { value: 600, label: "5" },
    { value: 256, label: "6" },
    { value: 300, label: "7" },
    { value: 234, label: "8" },
    { value: 852, label: "9" },
    { value: 235, label: "10" },
    { value: 436, label: "11" },
    { value: 123, label: "12" },
    { value: 967, label: "13" },
    { value: 346, label: "14" },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView
        style={styles.container}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        <Header>GASTOS</Header>
        <View style={{ paddingHorizontal: 20 }}>
          <View style={styles.monthTotalView}>
            <Text style={{ fontSize: 35, marginTop: 6, color: "#d80000" }}>
              R$
            </Text>
            <Text style={{ fontSize: 35, marginTop: 6, color: "#d80000" }}>
              -
            </Text>
            <Text style={{ fontSize: 50, color: "#d80000" }}>
              {totalInteger()}
            </Text>
            <Text style={{ fontSize: 35, marginTop: 6, color: "#d80000" }}>
              .{totalCents()}
            </Text>
          </View>
          <Text style={{ fontSize: 16, color: "#6B7280" }}>
            Total gasto por dia esse mês:
          </Text>
          <View
            style={{
              marginTop: 30,
              elevation: 5,
              shadowOpacity: 0.2,
              shadowOffset: {
                width: 2,
                height: 0,
              },
            }}
          >
            <Chart data={barData} />
          </View>
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
  monthTotalView: {
    marginTop: 60,
    flexDirection: "row",
  },
});

export default AnalyticsScreen;
