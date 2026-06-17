import { Button } from "@/components/Button";
import HeaderFormulario from "@/components/HeaderFormulario";
import { Input } from "@/components/input";
import { useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView, StyleSheet, Text, View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function entrada () {

    function handleSalvar() {
    console.log("Título:", titulo)
    console.log("Valor:", valor)
    console.log("Data:", data)
    console.log("Detalhes:", detalhes)
    }

    const [titulo, setTitulo] = useState("")
    const [valor, setValor] = useState("")
    const [data, setData] = useState("")
    const [detalhes, setDetalhes] = useState("")

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
             placeholder="Ex: Supermercado"
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
                onChangeText={setData}/>

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

});
export default entrada;