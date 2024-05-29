import React, { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import HomeScreen from "./HomeScreen";
import FirstModal from "./components/HomeScreen/FirstModal";
import TagModal from "./components/HomeScreen/TagModal";

const CreateScreen = ({ navigation }: any) => {
  const [modalVisible, setModalVisible] = useState(true);
  const [tagModalVisible, setTagModalVisible] = useState(false);
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
        navigation={navigation}
      >
        <TagModal
          modalVisible={tagModalVisible}
          setModalVisible={setTagModalVisible}
        />
      </FirstModal>
      <HomeScreen />
    </>
  );
};

export default CreateScreen;
