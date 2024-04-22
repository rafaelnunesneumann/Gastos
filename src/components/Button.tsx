import React from "react";
import {
  TouchableOpacity,
  ViewStyle,
  StyleProp,
  Text,
  TextStyle,
  GestureResponderEvent,
} from "react-native";

interface ButtonProps {
  buttonStyle: StyleProp<ViewStyle>;
  textButton: string;
  textStyle: StyleProp<TextStyle>;
  onPress?: (event: GestureResponderEvent) => void;
}

const Button: React.FC<ButtonProps> = ({
  buttonStyle,
  textButton,
  textStyle,
  onPress,
}) => {
  return (
    <TouchableOpacity style={buttonStyle} onPress={onPress}>
      <Text style={textStyle}>{textButton}</Text>
    </TouchableOpacity>
  );
};

export default Button;
