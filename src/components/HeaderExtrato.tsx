import { Input } from "@/components/input";
import { StyleSheet, Text, View } from "react-native";

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

    <Input
    placeholder="Pesquisar..."
    placeholderTextColor="#9CA3AF"
    />
    
    </View>

    <Text>Filtro</Text>

    </View>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    backgroundColor: "#F3E46A",
  },

  topo: {
    paddingTop: 20,
  },

  titulo: {
    fontSize: 22,
    fontWeight: "bold",
  },

  busca: {
  flexDirection: "row",

  },
  
  inputContainer: {
  flex: 1,
},

});
export default HeaderExtrato;
