import React from "react";
import { Platform, StyleSheet } from "react-native";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import Header from "../components/Header";
import { useSpents } from "../context/SpentContext";
import Chart from "./components/AnalyticsScreen/BarChart";
import {
  eachDayOfInterval,
  startOfMonth,
  endOfMonth,
  format,
  parse,
} from "date-fns";
import { ptBR } from "date-fns/locale";
import moment from "moment";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import Icon2 from "react-native-vector-icons/AntDesign";

const AnalyticsScreen = () => {
  const { monthSpents } = useSpents();

  interface Spent {
    created_at: string;
    icon: string;
    id: string;
    type: string;
    userId: string;
    value: number;
  }

  interface TypeCount {
    type: string;
    count: number;
    icon: string;
    totalValue: number;
  }

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

  const getSpentsByDay = (date: string): number => {
    const data = monthSpents.filter((obj) => {
      return (
        Number.parseInt(moment(obj.created_at).format("DD")).toString() == date
      );
    });
    let amount = 0;
    data.map((item) => {
      amount += item.value;
    });
    return amount;
  };

  const getDayWithHighestSpending = (
    transactions: Spent[]
  ): { date: string; totalValue: number } | null => {
    const spendingByDay: { [key: string]: number } = {};

    transactions.forEach((transaction) => {
      const date = transaction.created_at.split("T")[0];
      if (!spendingByDay[date]) {
        spendingByDay[date] = 0;
      }
      spendingByDay[date] += transaction.value;
    });

    let maxDate = null;
    let maxSpending = 0;

    for (const date in spendingByDay) {
      if (spendingByDay[date] > maxSpending) {
        maxSpending = spendingByDay[date];
        maxDate = date;
      }
    }

    return maxDate ? { date: maxDate, totalValue: maxSpending } : null;
  };

  const getTypeWithMostEntries = (transactions: Spent[]): TypeCount | null => {
    const typeCounts: {
      [key: string]: { count: number; totalValue: number; icon: string };
    } = {};

    transactions.forEach((transaction) => {
      if (!typeCounts[transaction.type]) {
        typeCounts[transaction.type] = {
          count: 0,
          totalValue: 0,
          icon: transaction.icon,
        };
      }
      typeCounts[transaction.type].count += 1;
      typeCounts[transaction.type].totalValue += transaction.value;
    });

    let maxType = null;
    let maxCount = 0;

    for (const type in typeCounts) {
      if (typeCounts[type].count > maxCount) {
        maxCount = typeCounts[type].count;
        maxType = type;
      }
    }

    return maxType
      ? {
          type: maxType,
          count: maxCount,
          icon: typeCounts[maxType].icon,
          totalValue: typeCounts[maxType].totalValue,
        }
      : null;
  };

  const formatDate = (dateString: string): string => {
    const date = parse(dateString, "yyyy-MM-dd", new Date());
    return format(date, "dd MMM yyyy", { locale: ptBR });
  };

  interface BarData {
    frontColor?: string;
    value: number;
    label: string;
  }

  const generateBarData = (): BarData[] => {
    const today = new Date();
    const start = startOfMonth(today);
    const end = endOfMonth(today);
    const days = eachDayOfInterval({ start, end });

    return days.map((day) => {
      const value = getSpentsByDay(format(day, "d"));
      const barData: BarData = {
        value,
        label: format(day, "d"),
      };

      if (value === 0) {
        barData.frontColor = "gray";
      }

      return barData;
    });
  };

  const barData = generateBarData();
  const highestSpent = getDayWithHighestSpending(monthSpents);
  const mostEntrys = getTypeWithMostEntries(monthSpents);

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
              flex: 1,
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
          <View
            style={{
              backgroundColor: "#F8FAFC",
              marginTop: 40,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 10,
              borderRadius: 10,
              elevation: 5,
              shadowOpacity: 0.2,
              shadowOffset: {
                width: 3,
                height: 2,
              },
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <View
                style={{
                  backgroundColor: "#FEF08A",
                  padding: 5,
                  borderRadius: 100,
                }}
              >
                <Icon name="graph" size={25} />
              </View>
              <View style={{ marginLeft: 10 }}>
                <Text style={{ fontSize: 15, fontWeight: "500" }}>
                  Maior gasto
                </Text>
                <Text
                  style={{ fontSize: 14, fontWeight: "500", color: "#6B7280" }}
                >
                  {formatDate(highestSpent?.date.toString() || "")}
                </Text>
              </View>
            </View>
            <Text style={{ color: "#d80000", fontWeight: "500" }}>
              R$ -{highestSpent?.totalValue.toFixed(2)}
            </Text>
          </View>

          <View
            style={{
              backgroundColor: "#F8FAFC",
              marginTop: 20,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 10,
              borderRadius: 10,
              elevation: 5,
              shadowOpacity: 0.2,
              shadowOffset: {
                width: 3,
                height: 2,
              },
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <View
                style={{
                  backgroundColor: "#FEF08A",
                  padding: 5,
                  borderRadius: 100,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Icon2 name="tag" size={25} />
              </View>
              <View style={{ marginLeft: 10 }}>
                <Text style={{ fontSize: 15, fontWeight: "500" }}>
                  Maior entrada
                </Text>
                <Text
                  style={{ fontSize: 14, fontWeight: "500", color: "#6B7280" }}
                >
                  {mostEntrys?.count} em {mostEntrys?.icon} {mostEntrys?.type}
                </Text>
              </View>
            </View>
            <Text style={{ color: "#d80000", fontWeight: "500" }}>
              R$ -{mostEntrys?.totalValue.toFixed(2)}
            </Text>
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
