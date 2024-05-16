import React from "react";
import {
  TouchableOpacity,
  ViewStyle,
  StyleProp,
  Text,
  TextStyle,
  GestureResponderEvent,
  ActivityIndicator,
} from "react-native";

interface ButtonProps {
  buttonStyle: StyleProp<ViewStyle>;
  textButton: string;
  textStyle: StyleProp<TextStyle>;
  isLoading?: boolean
  onPress?: (event: GestureResponderEvent) => void;
}

const Button: React.FC<ButtonProps> = ({
  buttonStyle,
  textButton,
  textStyle,
  isLoading,
  onPress,
}) => {
  return (
    <TouchableOpacity style={buttonStyle} onPress={onPress}>
      {isLoading ? <ActivityIndicator /> : <Text style={textStyle}>{textButton}</Text>}
    </TouchableOpacity>
  );
};

export default Button;
