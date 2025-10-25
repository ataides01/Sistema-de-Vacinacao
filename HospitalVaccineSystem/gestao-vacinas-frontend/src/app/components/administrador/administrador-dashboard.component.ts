import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { VacinaService } from '../../services/vacina.service';
import { RelatorioService } from '../../services/relatorio.service';
import { User } from '../../models/user.model';
import { EstoqueVacina } from '../../models/vacina.model';

@Component({
  selector: 'app-administrador-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './administrador-dashboard.component.html',
  styleUrls: ['./administrador-dashboard.component.scss']
})
export class AdministradorDashboardComponent implements OnInit {
  usuarios: User[] = [];
  estoque: EstoqueVacina[] = [];
  showUsuarioModal = false;
  
  novoUsuario = {
    nome: '',
    email: '',
    perfil: 'enfermeiro' as 'enfermeiro' | 'farmaceutico' | 'administrador',
    ativo: true
  };

  totalUsuarios = 0;
  totalEstoque = 0;

  constructor(
    private usuarioService: UsuarioService,
    private vacinaService: VacinaService,
    private relatorioService: RelatorioService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.usuarioService.getUsuarios().subscribe(users => {
      this.usuarios = users;
      this.totalUsuarios = users.filter(u => u.ativo).length;
    });

    this.vacinaService.getEstoque().subscribe(estoque => {
      this.estoque = estoque;
      this.totalEstoque = estoque.reduce((sum, e) => sum + e.quantidadeTotal, 0);
    });
  }

  abrirModalUsuario(): void {
    this.showUsuarioModal = true;
    this.novoUsuario = {
      nome: '',
      email: '',
      perfil: 'enfermeiro',
      ativo: true
    };
  }

  criarUsuario(): void {
    if (!this.novoUsuario.nome || !this.novoUsuario.email) {
      alert('Preencha todos os campos');
      return;
    }

    this.usuarioService.criarUsuario(this.novoUsuario).subscribe(() => {
      this.showUsuarioModal = false;
      this.loadData();
    });
  }

  desativarUsuario(id: number): void {
    if (confirm('Deseja realmente desativar este usuário?')) {
      this.usuarioService.desativarUsuario(id).subscribe(() => {
        this.loadData();
      });
    }
  }

  ativarUsuario(id: number): void {
    this.usuarioService.ativarUsuario(id).subscribe(() => {
      this.loadData();
    });
  }

  gerarRelatorio(tipo: string): void {
    const hoje = new Date();
    const trintaDiasAtras = new Date(hoje.getTime() - (30 * 24 * 60 * 60 * 1000));

    if (tipo === 'movimentacao') {
      this.relatorioService.gerarRelatorioMovimentacao(trintaDiasAtras, hoje).subscribe(relatorio => {
        console.log('Relatório de Movimentação:', relatorio);
        alert('Relatório gerado! Verifique o console do navegador.');
      });
    } else if (tipo === 'estoque') {
      this.relatorioService.gerarRelatorioEstoque().subscribe(relatorio => {
        console.log('Relatório de Estoque:', relatorio);
        alert('Relatório gerado! Verifique o console do navegador.');
      });
    } else if (tipo === 'solicitacoes') {
      this.relatorioService.gerarRelatorioSolicitacoes(trintaDiasAtras, hoje).subscribe(relatorio => {
        console.log('Relatório de Solicitações:', relatorio);
        alert('Relatório gerado! Verifique o console do navegador.');
      });
    }
  }

  getPerfilLabel(perfil: string): string {
    const perfis: any = {
      'enfermeiro': 'Enfermeiro',
      'farmaceutico': 'Farmacêutico',
      'administrador': 'Administrador'
    };
    return perfis[perfil] || perfil;
  }
}
