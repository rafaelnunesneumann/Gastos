import { BlurView } from "expo-blur";
import React from "react";
import { Modal, StyleSheet, Text, View } from "react-native";
import Button from "../../../components/Button";
import Icon from "react-native-vector-icons/AntDesign";
import Icon2 from "react-native-vector-icons/Feather";
import { useExpenses } from "../../../context/ExpensesContext";

interface TagModalProps {
  modalVisible: boolean;
  setModalVisible: Function;
  setAddTagModalVisible: Function;
  setExpenseType: Function;
  children?: React.ReactNode;
}

const TagModal = ({
  modalVisible,
  setModalVisible,
  children,
  setAddTagModalVisible,
  setExpenseType,
}: TagModalProps) => {
  const { expenses } = useExpenses();
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
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              alignItems: "center",
            }}
          >
            <View
              style={{
                paddingVertical: 8,
                alignSelf: "flex-start",
              }}
            >
              <Button
                buttonStyle={{ alignSelf: "flex-start" }}
                icon={<Icon2 name="arrow-left" size={25} />}
                onPress={() => setModalVisible(false)}
              />
            </View>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 16,
                color: "#636363",
                flex: 1,
                textAlign: "center",
              }}
            >
              TIPO DO GASTO
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <Button
              buttonStyle={styles.button}
              icon={<Icon name="plus" size={25} />}
              onPress={() => setAddTagModalVisible(true)}
            />
            {expenses.map((expense) => {
              return (
                <Button
                  key={expense.name}
                  buttonStyle={styles.expenseButton}
                  textButton={expense.emoji + `\n${expense.name}`}
                  textStyle={{
                    textAlign: "center",
                    width: 80,
                  }}
                  onPress={() => {
                    setExpenseType(expense);
                    setModalVisible(false);
                  }}
                />
              );
            })}
          </View>
        </View>
      </View>
      {children}
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
  buttonContainer: {
    width: "100%",
    marginTop: 20,
    flex: 1,
    flexWrap: "wrap",
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    flexBasis: "12%",
    margin: "4%",
    paddingVertical: 8,
    borderRadius: 100,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  expenseButton: {
    flexBasis: "12%",
    margin: "4%",
    paddingVertical: 12,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default TagModal;
