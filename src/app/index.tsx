import { Button } from "@/components/Button";
import { Input } from "@/components/input";
import { Link, router } from "expo-router";
import { useState } from "react";

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
 async function handleSignIn() {
  if (!email.trim() || !password.trim()) {
    return Alert.alert(
      "Entrar",
      "Preencha o e-mail e a senha para continuar!"
    );
  }

  try {
    const resposta = await fetch(
      "http://localhost:3000/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          senha: password,
        }),
      }
    );
    const dados = await resposta.json();

      localStorage.setItem(
        "usuario",
        JSON.stringify(dados.usuario)
      );

      console.log("STATUS:", resposta.status);
          
    if (!resposta.ok) {
      return Alert.alert("Erro", dados.erro);
    }
    Alert.alert("Sucesso", dados.mensagem);
    router.push("/dashboard");
  } catch (erro) {
    console.log(erro);
    Alert.alert(
      "Erro",
      "Não foi possível conectar ao servidor"
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
});