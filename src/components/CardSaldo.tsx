import { StyleSheet, Text, View } from "react-native";



function CardSaldo() {

  return (

<View style={styles.container}>{/* CardSaldo */}

      <Text style={styles.tituloSaldo}
      
      > Seu Saldo 
      
      </Text>

      <Text style={styles.valorSaldo}

      > R$ 1000

      </Text>
 
    <View  style={styles.detalhes}> {/* detalhes do saldo */}

      <View style={styles.entrada}>{/* view entradas */}


        <Text style={styles.tituloMiniCard}
        > Entradas 
        </Text>

        <Text style={styles.ValorMiniCard}
        > R$ 500
        </Text>  

      </View>

      <View style={styles.saida}> {/* view saídas */}  

        <Text style={styles.tituloMiniCard}
        > Saídas 
        </Text>
        
        <Text style={styles.ValorMiniCard}
        > R$ 200
        </Text>    

      </View>

    </View>
 </View>

    );
}  


   const styles = StyleSheet.create({

  container: {
    
      width: "100%",
      height: 180,  
      borderWidth: 1,
      borderRadius: 20,
      padding: 20,
      backgroundColor: "#ffffff",
      
  },

  detalhes: {

    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 40,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    
   
  },

  saida: {

    backgroundColor: "#f58688",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    width: "40%",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  
  },

  entrada: {

    backgroundColor: "#b6fdb6",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    width: "40%",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  tituloSaldo: {

    fontSize: 18,
    
  },

  valorSaldo: {

    fontSize: 24,
    fontWeight: "bold",
    color: "#000000",
  },

  tituloMiniCard: {
    fontSize: 16,
  
  },

  ValorMiniCard: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000",
  },

});


export default CardSaldo; 
