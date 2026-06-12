import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';

type CardAcaoProps = TouchableOpacityProps & {
    simbolo: string
    texto: string
}


function CardAcao({simbolo, texto, ...rest}: CardAcaoProps) { // CardAcao


    return (    

        <TouchableOpacity  // botão de ação rápida clivavel

            style={styles.container} 
            activeOpacity={0.1}
             {...rest}>

            <View style={styles.circulo}>  

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

        width: 180,
        height: 100,
        borderWidth: 1,

        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20,
    },

     simbolo: {

            fontSize: 30,
            fontWeight: "bold",
    },

        circulo: {

            width: 50,
            height: 50,
            backgroundColor: "lightgray",
            borderRadius: 25,

            alignItems: "center",
            justifyContent: "center",
        },

});  

        export default CardAcao;