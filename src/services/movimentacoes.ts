export type Movimentacao = {
  titulo: string
  categoria: string
  data: string
  valor: string
  tipo: "Entrada" | "Saída"
}

export const movimentacoes: Movimentacao[] = [
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
]
export function adicionarMovimentacao(
  movimentacao: Movimentacao
) {
  movimentacoes.push(movimentacao)
}