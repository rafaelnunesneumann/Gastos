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

interface BarData {
  frontColor?: string;
  value: number;
  label: string;
}

const AnalyticsScreen: React.FC = () => {
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

  const getTypeCounts = (monthSpents: Spent[]): TypeCount[] => {
    const typeMap: Map<string, TypeCount> = new Map();

    monthSpents.forEach((spent) => {
      const { type, value, icon } = spent;
      if (typeMap.has(type)) {
        const typeCount = typeMap.get(type)!;
        typeCount.count += 1;
        typeCount.totalValue += value;
      } else {
        typeMap.set(type, {
          type,
          count: 1,
          icon,
          totalValue: value,
        });
      }
    });

    const typeCountsArray = Array.from(typeMap.values());

    typeCountsArray.sort((a, b) => b.count - a.count);

    return typeCountsArray;
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

    let maxDate: string | null = null;
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

    let maxType: string | null = null;
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
  const typeCounts = getTypeCounts(monthSpents);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      {monthSpents.length > 0 ? (
        <ScrollView
          style={styles.container}
          bounces={false}
          showsVerticalScrollIndicator={false}
        >
          <Header>GASTOS</Header>
          <View style={styles.content}>
            <View style={styles.monthTotalView}>
              <Text style={styles.currencySymbol}>R$</Text>
              <Text style={styles.minusSign}>-</Text>
              <Text style={styles.totalInteger}>{totalInteger()}</Text>
              <Text style={styles.totalCents}>.{totalCents()}</Text>
            </View>
            <Text style={styles.totalText}>Total gasto por dia esse mês:</Text>
            <View style={styles.chartContainer}>
              <Chart data={barData} />
            </View>
            <View style={styles.spendingInfo}>
              <View style={styles.spendingInfoContent}>
                <View style={styles.iconContainer}>
                  <Icon name="graph" size={25} />
                </View>
                <View style={styles.spendingInfoText}>
                  <Text style={styles.infoTitle}>Maior gasto</Text>
                  <Text style={styles.infoSubtitle}>
                    {formatDate(highestSpent?.date.toString() || "")}
                  </Text>
                </View>
              </View>
              <Text style={styles.spendingAmount}>
                R$ -{highestSpent?.totalValue.toFixed(2)}
              </Text>
            </View>

            <View style={styles.entryInfo}>
              <View style={styles.entryInfoContent}>
                <View style={styles.iconContainer}>
                  <Icon2 name="tag" size={25} />
                </View>
                <View style={styles.entryInfoText}>
                  <Text style={styles.infoTitle}>Maior entrada</Text>
                  <Text style={styles.infoSubtitle}>
                    {mostEntrys?.count} em {mostEntrys?.icon} {mostEntrys?.type}
                  </Text>
                </View>
              </View>
              <Text style={styles.entryAmount}>
                R$ -{mostEntrys?.totalValue.toFixed(2)}
              </Text>
            </View>

            {typeCounts.map((item, index) => {
              return (
                <View key={index}>
                  <View style={styles.typeInfo}>
                    <View style={styles.typeInfoContent}>
                      <View style={styles.typeIcon}>
                        <Text style={styles.typeIconText}>{item.icon}</Text>
                      </View>
                      <View style={styles.typeInfoText}>
                        <Text style={styles.infoTitle}>{item.type}</Text>
                        <Text style={styles.infoSubtitle}>
                          {item.count} entrada
                        </Text>
                      </View>
                    </View>
                    <Text style={styles.typeAmount}>
                      R$ -{item.totalValue.toFixed(2)}
                    </Text>
                  </View>
                  {index < typeCounts.length - 1 && (
                    <View style={styles.separator}></View>
                  )}
                </View>
              );
            })}
          </View>
        </ScrollView>
      ) : (
        <View style={styles.noSpendingView}>
          <Text style={styles.noSpendingText}>
            Você não possui nenhum gasto!
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === "android" ? 60 : 10,
    backgroundColor: "#fff",
  },
  content: {
    paddingHorizontal: 20,
  },
  monthTotalView: {
    marginTop: 60,
    flexDirection: "row",
  },
  currencySymbol: {
    fontSize: 35,
    marginTop: 6,
    color: "#d80000",
  },
  minusSign: {
    fontSize: 35,
    marginTop: 6,
    color: "#d80000",
  },
  totalInteger: {
    fontSize: 50,
    color: "#d80000",
  },
  totalCents: {
    fontSize: 35,
    marginTop: 6,
    color: "#d80000",
  },
  totalText: {
    fontSize: 16,
    color: "#6B7280",
  },
  chartContainer: {
    marginTop: 30,
    flex: 1,
    elevation: 5,
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 2,
      height: 0,
    },
  },
  spendingInfo: {
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
  },
  spendingInfoContent: {
    flexDirection: "row",
  },
  iconContainer: {
    backgroundColor: "#FEF08A",
    padding: 5,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  spendingInfoText: {
    marginLeft: 10,
  },
  infoTitle: {
    fontSize: 15,
    fontWeight: "500",
  },
  infoSubtitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#6B7280",
  },
  spendingAmount: {
    color: "#d80000",
    fontWeight: "500",
  },
  entryInfo: {
    backgroundColor: "#F8FAFC",
    marginTop: 20,
    marginBottom: 20,
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
  },
  entryInfoContent: {
    flexDirection: "row",
  },
  entryInfoText: {
    marginLeft: 10,
  },
  entryAmount: {
    color: "#d80000",
    fontWeight: "500",
  },
  typeInfo: {
    backgroundColor: "white",
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
  },
  typeInfoContent: {
    flexDirection: "row",
  },
  typeIcon: {
    alignItems: "center",
    justifyContent: "center",
  },
  typeIconText: {
    fontSize: 25,
  },
  typeInfoText: {
    marginLeft: 10,
  },
  typeAmount: {
    color: "#d80000",
    fontWeight: "500",
  },
  separator: {
    borderWidth: 1,
    width: "80%",
    alignSelf: "center",
    marginTop: 20,
    borderColor: "#E5E7EB",
  },
  noSpendingView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  noSpendingText: {
    color: "red",
    fontSize: 20,
  },
});

export default AnalyticsScreen;
