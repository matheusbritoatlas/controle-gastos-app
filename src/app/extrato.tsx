import HeaderExtrato from "@/components/HeaderExtrato";
import {
    ScrollView,
    StyleSheet,
    View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function Extrato() {

  return (

    <SafeAreaView
      style={{ flex: 1 }}
      edges={["top"]}
    >

      <ScrollView
        style={{ backgroundColor: "#FFFFFF" }}
        keyboardShouldPersistTaps="handled"
      >
         <HeaderExtrato />

        <View style={styles.container}>
          
        </View>

      </ScrollView>

    </SafeAreaView>

  );
}

const styles = StyleSheet.create({

  container: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },

  titulo: {
    fontSize: 24,
    fontWeight: "bold",
  },

});

export default Extrato;