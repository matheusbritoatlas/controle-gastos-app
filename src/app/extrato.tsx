import CardLancamento from "@/components/CardLancamento";
import HeaderExtrato from "@/components/HeaderExtrato";
import { MovimentacoesContext } from "@/context/MovimentacoesContext";
import { useContext } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


function Extrato() {
  const {
    movimentacoes,
    removerMovimentacao,
  } = useContext(MovimentacoesContext);

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
          {movimentacoes.map((lancamento: any, index: any, ) => (
            <CardLancamento
              key={index}
              titulo={lancamento.titulo}
              categoria={lancamento.categoria}
              data={lancamento.data}
              valor={lancamento.valor}
              tipo={lancamento.tipo}
              onExcluir={() =>
                removerMovimentacao(index)
              }
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