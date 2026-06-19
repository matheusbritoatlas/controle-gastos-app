import { MovimentacoesProvider } from "@/context/MovimentacoesContext";
import { UsuarioProvider } from "@/context/UsuarioContext";
import { Stack } from "expo-router";

export default function Layout() {
  return (
    <UsuarioProvider>
      <MovimentacoesProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </MovimentacoesProvider>
    </UsuarioProvider>
  )
}