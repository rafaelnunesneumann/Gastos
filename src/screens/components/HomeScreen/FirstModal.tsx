import { BlurView } from "expo-blur";
import React from "react";
import {
  Keyboard,
  Modal,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import MyTextInput from "../../../components/MyTextInput";
import Icon from "react-native-vector-icons/AntDesign";
import Button from "../../../components/Button";

interface FirstModalProps {
  modalVisible: boolean;
  setModalVisible: Function;
  setTagModalVisible: Function;
  expenseType: any;
  navigation: any;
  children?: React.ReactNode;
}

const FirstModal = ({
  modalVisible,
  setModalVisible,
  setTagModalVisible,
  expenseType,
  navigation,
  children,
}: FirstModalProps) => {
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
        <BlurView intensity={30} style={styles.absolute} tint="light" />
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.modalContainer}>
            <Text style={styles.dateText}>Hoje - 27/05/2024</Text>
            <MyTextInput
              inputStyle={styles.textInput}
              placeholder="R$ 0"
              autoComplete={"cc-number"}
              textAlign={"center"}
              fontSize={40}
            />
            <Icon
              name="arrowdown"
              size={30}
              style={styles.iconArrowDown}
              color={"#949494"}
            />
            <View style={styles.iconRow}>
              {expenseType ? null : (
                <Icon name="tagso" size={20} color={"#949494"} />
              )}
              <Button
                buttonStyle={styles.selectButton}
                textButton={
                  expenseType
                    ? `${expenseType.emoji} ${expenseType.name}`
                    : "selecione o tipo"
                }
                textStyle={
                  expenseType
                    ? { color: "#949494", fontSize: 20 }
                    : styles.selectButtonText
                }
                onPress={() => setTagModalVisible(true)}
              />
            </View>
            <View style={styles.buttonRow}>
              <Button
                buttonStyle={[styles.button, styles.cancelButton]}
                textButton="Cancelar"
                textStyle={{}}
                onPress={() => {
                  setModalVisible(false);
                  navigation.navigate("Home");
                }}
              />
              <Button
                buttonStyle={[styles.button, styles.createButton]}
                textButton="Criar"
                textStyle={styles.createButtonText}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
      {children}
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255, 0.3)",
  },
  modalContainer: {
    width: "100%",
    flex: 1,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  dateText: {
    color: "#636363",
  },
  textInput: {
    marginTop: 10,
    width: "40%",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderColor: "#949494",
  },
  iconArrowDown: {
    marginTop: 20,
  },
  iconRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  selectButton: {
    paddingVertical: 10,
    alignItems: "center",
    paddingLeft: 10,
  },
  selectButtonText: {
    color: "#949494",
  },
  buttonRow: {
    marginTop: 40,
    width: "55%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    paddingHorizontal: 4,
    paddingVertical: 12,
    width: "45%",
    alignItems: "center",
    borderRadius: 8,
  },
  cancelButton: {
    backgroundColor: "#F8C5C7",
  },
  createButton: {
    backgroundColor: "black",
  },
  createButtonText: {
    color: "white",
  },
});

export default FirstModal;
