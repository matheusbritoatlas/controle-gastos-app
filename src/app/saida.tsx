import { Button } from "@/components/Button";
import CategoriaSaida from "@/components/CategoriaSaida";
import HeaderFormulario from "@/components/HeaderFormulario";
import { Input } from "@/components/input";
import { useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView, StyleSheet, Text, View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


function saida () {

    function handleSalvarSaida() {
    console.log("Título:", titulo)
    console.log("Valor:", valor)
    console.log("Data:", data)
    console.log("Detalhes:", detalhes)
    console.log("Categoria:", categoria)
    }

    const [titulo, setTitulo] = useState("")
    const [valor, setValor] = useState("")
    const [data, setData] = useState("")
    const [detalhes, setDetalhes] = useState("")
    const [categoria, setCategoria] = useState("")

    return (

        <SafeAreaView
        style={{ flex: 1 }}
        edges={["top"]}
    >

        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.select({
                ios: "padding",
                android: "height",
            })}
        >

            <ScrollView
               
                keyboardShouldPersistTaps="handled"
            >

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
                onChangeText={setData}
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

});
export default saida;