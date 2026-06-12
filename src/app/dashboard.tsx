
import { View } from "react-native";
import CardSaldo from "../components/CardSaldo";
import HeaderDashBoard from "../components/HeaderDashBoard";
import AcoesRapidas from "../components/acoesrapidas";


function Dashboard() {

  return (
    
<View style={{ paddingHorizontal: 20, marginTop: 30}}> {/* inicio dashboard */}

    
    <HeaderDashBoard /> {/* importado do HeaderDashBoard */}

  <View style={{ marginTop: 20, }}> {/* view card saldo */}

    <CardSaldo /> {/* importado do CardSaldo */}

    </View>

    <View style={{ marginTop: 20, }}> {/* view ações rápidas */}

    <AcoesRapidas/>  {/* importado do AcoesRapidas */}

    </View>

    
    </View>

    );
}

export default Dashboard;