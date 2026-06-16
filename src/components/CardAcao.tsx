import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';

type CardAcaoProps = TouchableOpacityProps & {
    simbolo: string
    texto: string
    tipo: "Entrada" | "Saída"
}


function CardAcao({simbolo, texto, tipo, ...rest }: CardAcaoProps) { 
    


    return (    

        <TouchableOpacity 

                style={[styles.container, tipo === "Entrada" ? styles.bordaEntrada : styles.bordaSaida]}
                activeOpacity={0.1}
                {...rest}
>
            <View style={tipo === "Entrada" ? styles.circuloEntrada : styles.circuloSaida}>  

                <Text style={styles.simbolo}>
                    {simbolo}
                </Text>

            </View>

            <Text style={styles.texto}
            
            >{texto}
            
            </Text>
            
        </TouchableOpacity>

    );
}

const styles = StyleSheet.create({
    container: {

        width: 165,
        height: 70,
        borderWidth: 0.5,

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

        texto: {

            marginTop: 8, 
        },

        bordaEntrada: {
            
            borderColor: "#37ce37"
        },

        bordaSaida: {
            
            borderColor: "#e91919"
        }


});  

        export default CardAcao;