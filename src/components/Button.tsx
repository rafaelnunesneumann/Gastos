import React from "react";
import {
  TouchableOpacity,
  ViewStyle,
  StyleProp,
  Text,
  TextStyle,
} from "react-native";

interface ButtonProps {
  buttonStyle: StyleProp<ViewStyle>;
  textButton: String;
  textStyle: StyleProp<TextStyle>;
}

const Button: React.FC<ButtonProps> = ({
  buttonStyle,
  textButton,
  textStyle,
}) => {
  return (
    <TouchableOpacity style={buttonStyle}>
      <Text style={textStyle}>{textButton}</Text>
    </TouchableOpacity>
  );
};

export default Button;
