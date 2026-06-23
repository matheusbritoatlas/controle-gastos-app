import CardLancamento from "@/components/CardLancamento";
import HeaderExtrato from "@/components/HeaderExtrato";
import { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


function Extrato() {

  async function excluirMovimentacao(id: number) {

  try {

    const response = await fetch(
      `http://localhost:3000/financeiro/movimentacoes/${id}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw new Error("Erro ao excluir");
    }

    carregarExtrato();

  } catch (erro) {

    console.log("Erro ao excluir:", erro);

  }
}
 

  const [movimentacoes, setMovimentacoes] = useState([]);
  useEffect(() => {
  carregarExtrato();
}, []);

async function carregarExtrato() {

  try {

    const response = await fetch(
      "http://localhost:3000/financeiro/consultar_extrato",
      {
        credentials: "include",
      }
    );

    const dados = await response.json();
    
    console.log(dados);

    setMovimentacoes(dados);

  } catch (erro) {

    console.log("Erro ao carregar extrato:", erro);

  }
}

  return (
    <SafeAreaView
      style={styles.safeArea}
      edges={["top"]}
    >
      <ScrollView
        style={styles.scroll}
        keyboardShouldPersistTaps="handled"
      >
        <HeaderExtrato />

        <View style={styles.container}>
          {movimentacoes.map((lancamento: any) => (

          <CardLancamento
      key={lancamento.id}
      titulo={lancamento.titulo}
      categoria={lancamento.categoria}
      data={lancamento.data}
      valor={lancamento.valor}
      tipo={lancamento.tipo_movimentacao}
      onExcluir={() => excluirMovimentacao(lancamento.id)}
    />

          ))}
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
    backgroundColor: "#FFFFFF",
  },

  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
});

export default Extrato;