import { Text, View } from "react-native";
import CardAcao from "./CardAcao";

function AcoesRapidas () {   

 return (

    <View>{/* Ações Rápidas */}

        <Text> Ações Rápidas </Text>

        <View  style={{ flexDirection: "row", }}>

                {/* Botões de ações rápidas */}

            <CardAcao  
            simbolo="+" 
            texto="Adicionar Entrada"
            onPress={() => console.log("Adicionar Entrada")} />

            <CardAcao 
            simbolo="-" 
            texto="Adicionar Saída"
            onPress={() => console.log("Adicionar Saída")} />

        </View>

    </View>

    );
}

export default AcoesRapidas;
