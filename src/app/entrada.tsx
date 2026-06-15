import { Input } from "@/components/input";
import { StyleSheet, Text, View } from "react-native";

function entrada () {

    return (

        <View style={styles.container}>

            <Text style={styles.tituloPagina}>
                 Adiconar entrada
            </Text>
            
             <Text style={styles.label}>
                  Titulo
            </Text>

             <Input/>
             
             <Text style={styles.label}>
                  Valor
            </Text>
             
             <Input/>

              <Text style={styles.label}>
                  Data
            </Text>

             <Input/>

               <Text style={styles.label}>
                  Datalhes
            </Text>

             <Input/>
             


        </View>

    )
    
}
const styles = StyleSheet.create({

    container: {
        paddingHorizontal: 20,
    },

    tituloPagina: {
        fontSize: 24,
        fontWeight: "bold",
        marginTop: 20,
    },

    label: {
        marginTop: 20,
        marginBottom: 8,
        fontSize: 16,
    },

});
export default entrada;