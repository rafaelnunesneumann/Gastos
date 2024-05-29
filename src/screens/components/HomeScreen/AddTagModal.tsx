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

interface TagModalProps {
  modalVisible: boolean;
  setModalVisible: Function;
}

const AddTagModal = ({ modalVisible, setModalVisible }: TagModalProps) => {
  const [emoji, setEmoji] = useState("");
  const [name, setName] = useState("");
  const { addExpense } = useExpenses();

  function isSingleEmoji(str: string): boolean {
    const emojiRegex =
      /^(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])$/;
    return emojiRegex.test(str);
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
                  onPress={() => setModalVisible(false)}
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
