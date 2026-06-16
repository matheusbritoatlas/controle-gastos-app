import { StyleSheet, Text, View } from "react-native";



    type CardLancamentoProps = {
        titulo: string
        categoria: string
        data: string
        valor: string

        tipo: "Entrada" | "Saída"
       
}

        function Cardlancamento ({titulo,categoria,data,valor,tipo}: CardLancamentoProps) {

    return(

    <View style={styles.container}>

        <View>
            <Text>🛒</Text>
        </View>

        <View style={styles.informacoes}>
            <Text>{titulo}</Text>
            <Text>{categoria} • {data}</Text>
        </View>

        <Text>{valor}</Text>

    </View>

    )
}
    const styles = StyleSheet.create({

        container: {
         flexDirection: "row",
        
        },

        informacoes: {
        flex: 1,
        },




})


export default Cardlancamento;
