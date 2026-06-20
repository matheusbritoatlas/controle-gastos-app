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
    valor: 250,
    tipo: "Saída",
  },

  {
    titulo: "Salário",
    categoria: "Receita",
    data: "05/09/2025",
    valor: 5000,
    tipo: "Entrada",
  },

  {
    titulo: "Uber",
    categoria: "Transporte",
    data: "08/09/2025",
    valor: 35,
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

  function removerMovimentacao(index: number) {
  setMovimentacoes((estadoAtual) =>
    estadoAtual.filter((_, i) => i !== index)
    )
}
  
  return (
    <MovimentacoesContext.Provider

     value={{
  movimentacoes,
  adicionarMovimentacao,
  removerMovimentacao,

}}
    >
      {children}
    </MovimentacoesContext.Provider>
  );
}