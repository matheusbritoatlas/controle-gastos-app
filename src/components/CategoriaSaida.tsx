import { StyleSheet, Text, TouchableOpacity } from "react-native";



type CategoriaSaidaProps = {
    nome: string
    onPress: () => void
    selecionado: boolean

    }

function CategoriaSaida(
    { nome, onPress, selecionado }: CategoriaSaidaProps
) {

    return(

    <TouchableOpacity
    style={[
        styles.botao,
        selecionado && styles.botaoSelecionado
    ]}
    onPress={onPress}
>
    <Text
    style={[
    styles.texto,
    selecionado && styles.textoSelecionado
    ]} >
    {nome}
    </Text>
    </TouchableOpacity>

    

    );
}

const styles = StyleSheet.create({
  botao: {

  width: 120,
  height: 100,

  borderWidth: 1,
  borderColor: "#D9D9D9",

  borderRadius: 16,

  justifyContent: "center",
  alignItems: "center",
},

  texto: {

    fontSize: 16,
    fontWeight: "500",

  },

    botaoSelecionado: {

    backgroundColor: "#2563EB",
    borderColor: "#2563EB",
},

    textoSelecionado: {
        
    color: "#FFFFFF",
},

})


export default CategoriaSaida;