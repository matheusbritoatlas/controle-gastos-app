import { Movimentacao } from "@/services/movimentacoes";
import { createContext, ReactNode, useState } from "react";

type MovimentacoesProviderProps = {
  children: ReactNode;
};

export const MovimentacoesContext = createContext<any>(null);

const movimentacoesIniciais: Movimentacao[] = [];

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
    );
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