import { Pressable, StyleSheet, Text } from "react-native";

type CategoriaSaidaProps = {
  nome: string;
  onPress: () => void;
  selecionado: boolean;
};

function CategoriaSaida({
  nome,
  onPress,
  selecionado,
}: CategoriaSaidaProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.botao,
        selecionado && styles.botaoSelecionado,
        {
          opacity: pressed ? 0.7 : 1,
        },
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.texto,
          selecionado && styles.textoSelecionado,
        ]}
      >
        {nome}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  botao: {
    width: 120,
    height: 100,

    borderWidth: 1,
    borderColor: "#D9D9D9",

    borderRadius: 16,

    justifyContent: "center",
    alignItems: "center",
  },

  texto: {
    fontSize: 16,
    fontWeight: "500",
  },

  botaoSelecionado: {
    backgroundColor: "#2563EB",
    borderColor: "#2563EB",
  },

  textoSelecionado: {
    color: "#FFFFFF",
  },
});

export default CategoriaSaida;