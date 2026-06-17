import { Button } from "@/components/Button";
import HeaderFormulario from "@/components/HeaderFormulario";
import { Input } from "@/components/input";
import { MovimentacoesContext } from "@/context/MovimentacoesContext";
import { useContext, useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView, StyleSheet, Text, View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function entrada() {
    

  const [titulo, setTitulo] = useState("")
  const [valor, setValor] = useState("")
  const [data, setData] = useState("")
  const [detalhes, setDetalhes] = useState("")
  const { adicionarMovimentacao } = useContext(MovimentacoesContext)
  const [erro, setErro] = useState("")
  const valorNumero = Number(valor.replace(",", "."))
  const partes = data.split("/")
  const [dia, mes, ano] = partes.map(Number)

  function formatarData(texto: string) {
        const numeros = texto.replace(/\D/g, "")

    
    if (numeros.length <= 2) {
        setData(numeros)

    } else if (numeros.length <= 4) {
        setData(`${numeros.slice(0, 2)}/${numeros.slice(2)}`)

    } else {
        setData(
            `${numeros.slice(0, 2)}/${numeros.slice(2, 4)}/${numeros.slice(4, 8)}`
        )
    }
}
   



  function handleSalvar() {

    if (partes.length !== 3) {
             setErro("Data inválida")
            return
            }
               
    if (
         dia < 1 || dia > 31 ||
          mes < 1 || mes > 12 ||
         ano < 2000 || ano > 2100
         ) {
         setErro("Data inválida")
         return
         }

    if (!titulo || !valor || !data) {
  setErro("Preencha todos os campos obrigatórios")
  return
    }
     setErro("")
     

    if (isNaN(valorNumero)) {
    setErro("Digite um valor válido")
    return
    }

    adicionarMovimentacao({
    titulo: titulo,
    categoria: "Receita",
    data: data,
    valor: `+ R$ ${valorNumero.toFixed(2).replace(".", ",")}`,
    tipo: "Entrada",
  })

    console.log("Movimentação adicionada")
  }

    return (

    <SafeAreaView style={{ flex: 1, backgroundColor: "#22C55E",}}
  edges={["top"]}>

    <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.select({
            ios: "padding",
            android: "height",
        })}
    >

        <ScrollView
        style={{ backgroundColor: "#FFFFFF" }}
        keyboardShouldPersistTaps="handled"
        >
           
            <HeaderFormulario
            titulo="Adicionar Entrada"
            cor="#22C55E"
             />
             
             <View style={styles.container}>
            
             <Text style={styles.label}>
                  Titulo
            </Text>

            <Input
             value={titulo}
             placeholder="Ex: Salario"
             placeholderTextColor="#9CA3AF"
             onChangeText={setTitulo} />
             
             
             <Text style={styles.label}>
                  Valor
            </Text>
             
             <Input
             value={valor}
             placeholder="0,00"
             placeholderTextColor="#9CA3AF"
             keyboardType="numeric"
            onChangeText={setValor} />

              <Text style={styles.label}>
                  Data
             </Text>

               <Input
                value={data}
                placeholder="dd/mm/aaaa"
                placeholderTextColor="#9CA3AF"
                keyboardType="numeric"
                onChangeText={formatarData}/>

               <Text style={styles.label}>
                  Datalhes
                </Text>

             <Input
                value={detalhes}
                placeholder="Adicione detalhes..."
                placeholderTextColor="#9CA3AF"
                onChangeText={setDetalhes}
                multiline
                textAlignVertical="top"
                style={styles.inputDetalhes}
                />

                <Text style={styles.erro}>
                    {erro}
                    </Text>

             <Button

             label="Salvar"
             onPress={handleSalvar}/>

                </View>
            </ScrollView>
       </KeyboardAvoidingView>
    </SafeAreaView>

    )
    
}
const styles = StyleSheet.create({

    container: {
        
    paddingHorizontal: 20,
   
    paddingBottom: 40,

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

    inputDetalhes: {
        
    height: 120,
    paddingTop: 12,
},
    erro: {

        color: "red",
        }

});
export default entrada;