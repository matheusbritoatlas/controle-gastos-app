import { Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from "react-native";

import { Input } from "@/components/input";

import { Button } from "@/components/Button";

import { Link } from "expo-router";

export default function singup(){
    return (
        <KeyboardAvoidingView 
        style={{flex: 1}} behavior={Platform.select({ios: "padding", android: "height"})}>

        <ScrollView 

        contentContainerStyle={{flexGrow: 1}}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator= {false}>

        <View style={styles.container}>
            <Image 
            source={require ("@/assets/logoatlas.png")}
            style={styles.illustration}
            />

            <Text style= {styles.title}>Cadastrar</Text>
            <Text style= {styles.subtitle}>Crie uma conta para acessar o aplicativo.</Text>
            <View style={ styles.form}>
            <Input placeholder= "Nome" />
            <Input placeholder= "E-mail" keyboardType="email-address" />
             <Input placeholder="Senha" secureTextEntry />
             <Input placeholder=" Confirme a Senha" secureTextEntry />
             <Button label="Cadastrar"/>
            </View>


            <Text style={styles.footerText}>
                Já tem uma conta?{" "}
                 <Link href="/" style={styles.footerlink}>  
                 Entre aqui.
                    </Link>
                </Text>
            </View> 
        </ScrollView>
        </KeyboardAvoidingView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor : "#FDFDFD",
        padding: 32, 
   },
    illustration: {
        width: "100%",
        height : 300,
        resizeMode: "contain",
        marginTop: 62,
   },
    title: {
        fontSize: 32,
        fontWeight: "900",
        color : "#000000",
   },
    subtitle: {
        fontSize: 16,
        color : "#000000",
   },
    form: {
        marginTop: 24,
        gap: 12,
   },
    footerText: {
        textAlign: "center",
        marginTop: 24,
        color: "#585860"
   },
    footerlink: {
        color: "#032ad7",
        fontWeight: "700",
   },
})

