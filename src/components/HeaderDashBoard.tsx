import { UsuarioContext } from "@/context/UsuarioContext";
import { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";

function HeaderDashBoard() {
  const { nome } = useContext(UsuarioContext);

  console.log("NOME =", nome);

  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.Saudação}>Olá,</Text>

        <Text style={styles.NomeUsuario}>
          {nome}!
        </Text>
      </View>

      <View style={styles.circulo}>
        <Text style={styles.TextoCirculo}>
          {nome ? nome.substring(0, 2).toUpperCase() : "TT"}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },

  circulo: {
    width: 50,
    height: 50,
    backgroundColor: "#F5F5E6",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },

  Saudação: {
    fontSize: 18,
  },

  NomeUsuario: {
    fontSize: 28,
    fontWeight: "bold",
  },

  TextoCirculo: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default HeaderDashBoard;