import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { 
  RelatorioMovimentacao, 
  RelatorioEstoque, 
  RelatorioSolicitacoes 
} from '../models/relatorio.model';

@Injectable({
  providedIn: 'root'
})
export class RelatorioService {
  constructor() {}

  gerarRelatorioMovimentacao(inicio: Date, fim: Date): Observable<RelatorioMovimentacao> {
    const relatorio: RelatorioMovimentacao = {
      periodo: { inicio, fim },
      totalEntradas: 1500,
      totalSaidas: 430,
      movimentacoesPorVacina: [
        { vacinaNome: 'CoronaVac', entradas: 1000, saidas: 250 },
        { vacinaNome: 'Pfizer', entradas: 500, saidas: 180 },
        { vacinaNome: 'Tríplice Viral', entradas: 0, saidas: 0 }
      ]
    };
    return of(relatorio).pipe(delay(800));
  }

  gerarRelatorioEstoque(): Observable<RelatorioEstoque> {
    const relatorio: RelatorioEstoque = {
      dataGeracao: new Date(),
      totalVacinas: 4,
      totalDoses: 1720,
      vacinasEmEstoque: [
        { nome: 'CoronaVac', quantidade: 750, lotesDisponiveis: 1 },
        { nome: 'Pfizer', quantidade: 320, lotesDisponiveis: 1 },
        { nome: 'Tríplice Viral', quantidade: 650, lotesDisponiveis: 1 },
        { nome: 'Hepatite B', quantidade: 0, lotesDisponiveis: 0 }
      ]
    };
    return of(relatorio).pipe(delay(800));
  }

  gerarRelatorioSolicitacoes(inicio: Date, fim: Date): Observable<RelatorioSolicitacoes> {
    const relatorio: RelatorioSolicitacoes = {
      periodo: { inicio, fim },
      totalSolicitacoes: 3,
      aprovadas: 1,
      rejeitadas: 1,
      pendentes: 1,
      solicitacoesPorEnfermeiro: [
        { enfermeiro: 'Maria Enfermeira', total: 3, aprovadas: 1 }
      ]
    };
    return of(relatorio).pipe(delay(800));
  }

  exportarRelatorio(tipo: string, dados: any): Observable<Blob> {
    const json = JSON.stringify(dados, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    return of(blob).pipe(delay(500));
  }
}
