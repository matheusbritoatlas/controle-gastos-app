import { StyleSheet, Text, TextInput, View } from "react-native";

function HeaderExtrato() {
  return (
    
    <View style={styles.container}>
      <View style={styles.topo}>
        <Text style={styles.titulo}>
          Lançamentos
        </Text>
      </View>

      <View style={styles.busca}>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Pesquisar..."
            style={styles.inputPesquisa}
          />
        </View>

        <Text style={styles.filtro}>
          Filtro
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F3F4A6",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingBottom: 20,
  },

  topo: {
    paddingTop: 70,
    paddingHorizontal: 20,
    paddingBottom: 16,
    alignItems: "center",
  },

  titulo: {
    fontSize: 20,
    fontWeight: "bold",
  },

  busca: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingBottom: 28,
    marginTop: 8,
    alignItems: "center",
  },

  inputContainer: {
    flex: 1,
  },

  inputPesquisa: {
    height: 50,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingHorizontal: 16,
  },

  filtro: {
    marginLeft: 12,
  },
});

export default HeaderExtrato;