import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { SolicitacaoVacina } from '../models/vacina.model';

@Injectable({
  providedIn: 'root'
})
export class SolicitacaoService {
  private mockSolicitacoes: SolicitacaoVacina[] = [
    {
      id: 1,
      vacinaId: 1,
      vacinaNome: 'CoronaVac',
      quantidade: 100,
      justificativa: 'Campanha de vacinação na UBS Centro',
      solicitanteId: 1,
      solicitanteNome: 'Maria Enfermeira',
      dataSolicitacao: new Date('2024-10-18'),
      status: 'pendente'
    },
    {
      id: 2,
      vacinaId: 2,
      vacinaNome: 'Pfizer',
      quantidade: 50,
      justificativa: 'Vacinação de profissionais de saúde',
      solicitanteId: 1,
      solicitanteNome: 'Maria Enfermeira',
      dataSolicitacao: new Date('2024-10-15'),
      status: 'aprovada',
      dataResposta: new Date('2024-10-16'),
      respondidoPorId: 2,
      respondidoPorNome: 'João Farmacêutico',
      observacao: 'Aprovado conforme solicitado'
    },
    {
      id: 3,
      vacinaId: 3,
      vacinaNome: 'Tríplice Viral',
      quantidade: 200,
      justificativa: 'Campanha escolar de vacinação',
      solicitanteId: 1,
      solicitanteNome: 'Maria Enfermeira',
      dataSolicitacao: new Date('2024-10-10'),
      status: 'rejeitada',
      dataResposta: new Date('2024-10-11'),
      respondidoPorId: 2,
      respondidoPorNome: 'João Farmacêutico',
      observacao: 'Estoque insuficiente no momento'
    }
  ];

  constructor() {}

  getSolicitacoes(): Observable<SolicitacaoVacina[]> {
    return of(this.mockSolicitacoes).pipe(delay(300));
  }

  getSolicitacoesPendentes(): Observable<SolicitacaoVacina[]> {
    const pendentes = this.mockSolicitacoes.filter(s => s.status === 'pendente');
    return of(pendentes).pipe(delay(300));
  }

  getSolicitacoesByUsuario(usuarioId: number): Observable<SolicitacaoVacina[]> {
    const solicitacoes = this.mockSolicitacoes.filter(s => s.solicitanteId === usuarioId);
    return of(solicitacoes).pipe(delay(300));
  }

  criarSolicitacao(solicitacao: Omit<SolicitacaoVacina, 'id' | 'dataSolicitacao' | 'status'>): Observable<SolicitacaoVacina> {
    const novaSolicitacao: SolicitacaoVacina = {
      ...solicitacao,
      id: this.mockSolicitacoes.length + 1,
      dataSolicitacao: new Date(),
      status: 'pendente'
    };
    this.mockSolicitacoes.push(novaSolicitacao);
    return of(novaSolicitacao).pipe(delay(500));
  }

  aprovarSolicitacao(id: number, respondidoPorId: number, respondidoPorNome: string, observacao?: string): Observable<SolicitacaoVacina> {
    const solicitacao = this.mockSolicitacoes.find(s => s.id === id);
    if (solicitacao) {
      solicitacao.status = 'aprovada';
      solicitacao.dataResposta = new Date();
      solicitacao.respondidoPorId = respondidoPorId;
      solicitacao.respondidoPorNome = respondidoPorNome;
      solicitacao.observacao = observacao;
    }
    return of(solicitacao!).pipe(delay(500));
  }

  rejeitarSolicitacao(id: number, respondidoPorId: number, respondidoPorNome: string, observacao: string): Observable<SolicitacaoVacina> {
    const solicitacao = this.mockSolicitacoes.find(s => s.id === id);
    if (solicitacao) {
      solicitacao.status = 'rejeitada';
      solicitacao.dataResposta = new Date();
      solicitacao.respondidoPorId = respondidoPorId;
      solicitacao.respondidoPorNome = respondidoPorNome;
      solicitacao.observacao = observacao;
    }
    return of(solicitacao!).pipe(delay(500));
  }
}
