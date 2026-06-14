
import EvolucaoFinanceira from "@/components/EvolucaoFinanceira";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CardSaldo from "../components/CardSaldo";
import HeaderDashBoard from "../components/HeaderDashBoard";
import AcoesRapidas from "../components/acoesrapidas";



function Dashboard() {

  return (

 <SafeAreaView style={{ flex: 1, backgroundColor: "#F3F4A6" }}
  edges={["top"]}>
    
  <View style={{backgroundColor:  "#ffffff", flex: 2 }}> {/* inicio dashboard */}

    <View style={styles.TopDashboard}> 
    
    <HeaderDashBoard /> {/* importado do HeaderDashBoard */}

    <View style={{ marginTop: 20, }}> {/* view card saldo */}

    <CardSaldo /> {/* importado do CardSaldo */}

    </View>

   </View>

    <View style={{ marginTop: 40,paddingHorizontal: 20 }}> {/* view ações rápidas */}

    <AcoesRapidas/>  {/* importado do AcoesRapidas */}

    </View>

     <EvolucaoFinanceira/> 

    </View>

    

    </SafeAreaView>

    );
}
  
const styles = StyleSheet.create({  

   TopDashboard: {

    backgroundColor:"#F3F4A6",
    paddingBottom: 70,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,

   }, 
});

export default Dashboard;