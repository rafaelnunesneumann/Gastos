import React, { useRef, useState } from "react";
import {
  TextInput,
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from "react-native";

interface InputProps {
  inputStyle: StyleProp<ViewStyle>;
  placeholder: string;
  onSelectStyle: StyleProp<ViewStyle>;
  onChangeText?: ((text: string) => void) | undefined;
}

const MyTextInput: React.FC<InputProps> = ({
  inputStyle,
  placeholder,
  onSelectStyle,
  onChangeText
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
        onChangeText={onChangeText}
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
