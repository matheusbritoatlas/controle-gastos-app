import { StyleSheet, Text, View } from "react-native";
    
    function EvolucaoFinanceira (){

        return (

          <View style={styles.container}>{/* pricipal */}


            <Text style={styles.textotitulo}>

                Evolução Financeira

            </Text>

            <View style={styles.grafico}>  {/* grafico */}



            </View>

         </View>

        );
    }
    const styles = StyleSheet.create({

        container: {

            
      width: "100%",
      borderWidth: 1,
      borderRadius: 40,
      padding: 20,
      backgroundColor: "#ffffff",
      

        },

        grafico: {

        height: 200,
        backgroundColor: "rgba(236, 238, 98, 0.84)",
        marginTop: 16,
        

        },

        textotitulo: {

            fontSize: 18,
            

        },


    })
    
        
    
    export default EvolucaoFinanceira;