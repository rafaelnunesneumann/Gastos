import React, { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import FirstModal from "./components/HomeScreen/FirstModal";
import TagModal from "./components/HomeScreen/TagModal";
import AddTagModal from "./components/HomeScreen/AddTagModal";
import ConfirmModal from "./components/HomeScreen/ConfirmModal";

const CreateScreen = ({ navigation }: any) => {
  const [modalVisible, setModalVisible] = useState(true);
  const [tagModalVisible, setTagModalVisible] = useState(false);
  const [addTagModalVisible, setAddTagModalVisible] = useState(false);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [expenseType, setExpenseType] = useState(null);
  const [amount, setAmount] = useState(0);
  const isFocused = useIsFocused();

  useEffect(() => {
    setModalVisible(isFocused ? true : false);
  }, [isFocused]);

  return (
    <>
      <FirstModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        setTagModalVisible={setTagModalVisible}
        expenseType={expenseType}
        navigation={navigation}
        setAmount={setAmount}
        amount={amount}
        setConfirmModalVisible={setConfirmModalVisible}
      >
        <TagModal
          modalVisible={tagModalVisible}
          setModalVisible={setTagModalVisible}
          setAddTagModalVisible={setAddTagModalVisible}
          setExpenseType={setExpenseType}
        >
          <AddTagModal
            modalVisible={addTagModalVisible}
            setModalVisible={setAddTagModalVisible}
          />
        </TagModal>
        <ConfirmModal
          modalVisible={confirmModalVisible}
          setModalVisible={setConfirmModalVisible}
          setFirstModalVisible={setModalVisible}
          expenseType={expenseType}
          amount={amount}
          navigation={navigation}
        />
      </FirstModal>
    </>
  );
};

export default CreateScreen;
