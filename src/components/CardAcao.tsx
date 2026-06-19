import {
    Pressable,
    PressableProps,
    StyleSheet,
    Text,
    View,
} from "react-native";

type CardAcaoProps = PressableProps & {
  simbolo: string;
  texto: string;
  tipo: "Entrada" | "Saída";
};

function CardAcao({
  simbolo,
  texto,
  tipo,
  ...rest
}: CardAcaoProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        tipo === "Entrada"
          ? styles.bordaEntrada
          : styles.bordaSaida,
        {
          opacity: pressed ? 0.1 : 1,
        },
      ]}
      {...rest}
    >
      <View
        style={
          tipo === "Entrada"
            ? styles.circuloEntrada
            : styles.circuloSaida
        }
      >
        <Text style={styles.simbolo}>
          {simbolo}
        </Text>
      </View>

      <Text style={styles.texto}>
        {texto}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 165,
    height: 70,

    borderWidth: 0.5,
    borderRadius: 20,

    alignItems: "center",
    justifyContent: "center",
  },

  simbolo: {
    fontSize: 30,
    fontWeight: "bold",
  },

  circuloEntrada: {
    width: 40,
    height: 40,

    backgroundColor: "#B6FDB6",
    borderRadius: 20,

    alignItems: "center",
    justifyContent: "center",
  },

  circuloSaida: {
    width: 40,
    height: 40,

    backgroundColor: "#F58688",
    borderRadius: 20,

    alignItems: "center",
    justifyContent: "center",
  },

  texto: {
    marginTop: 8,
  },

  bordaEntrada: {
    borderColor: "#37CE37",
  },

  bordaSaida: {
    borderColor: "#E91919",
  },
});

export default CardAcao;