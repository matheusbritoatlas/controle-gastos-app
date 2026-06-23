import { createContext, ReactNode, useState } from "react";

type UsuarioProviderProps = {
  children: ReactNode;
};

export const UsuarioContext = createContext<any>(null);

export function UsuarioProvider({
  children,
}: UsuarioProviderProps) {

  const usuarioSalvo = localStorage.getItem("usuario");

  const [nome, setNome] = useState(
    usuarioSalvo
      ? JSON.parse(usuarioSalvo).nome
      : ""
  );

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