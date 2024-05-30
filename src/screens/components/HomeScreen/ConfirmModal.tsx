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
          <View style={styles.header}>
            <Text style={styles.headerText}>Confirmar</Text>
          </View>
          <View style={styles.content}>
            <View style={styles.iconContainer}>
              <Icon name="lock" size={15} color={"#6B7280"} />
            </View>
            <Text style={styles.descriptionText}>
              Ajude-nos a garantir a precisão revisando suas despesas antes de
              confirmá-las, pois você não poderá editá-las posteriormente.
            </Text>
          </View>
          <View style={styles.amountContainer}>
            <Text style={styles.amountText}>R$ {amount.toFixed(2)}</Text>
            <Icon2 name="arrowdown" size={30} />
            {expenseType ? (
              <Text style={styles.expenseTypeText}>
                {expenseType.emoji} {expenseType.name}
              </Text>
            ) : null}
          </View>
          <View style={styles.buttonsContainer}>
            <Button
              buttonStyle={styles.cancelButton}
              textButton="Cancelar"
              textStyle={styles.buttonText}
              onPress={() => setModalVisible(false)}
            />
            <Button
              buttonStyle={styles.confirmButton}
              textButton="Confirmar"
              textStyle={styles.confirmButtonText}
              onPress={async () => {
                await addSpent(amount, expenseType.name, expenseType.emoji);
                setFirstModalVisible(false);
                setModalVisible(false);
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
  header: {
    width: "100%",
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 20,
  },
  content: {
    width: "100%",
    marginTop: 20,
    flexDirection: "row",
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "space-between",
  },
  iconContainer: {
    backgroundColor: "#D1D5DB",
    padding: 10,
    borderRadius: 100,
  },
  descriptionText: {
    color: "#6B7280",
    fontWeight: "400",
  },
  amountContainer: {
    flex: 0.5,
    alignItems: "center",
    justifyContent: "space-between",
    width: "85%",
  },
  amountText: {
    fontSize: 30,
    fontWeight: "bold",
  },
  expenseTypeText: {
    fontSize: 30,
  },
  buttonsContainer: {
    width: "100%",
    flex: 0.5,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cancelButton: {
    backgroundColor: "#FECACA",
    width: "49%",
    alignItems: "center",
    paddingVertical: 20,
    borderRadius: 5,
  },
  confirmButton: {
    backgroundColor: "black",
    width: "49%",
    alignItems: "center",
    paddingVertical: 20,
    borderRadius: 5,
  },
  buttonText: {
    fontWeight: "bold",
  },
  confirmButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default ConfirmModal;
