import {
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";

type CardLancamentoProps = {
  titulo: string;
  categoria: string;
  data: string;
  valor: number;
  tipo: "Entrada" | "Saída";
  onExcluir: () => void;
};

function CardLancamento({
  titulo,
  categoria,
  data,
  valor,
  tipo,
  onExcluir,
}: CardLancamentoProps) {
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.iconeContainer,
          tipo === "Entrada"
            ? styles.iconeEntrada
            : styles.iconeSaida,
        ]}
      >
        <Text style={styles.iconeTexto}>
          {tipo === "Entrada" ? "+" : "-"}
        </Text>
      </View>

      <View style={styles.informacoes}>
        <Text style={styles.titulo}>
          {titulo}
        </Text>

        <Text style={styles.detalhes}>
          {categoria} • {data}
        </Text>

        <Text
          style={[
            styles.valor,
            tipo === "Entrada"
              ? styles.valorEntrada
              : styles.valorSaida,
          ]}
        >
          R$ {valor.toFixed(2).replace(".", ",")}
        </Text>
      </View>

      <Pressable
        style={({ pressed }) => [
          styles.botaoExcluir,
          {
            opacity: pressed ? 0.5 : 1,
          },
        ]}
        onPress={onExcluir}
      >
        <Text style={styles.lixeira}>
          🗑
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",

    padding: 16,
    paddingHorizontal: 20,

    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 16,

    marginTop: 12,
    marginBottom: 12,
  },

  informacoes: {
    flex: 1,
  },

  iconeContainer: {
    width: 40,
    height: 40,

    borderRadius: 20,

    marginRight: 12,

    alignItems: "center",
    justifyContent: "center",
  },

  valor: {
    fontWeight: "bold",
  },

  valorEntrada: {
    color: "#22C55E",
  },

  valorSaida: {
    color: "#EF4444",
  },

  titulo: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#111827",
  },

  detalhes: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 2,
  },

  iconeEntrada: {
    backgroundColor: "#22C55E",
  },

  iconeSaida: {
    backgroundColor: "#EF4444",
  },

  iconeTexto: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
  },

  botaoExcluir: {
    marginLeft: 10,
  },

  lixeira: {
    fontSize: 20,
  },
});

export default CardLancamento;