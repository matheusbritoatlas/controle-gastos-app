
import EvolucaoFinanceira from "@/components/EvolucaoFinanceira";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CardSaldo from "../components/CardSaldo";
import HeaderDashBoard from "../components/HeaderDashBoard";
import AcoesRapidas from "../components/acoesrapidas";



function Dashboard() {

    const meses= ["Jan","Fev","Mar","Abr","Mai"]
    const valores= [500,800,700,1200,3239]

  return (

 <SafeAreaView style={{ flex: 1, backgroundColor: "#F3F4A6" }}
  edges={["top"]}>
    
  <ScrollView style={{backgroundColor:  "#ffffff", flex: 1 }}> {/* inicio dashboard */}

    <View style={styles.TopDashboard}> 
    
    <HeaderDashBoard /> {/* importado do HeaderDashBoard */}

    <View style={{ marginTop: 20, }}> {/* view card saldo */}

    <CardSaldo /> {/* importado do CardSaldo */}

    </View>

   </View>

    <View style={{ marginTop: 40,paddingHorizontal: 20 }}> {/* view ações rápidas */}

    <AcoesRapidas/>  {/* importado do AcoesRapidas */}

    </View >

    <View style={{ marginTop: 30, paddingHorizontal: 20 }}>

     <EvolucaoFinanceira
   labels={meses}
   dados={valores}
    /> 
     
     </View>

    </ScrollView>


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
    shadowColor: "#000",
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 4,

   }, 
});

export default Dashboard;