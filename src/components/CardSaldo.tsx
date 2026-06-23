
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";


function CardSaldo() {

const [saldo, setSaldo] = useState(0)
const [totalEntradas, setTotalEntradas] = useState(0)
const [totalSaidas, setTotalSaidas] = useState(0)

useEffect(() => {

  console.log("CARD SALDO MONTADO");

  async function carregarDados() {

    console.log("CARREGANDO DADOS");

    try {

      const usuario = JSON.parse(
        localStorage.getItem("usuario") || "{}"
      );

      console.log("USUARIO:", usuario);

      const respostaSaldo = await fetch(
        `http://localhost:3000/financeiro/consultar_saldo?id=${usuario.id}`
      );

      const saldoJson = await respostaSaldo.json();

      console.log("SALDO:", saldoJson);


      setSaldo(saldoJson.saldo || 0);
      const respostaTotais = await fetch(
  `http://localhost:3000/financeiro/consultar_totais?id=${usuario.id}`
    );

    const totaisJson = await respostaTotais.json();

    console.log("TOTAIS:", totaisJson);

    setTotalEntradas(totaisJson.entradas || 0);
    setTotalSaidas(totaisJson.saidas || 0);

    } catch (erro) {

      console.log("ERRO:", erro);

    }
  }

  carregarDados();

}, []);


  return (

<View style={styles.container}>

      <Text style={styles.tituloSaldo}>
        Seu Saldo
         </Text>
      
      <Text style={styles.valorSaldo}

      > R$ {saldo.toFixed(2).replace(".", ",")}

      </Text>
 
    <View  style={styles.detalhes}> 

      <View style={styles.entrada}>


        <Text style={styles.tituloMiniCard}
        > Entradas 
        </Text>

        <Text style={styles.ValorMiniCard}>
             R$ {totalEntradas.toFixed(2).replace(".", ",")}
        </Text>
        
       </View>

      <View style={styles.saida}> 

        <Text style={styles.tituloMiniCard}
        > Saídas 
        </Text>
        
        <Text style={styles.ValorMiniCard}
        > R$ {totalSaidas.toFixed(2).replace(".", ",")}
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
