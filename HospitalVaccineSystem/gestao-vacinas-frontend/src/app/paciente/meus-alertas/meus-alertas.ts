import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-meus-alertas',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './meus-alertas.html',
  styleUrls: ['./meus-alertas.scss']
})
export class MeusAlertasComponent {
  

  mockAlertas = [
    { 
      titulo: 'Reforço COVID-19', 
      mensagem: 'Sua dose de reforço (Bivalente) está disponível. Agende seu horário.',
      tipo: 'aviso' 
    },
    { 
      titulo: 'Campanha de Vacinação contra a Gripe', 
      mensagem: 'A campanha anual de vacinação contra a Influenza começou. Você faz parte do grupo prioritário.',
      tipo: 'campanha' 
    },
    { 
      titulo: 'Febre Amarela', 
      mensagem: 'Verificamos que sua vacina de Febre Amarela foi aplicada há mais de 10 anos. A OMS agora recomenda apenas uma dose para a vida toda. Você está protegido.',
      tipo: 'info' 
    }
  ];

  constructor() { }

  getIcone(tipo: string): string {
    switch (tipo) {
      case 'aviso': return 'warning';
      case 'campanha': return 'campaign';
      case 'info': return 'info';
      default: return 'notifications';
    }
  }
}