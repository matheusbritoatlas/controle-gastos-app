import CardSaldo from "@/components/CardSaldo";
import { Text, View } from "react-native";

function Dashboard() {

  return (
    
<View> {/* inicio dashboard */}

  <Text> Olá,</Text>
  <Text> Usuário</Text>


    {/* importado do CardSaldo */}

      <CardSaldo /> 
    
    </View>

    );
}

export default Dashboard;