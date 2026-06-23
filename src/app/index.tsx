import { Button } from "@/components/Button";
import { Input } from "@/components/input";
import { UsuarioContext } from "@/context/UsuarioContext";
import { AntDesign } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import { useContext, useState } from "react";
import { Pressable } from "react-native";

import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function Index() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setNome } = useContext(UsuarioContext);

 async function handleSignIn() {

  if (!email.trim() || !password.trim()) {
    return Alert.alert(
      "Entrar",
      "Preencha o e-mail e a senha."
    );
  }

  try {

    const response = await fetch(
      "http://localhost:3000/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email,
          senha: password,
        }),
      }
    );

    const resultado = await response.json();

    if (!response.ok) {
      return Alert.alert(
        "Erro",
        resultado.erro
      );
    }

    localStorage.setItem(
      "usuario",
      JSON.stringify(resultado.usuario)
      
    );
    setNome(resultado.usuario.nome);

    Alert.alert(
      "Sucesso",
      "Login realizado!"
    );

    router.push("/dashboard");

  } catch (erro) {

    console.log(erro);

    Alert.alert(
      "Erro",
      "Não foi possível conectar ao servidor."
    );

  }
}

  return (
    <KeyboardAvoidingView
      style={styles.keyboard}
      behavior={Platform.select({
        ios: "padding",
        android: "height",
      })}
    >
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <Image
            source={require("@/assets/logoatlas.png")}
            style={styles.illustration}
          />

          <Text style={styles.title}>Entrar</Text>

          <Text style={styles.subtitle}>
            Acesse sua conta com e-mail e senha
          </Text>

          <View style={styles.form}>
            <Input
              placeholder="E-mail"
              keyboardType="email-address"
              onChangeText={setEmail}
            />

            <Input
              placeholder="Senha"
              secureTextEntry
              onChangeText={setPassword}
            />

            <Button
              label="Entrar"
              onPress={handleSignIn}
              
            />
            <Text style={styles.ou}>
              ───── OU ─────
            </Text>

           <Pressable
          style={styles.googleButton}
          onPress={() => {
            console.log("Google");
          }}
        >
          <AntDesign
            name="google"
            size={20}
            color="#4285F4"
          />

          <Text style={styles.googleText}>
            Entrar com Google
          </Text>
        </Pressable>
          </View>

          <Text style={styles.footerText}>
            Não tem uma conta?{" "}
            <Link
              href="/singup"
              style={styles.footerlink}
            >
              Cadastre-se aqui.
            </Link>
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboard: {
    flex: 1,
  },

  scroll: {
    flex: 1,
  },

  container: {
    flex: 1,
    backgroundColor: "#FDFDFD",
    padding: 32,
  },

  illustration: {
    width: "100%",
    height: 300,
    resizeMode: "contain",
    marginTop: 62,
  },

  title: {
    fontSize: 32,
    fontWeight: "900",
    color: "#000000",
  },

  subtitle: {
    fontSize: 16,
    color: "#000000",
  },

  form: {
    marginTop: 24,
    gap: 12,
  },

  footerText: {
    textAlign: "center",
    marginTop: 24,
    color: "#585860",
  },

  footerlink: {
    color: "#032AD7",
    fontWeight: "700",
  },
  googleButton: {
  height: 50,
  backgroundColor: "#FFFFFF",
  borderWidth: 1,
  borderColor: "#DADCE0",
  borderRadius: 8,

  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",

  gap: 12,

},

googleText: {
  color: "#3C4043",
  fontSize: 14,
  fontWeight: "500",

},

ou: {
  textAlign: "center",
  marginVertical: 16,
  color: "#6B7280",
},
});