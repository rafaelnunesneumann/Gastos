import { BlurView } from "expo-blur";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  StyleSheet,
  Text,
  View,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import Button from "../../../components/Button";
import MyTextInput from "../../../components/MyTextInput";
import { useExpenses } from "../../../context/ExpensesContext";
import emojiRegex from "emoji-regex";

interface TagModalProps {
  modalVisible: boolean;
  setModalVisible: Function;
}

const AddTagModal = ({ modalVisible, setModalVisible }: TagModalProps) => {
  const [emoji, setEmoji] = useState("");
  const [name, setName] = useState("");
  const { addExpense } = useExpenses();

  function isSingleEmoji(str: string) {
    const regex = emojiRegex();
    return regex.test(str);
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false);
      }}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.modalBackground}>
          <BlurView
            intensity={15}
            style={styles.absolute}
            tint="light"
            experimentalBlurMethod="none"
          />
          <View style={styles.modalContainer}>
            <View style={styles.headerContainer}>
              <View style={styles.backButtonContainer}>
                <Button
                  buttonStyle={styles.backButton}
                  icon={<Icon name="arrow-left" size={25} />}
                  onPress={() => {
                    setEmoji("");
                    setName("");
                    setModalVisible(false);
                  }}
                />
              </View>
              <Text style={styles.headerText}>NOVO TIPO</Text>
            </View>
            <View style={styles.contentContainer}>
              <MyTextInput
                inputStyle={styles.textInput}
                placeholder="🏠 (emoji)"
                textAlign={"center"}
                onChangeText={(value) => {
                  if (isSingleEmoji(value)) {
                    setEmoji(value);
                  } else {
                    setEmoji("");
                  }
                }}
                value={emoji}
              />
              <MyTextInput
                inputStyle={styles.textInput}
                placeholder="despesa (nome)"
                textAlign={"center"}
                onChangeText={(value) => {
                  if (value.length > 9) {
                    setName("");
                  } else {
                    setName(value);
                  }
                }}
                value={name}
                autoCapitalize={"words"}
              />
              <Button
                buttonStyle={styles.confirmButton}
                textButton="Confirmar"
                textStyle={styles.confirmButtonText}
                onPress={() => {
                  if (emoji && name) {
                    addExpense({ emoji, name });
                    setModalVisible(false);
                    setEmoji("");
                    setName("");
                  }
                }}
              />
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
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
    height: "60%",
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
  headerContainer: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
  },
  backButtonContainer: {
    paddingVertical: 8,
    alignSelf: "flex-start",
  },
  backButton: {
    alignSelf: "flex-start",
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#636363",
    flex: 1,
    textAlign: "center",
  },
  contentContainer: {
    flex: 0.8,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    marginTop: 30,
    width: "40%",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderColor: "#949494",
  },
  confirmButton: {
    backgroundColor: "black",
    marginTop: 30,
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
  },
  confirmButtonText: {
    color: "white",
  },
});

export default AddTagModal;
