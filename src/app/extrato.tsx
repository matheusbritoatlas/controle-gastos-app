import CardLancamento from "@/components/CardLancamento";
import HeaderExtrato from "@/components/HeaderExtrato";
import { MovimentacoesContext } from "@/context/MovimentacoesContext";
import { useContext } from "react";
import {
  ScrollView,
  StyleSheet,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


function Extrato() {
  

    
  const { movimentacoes } = useContext(MovimentacoesContext)
  

  return (

    <SafeAreaView style={{ flex: 1, backgroundColor: "#F3F4A6"}}
  edges={["top"]}>



      <ScrollView
        style={{ backgroundColor: "#FFFFFF" }}
        keyboardShouldPersistTaps="handled"
      >
         <HeaderExtrato />

    <View style={styles.container}>

      {movimentacoes.map((lancamento, index) => (

      <CardLancamento

        key={index}

        titulo={lancamento.titulo}
        categoria={lancamento.categoria}
        data={lancamento.data}
        valor={lancamento.valor}
        tipo={lancamento.tipo}
      />

))}

      </View>
          

      </ScrollView>

    </SafeAreaView>

  );
}

const styles = StyleSheet.create({

  container: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    paddingTop: 20,
    
  },

  titulo: {
    fontSize: 24,
    fontWeight: "bold",
  },

});

export default Extrato;