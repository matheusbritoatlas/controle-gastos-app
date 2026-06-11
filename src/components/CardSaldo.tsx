import { Text, View } from "react-native";

function CardSaldo() {

  return (

<View>{/* CardSaldo */}

  <Text> Seu Saldo </Text>
  <Text> R$ 1000</Text>
 
      <View> {/* detalhes do saldo */}

  <Text> Entradas </Text>
  <Text> R$ 500</Text>  

  <Text> Saídas </Text>
  <Text> R$ 200</Text>    


</View>

    </View>

    );
}  

export default CardSaldo; 