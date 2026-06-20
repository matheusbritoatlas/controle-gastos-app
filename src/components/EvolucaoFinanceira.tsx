import { Dimensions, StyleSheet, Text, View } from "react-native";
import { LineChart } from "react-native-chart-kit";

    type EvolucaoFinanceiraProps = { 
    labels: string[]
    dados: number[]
    } 

   function EvolucaoFinanceira({
    labels,
    dados
    }: EvolucaoFinanceiraProps) {

            const larguraTela = Dimensions.get("window").width;

                 const data = {
                    labels: labels,
                    datasets: [
                  {
                    data: dados,
                 },
            ],
        };
            
        return (

          <View style={styles.container}>

            <Text style={styles.textotitulo}>

                Evolução Financeira

            </Text>

            <View style={styles.grafico}>  

                 <LineChart

                    data={data}
                    width={larguraTela - 80}
                    height={180}
                    chartConfig={{
                    backgroundColor: "#ffffff",
                    backgroundGradientFrom: "#ffffff",
                    backgroundGradientTo: "#ffffff",
                    decimalPlaces: 0,
                    color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`,

                    }}
                 />

            </View>

         </View>

        );
    }
    const styles = StyleSheet.create({

        container: {
     
        width: "100%",
        borderWidth: 1,
        borderRadius: 20,
        padding: 20,
        backgroundColor: "#ffffff",
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      

        },

        grafico: {
        height: 200,
        marginTop: 16,
        
        },

        textotitulo: {

            fontSize: 18,
            fontWeight: "bold",
        },


    })
    
        
    
    export default EvolucaoFinanceira;