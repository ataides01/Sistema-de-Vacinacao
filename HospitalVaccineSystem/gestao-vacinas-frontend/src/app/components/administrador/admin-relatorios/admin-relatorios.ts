import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RelatorioService } from '../../../services/relatorio.service';

@Component({
  selector: 'app-admin-relatorios',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-relatorios.html', 
  styleUrls: ['./admin-relatorios.scss'] 
})
export class AdminRelatoriosComponent {
  
  constructor(
    private relatorioService: RelatorioService
  ) {}

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
}