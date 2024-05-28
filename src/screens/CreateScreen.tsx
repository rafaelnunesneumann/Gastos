import React, { useEffect, useState } from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Text,
  Platform,
  FlatList,
  Modal,
} from "react-native";
import Header from "../components/Header";
import { useSpents } from "../context/SpentContext";
import { BlurView } from "expo-blur";
import { useIsFocused } from "@react-navigation/native";
import MyTextInput from "../components/MyTextInput";
import Button from "../components/Button";

function convertToTime(isoString: string): string {
  const date = new Date(isoString);
  const options: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };
  return date.toLocaleTimeString("en-GB", options);
}

const CreateScreen = ({ navigation }: any) => {
  const { spents } = useSpents();
  const [modalVisible, setModalVisible] = useState(true);
  const isFocused = useIsFocused();

  useEffect(() => {
    setModalVisible(isFocused ? true : false);
  }, [isFocused]);

  const totalSpents = (): string => {
    let total = 0;
    spents.map((value) => {
      total += value.value;
    });
    return total.toFixed(2);
  };

  const totalInteger = (): number => {
    let total = 0;
    spents.map((value) => {
      total += value.value;
    });
    return ~~total;
  };

  const totalCents = (): string => {
    let total = 0;
    spents.map((value) => {
      total += value.value;
    });
    const output = total.toFixed(2).toString().split(".")[1];
    return output;
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.modalBackground}>
          <BlurView intensity={50} style={styles.absolute} tint="light" />
          <View style={styles.modalContainer}>
            <Text style={{ color: "#636363" }}>Hoje - 27/05/2024</Text>
            <MyTextInput
              inputStyle={[
                {
                  marginTop: 10,
                  width: "50%",
                  alignItems: "center",
                  justifyContent: "center",
                  borderBottomWidth: 1,
                  borderColor: "#949494",
                },
              ]}
              placeholder="0"
              autoComplete={"cc-number"}
              textAlign={"center"}
              fontSize={40}
            />
            <View
              style={{
                marginTop: 40,
                width: "65%",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Button
                buttonStyle={{
                  backgroundColor: "red",
                  paddingHorizontal: 4,
                  paddingVertical: 12,
                  width: "45%",
                  alignItems: "center",
                  borderRadius: 8,
                }}
                textButton="Cancelar"
                textStyle={{}}
                onPress={() => {
                  setModalVisible(false);
                  navigation.navigate("Home");
                }}
              />
              <Button
                buttonStyle={{
                  backgroundColor: "green",
                  paddingHorizontal: 4,
                  paddingVertical: 12,
                  width: "45%",
                  alignItems: "center",
                  borderRadius: 8,
                }}
                textButton="Criar"
                textStyle={{}}
              />
            </View>
          </View>
        </View>
      </Modal>
      <ScrollView
        style={styles.container}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
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
            <Text style={{ fontSize: 50, color: "#d80000" }}>
              {totalInteger()}
            </Text>
            <Text style={{ fontSize: 35, marginTop: 6, color: "#d80000" }}>
              .{totalCents()}
            </Text>
          </View>
        </View>

        <View style={styles.today}>
          <Text style={styles.todayText}>Hoje</Text>
          <Text style={styles.todayText}>R$ -{totalSpents()}</Text>
        </View>

        {spents.length > 0 ? (
          <FlatList
            data={spents}
            renderItem={({ item }) => (
              <View style={styles.card} key={item.id}>
                <View style={styles.cardStart}>
                  <Text style={styles.cardIcon}>⛽</Text>
                  <View style={styles.cardStartText}>
                    <Text style={styles.cardSpent}>{item.type}</Text>
                    <Text style={styles.cardTime}>
                      {convertToTime(item.created_at)}
                    </Text>
                  </View>
                </View>
                <View style={styles.cardEnd}>
                  <Text style={styles.cardValue}>R$ -{item.value}</Text>
                </View>
              </View>
            )}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
          />
        ) : (
          <View style={{ alignItems: "center", marginTop: 64 }}>
            <Text style={{ color: "#d80000" }}>
              Você nao possui nenhum gasto!
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
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255, 0.3)",
  },
  modalContainer: {
    width: 300,
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

export default CreateScreen;
