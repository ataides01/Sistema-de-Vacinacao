export interface Vacina {
  id: number;
  nome: string;
  fabricante: string;
  tipo: string;
  descricao: string;
  temperaturaArmazenamento: string;
  ativo: boolean;
}

export interface Lote {
  id: number;
  vacinaId: number;
  vacinaNome?: string;
  numeroLote: string;
  dataFabricacao: Date;
  dataValidade: Date;
  quantidadeInicial: number;
  quantidadeAtual: number;
  status: 'disponivel' | 'vencido' | 'em_uso' | 'esgotado';
}

export interface MovimentacaoVacina {
  id: number;
  loteId: number;
  vacinaId: number;
  vacinaNome?: string;
  loteNumero?: string;
  tipo: 'entrada' | 'saida' | 'ajuste';
  quantidade: number;
  motivo: string;
  responsavelId: number;
  responsavelNome?: string;
  data: Date;
  status: 'pendente' | 'aprovada' | 'rejeitada';
}

export interface SolicitacaoVacina {
  id: number;
  vacinaId: number;
  vacinaNome?: string;
  quantidade: number;
  justificativa: string;
  solicitanteId: number;
  solicitanteNome?: string;
  dataSolicitacao: Date;
  status: 'pendente' | 'aprovada' | 'rejeitada';
  dataResposta?: Date;
  respondidoPorId?: number;
  respondidoPorNome?: string;
  observacao?: string;
}

export interface EstoqueVacina {
  vacinaId: number;
  vacinaNome: string;
  quantidadeTotal: number;
  lotesDisponiveis: number;
  lotesProximosVencimento: number;
  ultimaMovimentacao?: Date;
}
