
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { VisualizarEstoqueComponent } from '../visualizar-estoque/visualizar-estoque';
import { MeusAlertasComponent } from '../meus-alertas/meus-alertas';
import { InfoVacinasComponent } from '../info-vacinas/info-vacinas';
import { GuiaReacoesComponent } from '../guia-reacoes/guia-reacoes';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    VisualizarEstoqueComponent,
    MeusAlertasComponent,
    InfoVacinasComponent,
    GuiaReacoesComponent
  ],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class DashboardComponent { }