import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "./Button";
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
            onPress={() => router.push("/entrada")} />

            <CardAcao 
            simbolo="-" 
            texto="Adicionar Saída"
            tipo = "Saída"
            onPress={() => router.push("/saida")} />

        </View>

        <View style={styles.botaoExtrato}>
            <Button
                label="Ver Extrato"
                onPress={() => router.push("/extrato")}
            />
        </View>


    </View>

    );
}
const styles = StyleSheet.create({  

    titulo: {

        fontSize: 20,
        fontWeight: "bold",
        

    },
    cards: {

        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 22,
    },
    botaoExtrato: {

        marginTop: 20,
        },
            

});



 

export default AcoesRapidas;
