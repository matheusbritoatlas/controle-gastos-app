import { Button } from "@/components/Button";
import CategoriaSaida from "@/components/CategoriaSaida";
import HeaderFormulario from "@/components/HeaderFormulario";
import { Input } from "@/components/input";
import { MovimentacoesContext } from "@/context/MovimentacoesContext";
import { router } from "expo-router";
import { useContext, useState } from "react";
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView, StyleSheet, Text, View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


function saida () {


    const [titulo, setTitulo] = useState("")
    const [valor, setValor] = useState("")
    const [data, setData] = useState("")
    const [detalhes, setDetalhes] = useState("")
    const [categoria, setCategoria] = useState("")
    const { adicionarMovimentacao } =useContext(MovimentacoesContext)
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
   
   

    function handleSalvarSaida() {


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

        if (!titulo || !valor || !data || !categoria) {
    setErro("Preencha todos os campos obrigatórios")
    return
    }
     setErro("")

     
         if (isNaN(valorNumero)) {
        setErro("Digite um valor válido")
        return
        }
        console.log("VALOR DIGITADO =", valor)
        console.log("VALOR NUMERO =", valorNumero)

adicionarMovimentacao({
  titulo,
  categoria,
  data,
  valor: valorNumero,
  tipo: "Saída",
    })
    
    Alert.alert("Sucesso","Gasto adicionado com sucesso!",
  [
    {
      text: "OK",
      onPress: () => router.push("/dashboard"),
    },
  ]
    )


  router.push("/dashboard")
    }


    return (

        <SafeAreaView style={{ flex: 1, backgroundColor: "#EF4444",}}
  edges={["top"]}>

        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.select({
                ios: "padding",
                android: "height",
            })}
        >

            <ScrollView
             style={{
            backgroundColor: "#FFFFFF"
             }}
            keyboardShouldPersistTaps="handled" >

            <HeaderFormulario
            titulo="Adicionar Gasto"
            cor="#EF4444"
            />

             <View style={styles.container}>
                
             <Text style={styles.label}>
                  Titulo
            </Text>

             <Input
             value={titulo}
            placeholder="Ex: Supermercado"
            placeholderTextColor="#9CA3AF"
            onChangeText={setTitulo}/>
             
             <Text style={styles.label}>
                  Valor
            </Text>

             <Input
                value={valor}
                placeholderTextColor="#9CA3AF"
                placeholder="0,00"
                keyboardType="numeric"
                onChangeText={setValor}
                />

            <Text style={styles.label}>
                Categoria
            </Text>

            <View style={styles.categoriasContainer}>

             <CategoriaSaida
                    nome="Alimentação"
                    selecionado={categoria === "Alimentação"}
                    onPress={() => setCategoria("Alimentação")}
                />

             <CategoriaSaida
                    nome="Transporte"
                    selecionado={categoria === "Transporte"}
                    onPress={() => setCategoria("Transporte")}
                />

            <CategoriaSaida
                    nome="Saúde"
                    selecionado={categoria === "Saúde"}
                    onPress={() => setCategoria("Saúde")}
                />

              <CategoriaSaida
                    nome="Lazer"
                    selecionado={categoria === "Lazer"}
                    onPress={() => setCategoria("Lazer")}
                />

             <CategoriaSaida
                    nome="Moradia"
                    selecionado={categoria === "Moradia"}
                    onPress={() => setCategoria("Moradia")}
                />

             <CategoriaSaida
                    nome="Outros"
                    selecionado={categoria === "Outros"}
                    onPress={() => setCategoria("Outros")}
                />

                </View>

            

              <Text style={styles.label}>
                  Data
            </Text>

            <Input
                 value={data}
                placeholder="dd/mm/aaaa"
                placeholderTextColor="#9CA3AF"
                keyboardType="numeric"
                onChangeText={formatarData}
                />

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
            style={styles.inputDetalhes}/>

            <Text style={styles.erro}>
                 {erro}
            </Text>

             <Button
            label="Adicionar Gasto"
             onPress={handleSalvarSaida}
            />

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

    categoriasContainer: {

        flexDirection: "row",
        flexWrap: "wrap",
        gap: 10,
    },

    inputDetalhes: {
        
    height: 120,
    paddingTop: 12,
},

    erro: {
    color: "red",
     }

});
export default saida;