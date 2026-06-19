import { createContext, ReactNode, useState } from "react";

type UsuarioProviderProps = {
  children: ReactNode;
};

export const UsuarioContext = createContext<any>(null);

export function UsuarioProvider({
  children,
}: UsuarioProviderProps) {
  const [nome, setNome] = useState("Titã");

  return (
    <UsuarioContext.Provider
      value={{
        nome,
        setNome,
      }}
    >
      {children}
    </UsuarioContext.Provider>
  );
}
