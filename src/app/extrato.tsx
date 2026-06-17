import CardLancamento from "@/components/CardLancamento";
import HeaderExtrato from "@/components/HeaderExtrato";
import {
  ScrollView,
  StyleSheet,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


function Extrato() {

    type Lancamento = {
    titulo: string
    categoria: string
    data: string
    valor: string
    tipo: "Entrada" | "Saída"
  }

 const lancamentos: Lancamento[] = [
  {
    titulo: "Supermercado",
    categoria: "Alimentação",
    data: "10/09/2025",
    valor: "- R$ 250,00",
    tipo: "Saída",
  },

  {
    titulo: "Salário",
    categoria: "Receita",
    data: "05/09/2025",
    valor: "+ R$ 5000,00",
    tipo: "Entrada",
  },

  {
    titulo: "Uber",
    categoria: "Transporte",
    data: "08/09/2025",
    valor: "- R$ 35,00",
    tipo: "Saída",
  },
];
  

  return (

    <SafeAreaView style={{ flex: 1, backgroundColor: "#F3F4A6"}}
  edges={["top"]}>



      <ScrollView
        style={{ backgroundColor: "#FFFFFF" }}
        keyboardShouldPersistTaps="handled"
      >
         <HeaderExtrato />

    <View style={styles.container}>

      {lancamentos.map((lancamento, index) => (

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