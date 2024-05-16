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
          <Text style={styles.todayText}>R$ -750.00</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.cardStart}>
            <Text style={styles.cardIcon}>⛽</Text>
            <View style={styles.cardStartText}>
              <Text style={styles.cardSpent}>Gasolina</Text>
              <Text style={styles.cardTime}>10:30</Text>
            </View>
          </View>
          <View style={styles.cardEnd}>
            <Text style={styles.cardValue}>R$ -750.00</Text>
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
    marginHorizontal: 16,
    marginTop: 100,
  },
  todayText: {
    fontSize: 16,
    color: '#8C8C8C'
  },
  card: {
    padding: 16,
    alignItems: "center",
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  cardIcon: {
    fontSize: 30,
  },
  cardStart: {
    width: '50%', 
    flexDirection: 'row',
  },
  cardStartText: {
    marginLeft: 15, 
    justifyContent: 'space-between'
  },
  cardSpent: {
    fontSize: 16
  },
  cardTime: {
    fontSize: 14,
    color: '#8C8C8C'
  },
  cardEnd: {
    paddingRight: 2
  },
  cardValue: {
    color: 'red'
  }
});

export default HomeScreen;
