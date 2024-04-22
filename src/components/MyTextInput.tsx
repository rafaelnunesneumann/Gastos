import React, { useRef, useState } from "react";
import {
  TextInput,
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";

interface InputProps {
  inputStyle: StyleProp<ViewStyle>;
  placeholder: string;
  onSelectStyle: StyleProp<ViewStyle>;
}

const MyTextInput: React.FC<InputProps> = ({
  inputStyle,
  placeholder,
  onSelectStyle,
}) => {
  const textInputRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <View style={styles.container}>
      <TextInput
        ref={textInputRef}
        style={[inputStyle, isFocused ? onSelectStyle : null]}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholder}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MyTextInput;
