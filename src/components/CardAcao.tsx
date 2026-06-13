import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps, View, } from 'react-native';

type CardAcaoProps = TouchableOpacityProps & {
    simbolo: string
    texto: string
    tipo: "Entrada" | "Saída"
}


function CardAcao({simbolo, texto, tipo, ...rest }: CardAcaoProps) { // CardAcao


    return (    

        <TouchableOpacity  // botão de ação rápida clivavel

            style={styles.container} 
            activeOpacity={0.1}
             {...rest}>

            <View style={tipo === "Entrada" ? styles.circuloEntrada : styles.circuloSaida}>  

                <Text style={styles.simbolo}>
                    {simbolo}
                </Text>

            </View>

            <Text>{texto}</Text>
            
        </TouchableOpacity>

    );
}

const styles = StyleSheet.create({
    container: {

        width: 160,
        height: 80,
        borderWidth: 1,

        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20,
    },

     simbolo: {

            fontSize: 30,
            fontWeight: "bold",
    },

        circuloEntrada: {

            width: 40,
            height: 40,
            backgroundColor: "#b6fdb6",
            borderRadius: 20,

            alignItems: "center",
            justifyContent: "center",
        },
         circuloSaida: {

            width: 40,
            height: 40,
            backgroundColor: "#f58688",
            borderRadius: 20,

            alignItems: "center",
            justifyContent: "center",
        },


});  

        export default CardAcao;