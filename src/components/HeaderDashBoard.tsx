import { UsuarioContext } from "@/context/UsuarioContext";
import { router } from "expo-router";
import { useContext, useEffect } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View
} from "react-native";

function HeaderDashBoard() {
  const { nome, setNome } = useContext(UsuarioContext);

  useEffect(() => {
    async function carregarUsuario() {
      try {
        const response = await fetch(
          "http://localhost:3000/usuario",
          {
            credentials: "include",
          }
        );

        if (!response.ok) return;

        const usuario = await response.json();

        setNome(usuario.nome);

      } catch (erro) {
        console.log(
          "Erro ao carregar usuário:",
          erro
        );
      }
    }

    carregarUsuario();
  }, []);

 async function sair() {

  console.log("CLICOU");

  localStorage.removeItem("usuario");

  setNome("");

  router.push("/");

}

  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.Saudacao}>
          Olá,
        </Text>

        <Text style={styles.NomeUsuario}>
          {nome}!
        </Text>
      </View>

      <Pressable onPress={sair}>
        <View style={styles.circulo}>
          <Text style={styles.TextoCirculo}>
            {nome
              ? nome.substring(0, 2).toUpperCase()
              : "TT"}
          </Text>
        </View>
      </Pressable>
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

  Saudacao: {
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