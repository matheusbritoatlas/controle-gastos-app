import { Text, View } from "react-native";
import { Button } from "./Button";

function AcoesRapidas () {   

 return (

    <View>{/* Ações Rápidas */}

        <Text> Ações Rápidas </Text>

        <View  style={{ flexDirection: "row", }}>
            
                {/* Botões de ações rápidas */}

            <Button label="Adicionar Entrada" />

            <Button label="Adicionar Saída" />

        </View>

    </View>

    );
}
export default AcoesRapidas;
