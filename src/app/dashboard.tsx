import EvolucaoFinanceira from "@/components/EvolucaoFinanceira";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import AcoesRapidas from "../components/acoesrapidas";
import CardSaldo from "../components/CardSaldo";
import HeaderDashBoard from "../components/HeaderDashBoard";

function Dashboard() {
 const [entradas, setEntradas] = useState(0);
const [saidas, setSaidas] = useState(0);

useEffect(() => {
  async function carregarTotais() {
  try {

    const usuarioTexto = window.localStorage.getItem("usuario");

console.log(usuarioTexto);

const usuario = JSON.parse(
  window.localStorage.getItem("usuario") || "{}"
);

console.log("USUARIO LOCAL:", usuario);

    const response = await fetch(
      `http://localhost:3000/financeiro/consultar_totais?id=${usuario.id}`
    );

    const dados = await response.json();

    console.log("TOTAIS DASHBOARD:", dados);

    setEntradas(dados.entradas || 0);
    setSaidas(dados.saidas || 0);

  } catch (erro) {
    console.log(erro);
  }
}
  carregarTotais();
}, []);

  return (
    <SafeAreaView
      style={styles.safeArea}
      edges={["top"]}
    >
      <ScrollView style={styles.scroll}>
        <View style={styles.topDashboard}>
          <HeaderDashBoard />

          <View style={styles.cardSaldoContainer}>
            <CardSaldo />
          </View>
        </View>

        <View style={styles.acoesContainer}>
          <AcoesRapidas />
        </View>

        <View style={styles.graficoContainer}>
          <EvolucaoFinanceira
          labels={["Entradas", "Saídas"]}
          dados={[entradas, saidas]}
        />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F3F4A6",
  },

  scroll: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  topDashboard: {
    backgroundColor: "#F3F4A6",
    paddingHorizontal: 20,
    paddingBottom: 70,

    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,

    shadowColor: "#000",
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 4,
  },

  cardSaldoContainer: {
    marginTop: 20,
  },

  acoesContainer: {
    marginTop: 40,
    paddingHorizontal: 20,
  },

  graficoContainer: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
});

export default Dashboard;