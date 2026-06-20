import {
    StyleSheet,
    TextInput,
    TextInputProps,
} from "react-native";

export function Input({
  style,
  ...rest
}: TextInputProps) {
  return (
    <TextInput
      style={[styles.Input, style]}
      placeholderTextColor="#000"
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  Input: {
    height: 48,
    width: "100%",

    borderWidth: 1.2,
    borderColor: "#D1D5DB",
    borderRadius: 12,

    fontSize: 16,
    paddingLeft: 16,

    color: "#000000",
  },
});