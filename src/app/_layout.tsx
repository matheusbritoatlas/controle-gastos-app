import { MovimentacoesProvider } from "@/context/MovimentacoesContext";
import { Stack } from "expo-router";

export default function Layout() {
  return (
    <MovimentacoesProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </MovimentacoesProvider>
  )
}