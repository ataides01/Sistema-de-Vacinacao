export interface RelatorioMovimentacao {
  periodo: { inicio: Date; fim: Date };
  totalEntradas: number;
  totalSaidas: number;
  movimentacoesPorVacina: {
    vacinaNome: string;
    entradas: number;
    saidas: number;
  }[];
}

export interface RelatorioEstoque {
  dataGeracao: Date;
  totalVacinas: number;
  totalDoses: number;
  vacinasEmEstoque: {
    nome: string;
    quantidade: number;
    lotesDisponiveis: number;
  }[];
}

export interface RelatorioSolicitacoes {
  periodo: { inicio: Date; fim: Date };
  totalSolicitacoes: number;
  aprovadas: number;
  rejeitadas: number;
  pendentes: number;
  solicitacoesPorEnfermeiro: {
    enfermeiro: string;
    total: number;
    aprovadas: number;
  }[];
}
