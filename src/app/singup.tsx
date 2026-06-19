import { Button } from "@/components/Button";
import { Input } from "@/components/input";
import { UsuarioContext } from "@/context/UsuarioContext";
import { Link } from "expo-router";
import { useContext, useState } from "react";
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

export default function Singup() {

  const { setNome: setNomeUsuario } = useContext(UsuarioContext);

  const [nome, setNome] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  function handleSignIn() {
    if (
      !email.trim() ||
      !password.trim() ||
      !nome.trim() ||
      !passwordConfirmation.trim()
    ) {
      return Alert.alert(
        "Cadastrar",
        "Preencha todos os campos para continuar!"
      );
    }

    if (password !== passwordConfirmation) {
  return Alert.alert(
    "Cadastrar",
    "As senhas nos campos devem ser iguais!"
  );
}

setNomeUsuario(nome);

Alert.alert(
  "Bem-vindo",
  `Login realizado com ${email}`
);
  } 

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.select({
        ios: "padding",
        android: "height",
      })}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <Image
            source={require("@/assets/logoatlas.png")}
            style={styles.illustration}
          />

          <Text style={styles.title}>Cadastrar</Text>

          <Text style={styles.subtitle}>
            Crie uma conta para acessar o aplicativo.
          </Text>

          <View style={styles.form}>
            <Input
              placeholder="Nome"
              onChangeText={setNome}
            />

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

            <Input
              placeholder="Confirme a Senha"
              secureTextEntry
              onChangeText={setPasswordConfirmation}
            />

            <Button
              label="Cadastrar"
              onPress={handleSignIn}
            />
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
  );
}

const styles = StyleSheet.create({
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