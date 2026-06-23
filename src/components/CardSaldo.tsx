import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

function CardSaldo() {

  const [saldo, setSaldo] = useState(0);
  const [entradas, setEntradas] = useState(0);
  const [saidas, setSaidas] = useState(0);

const carregarDados = async () => {

const usuarioTexto =
  window.localStorage.getItem("usuario");

if (!usuarioTexto) return;

const usuario = JSON.parse(usuarioTexto);

const userId = usuario.id;

console.log("USUARIO CARD:", usuario);
console.log("ID CARD:", userId);
  try {

    const saldoResponse = await fetch(
      `http://localhost:3000/financeiro/consultar_saldo?id=${userId}`
    );

    const saldoData = await saldoResponse.json();

    const totaisResponse = await fetch(
      `http://localhost:3000/financeiro/consultar_totais?id=${userId}`
    );

    const totaisData = await totaisResponse.json();

    setSaldo(saldoData.saldo || 0);
    setEntradas(totaisData.entradas || 0);
    setSaidas(totaisData.saidas || 0);

  } catch (erro) {
    console.log("Erro:", erro);
  }
};

useFocusEffect(
  useCallback(() => {
    carregarDados();
  }, [])
);
  return (

<View style={styles.container}>

      <Text style={styles.tituloSaldo}>
        Seu Saldo
      </Text>

      <Text style={styles.valorSaldo}>
        R$ {saldo.toFixed(2).replace(".", ",")}
      </Text>

      <View style={styles.detalhes}>

        <View style={styles.entrada}>

          <Text style={styles.tituloMiniCard}>
            Entradas
          </Text>

          <Text style={styles.ValorMiniCard}>
            R$ {entradas.toFixed(2).replace(".", ",")}
          </Text>

        </View>

        <View style={styles.saida}>

          <Text style={styles.tituloMiniCard}>
            Saídas
          </Text>

          <Text style={styles.ValorMiniCard}>
            R$ {saidas.toFixed(2).replace(".", ",")}
          </Text>

        </View>

      </View>

    </View>
  );
}

   const styles = StyleSheet.create({

  container: {
    
      width: "100%",
      height: 180,  
      borderWidth: 1,
      borderRadius: 20,
      padding: 20,
      backgroundColor: "#ffffff",
      
  },

  detalhes: {

    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 40,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    
   
  },

  saida: {

    backgroundColor: "#f58688",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    width: "40%",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  
  },

  entrada: {

    backgroundColor: "#b6fdb6",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    width: "40%",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  tituloSaldo: {

    fontSize: 18,
    
  },

  valorSaldo: {

    fontSize: 24,
    fontWeight: "bold",
    color: "#000000",
  },

  tituloMiniCard: {
    fontSize: 16,
  
  },

  ValorMiniCard: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000",
  },

});


export default CardSaldo; 
