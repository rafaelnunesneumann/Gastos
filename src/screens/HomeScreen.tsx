import React from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Text,
  Platform,
  FlatList,
} from "react-native";
import Header from "../components/Header";
import { useSpents } from "../context/SpentContext";
import moment from "moment";

interface Spent {
  id: string;
  icon: string;
  type: string;
  value: number;
  created_at: string;
}

const HomeScreen: React.FC = () => {
  const { monthSpents } = useSpents();
  const todayDate = new Date(Date.now());
  const uniqueDays = getUniqueDays(monthSpents);

  function getUniqueDays(monthSpents: Spent[]): string[] {
    const uniqueDays = new Set<string>();

    monthSpents.forEach((obj) => {
      const date = moment(obj.created_at).format("YYYY-MM-DD");
      uniqueDays.add(date);
    });

    const uniqueDaysArray = Array.from(uniqueDays);
    uniqueDaysArray.sort(
      (a, b) => new Date(b).getTime() - new Date(a).getTime()
    );

    return uniqueDaysArray;
  }

  const getSpentsByDay = (date: string): Spent[] => {
    return monthSpents.filter(
      (obj) => moment(obj.created_at).format("YYYY-MM-DD") === date
    );
  };

  const totalPerDay = (date: string): number => {
    return getSpentsByDay(date).reduce((total, item) => total + item.value, 0);
  };

  const totalInteger = (): number => {
    return Math.floor(
      monthSpents.reduce((total, item) => total + item.value, 0)
    );
  };

  const totalCents = (): string => {
    const total = monthSpents.reduce((total, item) => total + item.value, 0);
    return total.toFixed(2).split(".")[1];
  };

  const formatDateString = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", { month: "long", day: "numeric" });
  };

  const convertToTime = (isoString: string): string => {
    const date = new Date(isoString);
    return date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView
        style={styles.container}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        <Header>GASTOS</Header>
        <View style={styles.month}>
          <Text style={styles.monthSpentText}>Gastos esse mês</Text>
          <View style={styles.monthTotalView}>
            <Text style={styles.currencySymbol}>R$</Text>
            <Text style={styles.dash}>-</Text>
            <Text style={styles.totalInteger}>{totalInteger()}</Text>
            <Text style={styles.cents}>.{totalCents()}</Text>
          </View>
        </View>

        {monthSpents.length > 0 ? (
          uniqueDays.map((date, index) => (
            <View key={index}>
              <View style={styles.today}>
                <Text style={styles.todayText}>
                  {Number.parseInt(date.split("-")[2]) === todayDate.getDate()
                    ? "Hoje"
                    : Number.parseInt(date.split("-")[2]) ===
                      todayDate.getDate() - 1
                    ? "Ontem"
                    : formatDateString(date)}
                </Text>
                <Text style={styles.todayText}>
                  R$ -{totalPerDay(date).toFixed(2)}
                </Text>
              </View>
              <FlatList
                data={getSpentsByDay(date)}
                renderItem={({ item }) => (
                  <View style={styles.card} key={item.id}>
                    <View style={styles.cardStart}>
                      <Text style={styles.cardIcon}>{item.icon}</Text>
                      <View style={styles.cardStartText}>
                        <Text style={styles.cardSpent}>{item.type}</Text>
                        <Text style={styles.cardTime}>
                          {convertToTime(item.created_at)}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.cardEnd}>
                      <Text style={styles.cardValue}>
                        R$ -{item.value.toFixed(2)}
                      </Text>
                    </View>
                  </View>
                )}
                keyExtractor={(item) => item.id}
                scrollEnabled={false}
              />
              {index < uniqueDays.length - 1 && (
                <View style={styles.separator}></View>
              )}
            </View>
          ))
        ) : (
          <View style={styles.noSpentsView}>
            <Text style={styles.noSpentsText}>
              Você não possui nenhum gasto!
            </Text>
          </View>
        )}
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
    marginBottom: 100,
  },
  monthSpentText: {
    color: "#3A3B3C",
    fontSize: 15,
  },
  monthTotalView: {
    marginTop: 8,
    flexDirection: "row",
  },
  currencySymbol: {
    fontSize: 35,
    marginTop: 6,
    color: "#d80000",
  },
  dash: {
    fontSize: 35,
    marginTop: 6,
    color: "#d80000",
  },
  totalInteger: {
    fontSize: 50,
    color: "#d80000",
  },
  cents: {
    fontSize: 35,
    marginTop: 6,
    color: "#d80000",
  },
  today: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 16,
  },
  todayText: {
    fontSize: 16,
    color: "#8C8C8C",
  },
  card: {
    padding: 16,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardIcon: {
    fontSize: 30,
  },
  cardStart: {
    width: "50%",
    flexDirection: "row",
  },
  cardStartText: {
    marginLeft: 15,
    justifyContent: "space-between",
  },
  cardSpent: {
    fontSize: 16,
  },
  cardTime: {
    fontSize: 14,
    color: "#8C8C8C",
  },
  cardEnd: {
    paddingRight: 2,
  },
  cardValue: {
    color: "red",
  },
  separator: {
    borderWidth: 1,
    marginHorizontal: 30,
    marginVertical: 20,
    borderColor: "#E5E7EB",
  },
  noSpentsView: {
    alignItems: "center",
    marginTop: 64,
  },
  noSpentsText: {
    color: "#d80000",
  },
});

export default HomeScreen;
