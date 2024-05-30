import { BlurView } from "expo-blur";
import React from "react";
import { Modal, StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import Icon2 from "react-native-vector-icons/AntDesign";
import Button from "../../../components/Button";
import SpentControl from "../../../hooks/SpentControl";

interface TagModalProps {
  modalVisible: boolean;
  setModalVisible: Function;
  setFirstModalVisible: Function;
  expenseType: any;
  amount: number;
  navigation: any;
}

const ConfirmModal = ({
  modalVisible,
  setModalVisible,
  setFirstModalVisible,
  expenseType,
  amount,
  navigation,
}: TagModalProps) => {
  const { addSpent } = SpentControl();
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false);
      }}
    >
      <View style={styles.modalBackground}>
        <BlurView
          intensity={15}
          style={styles.absolute}
          tint="light"
          experimentalBlurMethod="none"
        />
        <View style={styles.modalContainer}>
          <View style={{ width: "100%" }}>
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>Confirmar</Text>
          </View>
          <View
            style={{
              width: "100%",
              marginTop: 20,
              flexDirection: "row",
              paddingVertical: 20,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                backgroundColor: "#D1D5DB",
                padding: 10,
                borderRadius: 100,
              }}
            >
              <Icon name="lock" size={15} color={"#6B7280"} />
            </View>
            <Text style={{ color: "#6B7280", fontWeight: "400" }}>
              Ajude-nos a garantir a precisão revisando suas despesas antes de
              confirmá-las, pois você não poderá editá-las posteriormente.
            </Text>
          </View>
          <View
            style={{
              flex: 0.5,
              alignItems: "center",
              justifyContent: "space-between",
              width: "85%",
            }}
          >
            <Text style={{ fontSize: 30, fontWeight: "bold" }}>
              R$ {amount.toFixed(2)}
            </Text>
            <Icon2 name="arrowdown" size={30} />
            {expenseType ? (
              <Text style={{ fontSize: 30 }}>
                {expenseType.emoji} {expenseType.name}
              </Text>
            ) : null}
          </View>
          <View
            style={{
              width: "100%",
              flex: 0.5,
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Button
              buttonStyle={{
                backgroundColor: "#FECACA",
                width: "49%",
                alignItems: "center",
                paddingVertical: 20,
                borderRadius: 5,
              }}
              textButton="Cancelar"
              textStyle={{ fontWeight: "bold" }}
              onPress={() => setModalVisible(false)}
            />
            <Button
              buttonStyle={{
                backgroundColor: "black",
                width: "49%",
                alignItems: "center",
                paddingVertical: 20,
                borderRadius: 5,
              }}
              textButton="Confirmar"
              textStyle={{ color: "white", fontWeight: "bold" }}
              onPress={async () => {
                await addSpent(amount, expenseType.name, expenseType.emoji);
                setModalVisible(false);
                setFirstModalVisible(false);
                const reloadParam = Math.random().toString();
                navigation.navigate("Home", { reload: reloadParam });
              }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255, 0.3)",
  },
  modalContainer: {
    width: "100%",
    height: "50%",
    padding: 20,
    borderRadius: 20,
    alignItems: "center",
    backgroundColor: "white",
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 4,
  },
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

export default ConfirmModal;
