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
  onSelectStyle?: StyleProp<ViewStyle>;
  onChangeText?: ((text: string) => void) | undefined;
  autoComplete?: any;
  inputMode?: any;
  secureTextEntry?: any;
  value?: any;
  textAlign?: any;
  fontSize?: number;
  autoCapitalize?: any;
}

const MyTextInput: React.FC<InputProps> = ({
  inputStyle,
  placeholder,
  onSelectStyle,
  onChangeText,
  autoComplete = "off",
  inputMode = "text",
  secureTextEntry = false,
  value,
  textAlign,
  fontSize,
  autoCapitalize,
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
        style={[
          inputStyle,
          isFocused && onSelectStyle ? onSelectStyle : null,
          { fontSize: fontSize },
        ]}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholder}
        onChangeText={onChangeText}
        autoComplete={autoComplete}
        autoCapitalize={autoCapitalize}
        inputMode={inputMode}
        secureTextEntry={secureTextEntry}
        value={value}
        textAlign={textAlign}
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
