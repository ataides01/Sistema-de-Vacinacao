import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VacinaService } from '../../services/vacina.service';
import { SolicitacaoService } from '../../services/solicitacao.service';
import { AuthService } from '../../services/auth.service';
import { Lote, SolicitacaoVacina, Vacina, EstoqueVacina } from '../../models/vacina.model';

@Component({
  selector: 'app-farmaceutico-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './farmaceutico-dashboard.component.html',
  styleUrls: ['./farmaceutico-dashboard.component.scss']
})
export class FarmaceuticoDashboardComponent implements OnInit {
  solicitacoesPendentes: SolicitacaoVacina[] = [];
  lotes: Lote[] = [];
  estoque: EstoqueVacina[] = [];
  vacinas: Vacina[] = [];
  
  showAprovarModal = false;
  showLoteModal = false;
  solicitacaoSelecionada: SolicitacaoVacina | null = null;
  observacao = '';
  
  novoLote = {
    vacinaId: 0,
    numeroLote: '',
    dataFabricacao: '',
    dataValidade: '',
    quantidadeInicial: 0
  };

  constructor(
    private vacinaService: VacinaService,
    private solicitacaoService: SolicitacaoService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.solicitacaoService.getSolicitacoesPendentes().subscribe(sol => {
      this.solicitacoesPendentes = sol;
    });

    this.vacinaService.getLotes().subscribe(lotes => {
      this.lotes = lotes.slice(0, 10);
    });

    this.vacinaService.getEstoque().subscribe(estoque => {
      this.estoque = estoque;
    });

    this.vacinaService.getVacinas().subscribe(vac => {
      this.vacinas = vac;
    });
  }

  abrirModalAprovar(solicitacao: SolicitacaoVacina): void {
    this.solicitacaoSelecionada = solicitacao;
    this.observacao = '';
    this.showAprovarModal = true;
  }

  aprovarSolicitacao(): void {
    if (!this.solicitacaoSelecionada) return;
    
    const user = this.authService.currentUserValue;
    this.solicitacaoService.aprovarSolicitacao(
      this.solicitacaoSelecionada.id,
      user?.id || 0,
      user?.nome || '',
      this.observacao
    ).subscribe(() => {
      this.showAprovarModal = false;
      this.loadData();
    });
  }

  rejeitarSolicitacao(): void {
    if (!this.solicitacaoSelecionada || !this.observacao) {
      alert('Informe o motivo da rejeição');
      return;
    }
    
    const user = this.authService.currentUserValue;
    this.solicitacaoService.rejeitarSolicitacao(
      this.solicitacaoSelecionada.id,
      user?.id || 0,
      user?.nome || '',
      this.observacao
    ).subscribe(() => {
      this.showAprovarModal = false;
      this.loadData();
    });
  }

  abrirModalLote(): void {
    this.showLoteModal = true;
    this.novoLote = {
      vacinaId: 0,
      numeroLote: '',
      dataFabricacao: '',
      dataValidade: '',
      quantidadeInicial: 0
    };
  }

  adicionarLote(): void {
    if (!this.novoLote.vacinaId || !this.novoLote.numeroLote) {
      alert('Preencha todos os campos obrigatórios');
      return;
    }

    this.vacinaService.adicionarLote({
      vacinaId: Number(this.novoLote.vacinaId),
      numeroLote: this.novoLote.numeroLote,
      dataFabricacao: new Date(this.novoLote.dataFabricacao),
      dataValidade: new Date(this.novoLote.dataValidade),
      quantidadeInicial: this.novoLote.quantidadeInicial,
      quantidadeAtual: this.novoLote.quantidadeInicial,
      status: 'disponivel'
    }).subscribe(() => {
      this.showLoteModal = false;
      this.loadData();
    });
  }

  getStatusLoteClass(status: string): string {
    const classes: any = {
      'disponivel': 'status-disponivel',
      'vencido': 'status-vencido',
      'esgotado': 'status-esgotado'
    };
    return classes[status] || '';
  }
}
