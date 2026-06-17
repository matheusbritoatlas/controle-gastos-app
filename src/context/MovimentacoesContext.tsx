import { Movimentacao } from "@/services/movimentacoes";
import { createContext, ReactNode, useState } from "react";

type MovimentacoesProviderProps = {
  children: ReactNode
}

export const MovimentacoesContext = createContext<any>(null);
const movimentacoesIniciais: Movimentacao[] = [
  {
    titulo: "Supermercado",
    categoria: "Alimentação",
    data: "10/09/2025",
    valor: "- R$ 250,00",
    tipo: "Saída",
  },

  {
    titulo: "Salário",
    categoria: "Receita",
    data: "05/09/2025",
    valor: "+ R$ 5000,00",
    tipo: "Entrada",
  },

  {
    titulo: "Uber",
    categoria: "Transporte",
    data: "08/09/2025",
    valor: "- R$ 35,00",
    tipo: "Saída",
  },
];

export function MovimentacoesProvider({
  children,
}: MovimentacoesProviderProps) {

const [movimentacoes, setMovimentacoes] =
  useState<Movimentacao[]>(movimentacoesIniciais);

  function adicionarMovimentacao(
  movimentacao: Movimentacao
) {
  setMovimentacoes((estadoAtual) => [
    ...estadoAtual,
    movimentacao,
  ]);
}
  
  return (
    <MovimentacoesContext.Provider

     value={{
  movimentacoes,
  adicionarMovimentacao,
}}
    >
      {children}
    </MovimentacoesContext.Provider>
  );
}