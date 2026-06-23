import {
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
} from "react-native";

type ButtonProps = PressableProps & {
  label: string;
  cor?: string;
};

export function Button({
  label,
  cor = "#3366FF",
  ...rest
}: ButtonProps) {

  return (
    <Pressable
      style={({ pressed }) => [
      styles.container,
      {
        backgroundColor: cor,
        opacity: pressed ? 0.4 : 1,
      },
    ]}
      {...rest}
    >
      <Text style={styles.label}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 48,
    backgroundColor: "#3366FF",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },

  label: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});