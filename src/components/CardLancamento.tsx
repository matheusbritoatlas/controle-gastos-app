import { StyleSheet, Text, View } from "react-native";



    type CardLancamentoProps = {
        titulo: string
        categoria: string
        data: string
        valor: string

        tipo: "Entrada" | "Saída"
       
}

        function CardLancamento ({titulo,categoria,data,valor,tipo}: CardLancamentoProps) {

    return(

    <View style={styles.container}>

        <View style={styles.iconeContainer}>
            <Text>🛒</Text>
        </View>

        <View style={styles.informacoes}>
            <Text>{titulo}</Text>
            <Text>{categoria} • {data}</Text>
        </View>

        <Text
            style={[
            styles.valor,
            tipo === "Entrada"
            ? styles.valorEntrada
            : styles.valorSaida
            ]}
            >
            {valor}
        </Text>

    </View>

    )
}
    const styles = StyleSheet.create({

        container: {
            flexDirection: "row",
            alignItems: "center",
            padding: 16,
            borderWidth: 1,
            borderColor: "#D1D5DB",
            borderRadius: 16,
            marginBottom: 12,
            marginTop: 12,
            paddingHorizontal: 20,
             paddingBottom: 40,
            
        
        },

        informacoes: {
            flex: 1,
            },
        
        iconeContainer: {

        width: 40,
        height: 40,
        backgroundColor: "#d1da57",
        borderRadius: 20,
        marginRight: 12,
        alignItems: "center",
        justifyContent: "center",
       
        },
         valor: {

        fontWeight: "bold",
        },
        valorEntrada:{

        color: "#22C55E",
        },

        valorSaida: {
        color: "#EF4444",
        },




})


export default CardLancamento;
