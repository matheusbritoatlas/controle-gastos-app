import { StyleSheet, Text, View } from "react-native";
import CardAcao from "./CardAcao";

function AcoesRapidas () {   

 return (

    <View> {/* Ações Rápidas */}

        <Text style= {styles.titulo}
        > Ações Rápidas 
        </Text>

       <View style={styles.cards}>  {/* Botões de ações rápidas */}
               
            <CardAcao  
            simbolo="+" 
            texto="Adicionar Entrada"
            tipo = "Entrada"
            onPress={() => console.log("Adicionar Entrada")} />

            <CardAcao 
            simbolo="-" 
            texto="Adicionar Saída"
            tipo = "Saída"
            onPress={() => console.log("Adicionar Saída")} />

        </View>

    </View>

    );
}
const styles = StyleSheet.create({  

    titulo: {

        fontSize: 20,
        fontWeight: "bold",
         marginTop: -29,

    },
    cards: {

        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 22,
    }
    

});



 

export default AcoesRapidas;
