import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { 
  Vacina, 
  Lote, 
  MovimentacaoVacina, 
  EstoqueVacina 
} from '../models/vacina.model';

@Injectable({
  providedIn: 'root'
})
export class VacinaService {
  private mockVacinas: Vacina[] = [
    {
      id: 1,
      nome: 'CoronaVac',
      fabricante: 'Sinovac',
      tipo: 'COVID-19',
      descricao: 'Vacina contra COVID-19',
      temperaturaArmazenamento: '2°C a 8°C',
      ativo: true
    },
    {
      id: 2,
      nome: 'Pfizer',
      fabricante: 'Pfizer/BioNTech',
      tipo: 'COVID-19',
      descricao: 'Vacina contra COVID-19',
      temperaturaArmazenamento: '-70°C',
      ativo: true
    },
    {
      id: 3,
      nome: 'Tríplice Viral',
      fabricante: 'Serum Institute',
      tipo: 'Sarampo, Caxumba e Rubéola',
      descricao: 'Vacina tríplice viral',
      temperaturaArmazenamento: '2°C a 8°C',
      ativo: true
    },
    {
      id: 4,
      nome: 'Hepatite B',
      fabricante: 'Instituto Butantan',
      tipo: 'Hepatite B',
      descricao: 'Vacina contra Hepatite B',
      temperaturaArmazenamento: '2°C a 8°C',
      ativo: true
    }
  ];

  private mockLotes: Lote[] = [
    {
      id: 1,
      vacinaId: 1,
      numeroLote: 'COV-2024-001',
      dataFabricacao: new Date('2024-01-15'),
      dataValidade: new Date('2024-12-15'),
      quantidadeInicial: 1000,
      quantidadeAtual: 750,
      status: 'disponivel'
    },
    {
      id: 2,
      vacinaId: 2,
      numeroLote: 'PFZ-2024-002',
      dataFabricacao: new Date('2024-02-01'),
      dataValidade: new Date('2024-11-01'),
      quantidadeInicial: 500,
      quantidadeAtual: 320,
      status: 'disponivel'
    },
    {
      id: 3,
      vacinaId: 3,
      numeroLote: 'TRV-2024-003',
      dataFabricacao: new Date('2024-03-10'),
      dataValidade: new Date('2025-03-10'),
      quantidadeInicial: 800,
      quantidadeAtual: 650,
      status: 'disponivel'
    },
    {
      id: 4,
      vacinaId: 1,
      numeroLote: 'COV-2023-050',
      dataFabricacao: new Date('2023-10-20'),
      dataValidade: new Date('2024-10-20'),
      quantidadeInicial: 600,
      quantidadeAtual: 0,
      status: 'esgotado'
    }
  ];

  private mockMovimentacoes: MovimentacaoVacina[] = [
    {
      id: 1,
      loteId: 1,
      vacinaId: 1,
      vacinaNome: 'CoronaVac',
      loteNumero: 'COV-2024-001',
      tipo: 'entrada',
      quantidade: 1000,
      motivo: 'Recebimento de novo lote',
      responsavelId: 2,
      responsavelNome: 'João Farmacêutico',
      data: new Date('2024-01-15'),
      status: 'aprovada'
    },
    {
      id: 2,
      loteId: 1,
      vacinaId: 1,
      vacinaNome: 'CoronaVac',
      loteNumero: 'COV-2024-001',
      tipo: 'saida',
      quantidade: 250,
      motivo: 'Campanha de vacinação',
      responsavelId: 1,
      responsavelNome: 'Maria Enfermeira',
      data: new Date('2024-10-15'),
      status: 'aprovada'
    },
    {
      id: 3,
      loteId: 2,
      vacinaId: 2,
      vacinaNome: 'Pfizer',
      loteNumero: 'PFZ-2024-002',
      tipo: 'saida',
      quantidade: 180,
      motivo: 'Vacinação de idosos',
      responsavelId: 1,
      responsavelNome: 'Maria Enfermeira',
      data: new Date('2024-10-18'),
      status: 'aprovada'
    }
  ];

  constructor() {}

  getVacinas(): Observable<Vacina[]> {
    return of(this.mockVacinas).pipe(delay(300));
  }

  getVacinaById(id: number): Observable<Vacina | undefined> {
    return of(this.mockVacinas.find(v => v.id === id)).pipe(delay(300));
  }

  getLotes(): Observable<Lote[]> {
    const lotesComNomes = this.mockLotes.map(lote => ({
      ...lote,
      vacinaNome: this.mockVacinas.find(v => v.id === lote.vacinaId)?.nome
    }));
    return of(lotesComNomes).pipe(delay(300));
  }

  getLotesByVacina(vacinaId: number): Observable<Lote[]> {
    const lotes = this.mockLotes.filter(l => l.vacinaId === vacinaId);
    return of(lotes).pipe(delay(300));
  }

  adicionarLote(lote: Omit<Lote, 'id'>): Observable<Lote> {
    const novoLote: Lote = {
      ...lote,
      id: this.mockLotes.length + 1
    };
    this.mockLotes.push(novoLote);
    return of(novoLote).pipe(delay(500));
  }

  getMovimentacoes(): Observable<MovimentacaoVacina[]> {
    return of(this.mockMovimentacoes).pipe(delay(300));
  }

  adicionarMovimentacao(movimentacao: Omit<MovimentacaoVacina, 'id'>): Observable<MovimentacaoVacina> {
    const novaMovimentacao: MovimentacaoVacina = {
      ...movimentacao,
      id: this.mockMovimentacoes.length + 1,
      data: new Date()
    };
    this.mockMovimentacoes.push(novaMovimentacao);
    
    const lote = this.mockLotes.find(l => l.id === movimentacao.loteId);
    if (lote) {
      if (movimentacao.tipo === 'entrada') {
        lote.quantidadeAtual += movimentacao.quantidade;
      } else if (movimentacao.tipo === 'saida') {
        lote.quantidadeAtual -= movimentacao.quantidade;
      }
    }
    
    return of(novaMovimentacao).pipe(delay(500));
  }

  aprovarMovimentacao(id: number): Observable<MovimentacaoVacina> {
    const mov = this.mockMovimentacoes.find(m => m.id === id);
    if (mov) {
      mov.status = 'aprovada';
    }
    return of(mov!).pipe(delay(500));
  }

  rejeitarMovimentacao(id: number): Observable<MovimentacaoVacina> {
    const mov = this.mockMovimentacoes.find(m => m.id === id);
    if (mov) {
      mov.status = 'rejeitada';
    }
    return of(mov!).pipe(delay(500));
  }

  getEstoque(): Observable<EstoqueVacina[]> {
    const estoque: EstoqueVacina[] = this.mockVacinas.map(vacina => {
      const lotes = this.mockLotes.filter(l => l.vacinaId === vacina.id);
      const quantidadeTotal = lotes.reduce((sum, l) => sum + l.quantidadeAtual, 0);
      const lotesDisponiveis = lotes.filter(l => l.status === 'disponivel').length;
      const hoje = new Date();
      const trintaDias = new Date(hoje.getTime() + (30 * 24 * 60 * 60 * 1000));
      const lotesProximosVencimento = lotes.filter(l => 
        l.dataValidade < trintaDias && l.dataValidade > hoje
      ).length;

      return {
        vacinaId: vacina.id,
        vacinaNome: vacina.nome,
        quantidadeTotal,
        lotesDisponiveis,
        lotesProximosVencimento
      };
    });

    return of(estoque).pipe(delay(300));
  }
}
