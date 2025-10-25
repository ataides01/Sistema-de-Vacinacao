import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { VacinaService } from '../../services/vacina.service';
import { SolicitacaoService } from '../../services/solicitacao.service';
import { AuthService } from '../../services/auth.service';
import { Vacina, MovimentacaoVacina, SolicitacaoVacina } from '../../models/vacina.model';
import { FilterPipe } from '../../pipes/filter.pipe';

@Component({
  selector: 'app-enfermeiro-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, FilterPipe],
  templateUrl: './enfermeiro-dashboard.component.html',
  styleUrls: ['./enfermeiro-dashboard.component.scss']
})
export class EnfermeiroDashboardComponent implements OnInit {
  movimentacoes: MovimentacaoVacina[] = [];
  solicitacoes: SolicitacaoVacina[] = [];
  vacinas: Vacina[] = [];
  
  novaSolicitacao = {
    vacinaId: 0,
    quantidade: 0,
    justificativa: ''
  };
  
  showSolicitarModal = false;
  loading = false;
  mensagemSucesso = '';
  currentUserId = 0;

  constructor(
    private vacinaService: VacinaService,
    private solicitacaoService: SolicitacaoService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.currentUserId = this.authService.currentUserValue?.id || 0;
    this.loadData();
  }

  loadData(): void {
    this.vacinaService.getMovimentacoes().subscribe(mov => {
      this.movimentacoes = mov.slice(0, 10);
    });

    this.solicitacaoService.getSolicitacoesByUsuario(this.currentUserId).subscribe(sol => {
      this.solicitacoes = sol.slice(0, 5);
    });

    this.vacinaService.getVacinas().subscribe(vac => {
      this.vacinas = vac;
    });
  }

  abrirModalSolicitar(): void {
    this.showSolicitarModal = true;
    this.novaSolicitacao = {
      vacinaId: 0,
      quantidade: 0,
      justificativa: ''
    };
    this.mensagemSucesso = '';
  }

  fecharModalSolicitar(): void {
    this.showSolicitarModal = false;
  }

  enviarSolicitacao(): void {
    if (!this.novaSolicitacao.vacinaId || !this.novaSolicitacao.quantidade || !this.novaSolicitacao.justificativa) {
      alert('Preencha todos os campos');
      return;
    }

    this.loading = true;
    const vacina = this.vacinas.find(v => v.id === Number(this.novaSolicitacao.vacinaId));
    
    this.solicitacaoService.criarSolicitacao({
      vacinaId: Number(this.novaSolicitacao.vacinaId),
      vacinaNome: vacina?.nome,
      quantidade: this.novaSolicitacao.quantidade,
      justificativa: this.novaSolicitacao.justificativa,
      solicitanteId: this.currentUserId,
      solicitanteNome: this.authService.currentUserValue?.nome
    }).subscribe({
      next: () => {
        this.loading = false;
        this.mensagemSucesso = 'Solicitação enviada com sucesso!';
        this.loadData();
        setTimeout(() => {
          this.fecharModalSolicitar();
        }, 2000);
      },
      error: () => {
        this.loading = false;
        alert('Erro ao enviar solicitação');
      }
    });
  }

  getStatusClass(status: string): string {
    const classes: any = {
      'pendente': 'status-pendente',
      'aprovada': 'status-aprovada',
      'rejeitada': 'status-rejeitada'
    };
    return classes[status] || '';
  }

  getStatusLabel(status: string): string {
    const labels: any = {
      'pendente': 'Pendente',
      'aprovada': 'Aprovada',
      'rejeitada': 'Rejeitada'
    };
    return labels[status] || status;
  }
}
