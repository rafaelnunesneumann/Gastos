import React, { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import HomeScreen from "./HomeScreen";
import FirstModal from "./components/HomeScreen/FirstModal";
import TagModal from "./components/HomeScreen/TagModal";
import AddTagModal from "./components/HomeScreen/AddTagModal";

const CreateScreen = ({ navigation }: any) => {
  const [modalVisible, setModalVisible] = useState(true);
  const [tagModalVisible, setTagModalVisible] = useState(false);
  const [addTagModalVisible, setAddTagModalVisible] = useState(false);
  const [expenseType, setExpenseType] = useState(null);
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
      </FirstModal>
      <HomeScreen />
    </>
  );
};

export default CreateScreen;
