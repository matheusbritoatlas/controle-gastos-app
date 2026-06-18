export type Movimentacao = {
  titulo: string
  categoria: string
  data: string
  valor: number
  tipo: "Entrada" | "Saída"
}

export const movimentacoes: Movimentacao[] = [
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
    valor:  5000,
    tipo: "Entrada",
  },

  {
    titulo: "Uber",
    categoria: "Transporte",
    data: "08/09/2025",
    valor:  35,
    tipo: "Saída",
  },
]
export function adicionarMovimentacao(
  movimentacao: Movimentacao
) {
  movimentacoes.push(movimentacao)
}