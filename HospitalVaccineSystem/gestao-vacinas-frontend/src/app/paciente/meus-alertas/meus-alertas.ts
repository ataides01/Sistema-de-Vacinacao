import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // <-- ADICIONADO para o [(ngModel)]

// Imports do Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle'; // <-- ADICIONADO
import { MatButtonModule } from '@angular/material/button';         // <-- ADICIONADO
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar'; // <-- ADICIONADO

@Component({
  selector: 'app-meus-alertas',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,          // <-- ADICIONADO
    MatCardModule,
    MatIconModule,
    MatSlideToggleModule, // <-- ADICIONADO
    MatButtonModule,      // <-- ADICIONADO
    MatSnackBarModule     // <-- ADICIONADO
  ],
  templateUrl: './meus-alertas.html',
  styleUrls: ['./meus-alertas.scss']
})
export class MeusAlertasComponent {
  
  // Variáveis para os toggles
  notificarEmail: boolean = true;
  notificarSms: boolean = false;
  isSaving: boolean = false;

  // Mock de dados de alertas (existente)
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

  constructor(
    private snackBar: MatSnackBar // <-- Injetar o SnackBar
  ) { }

  // Função (existente) para retornar o ícone correto
  getIcone(tipo: string): string {
    switch (tipo) {
      case 'aviso': return 'warning';
      case 'campanha': return 'campaign';
      case 'info': return 'info';
      default: return 'notifications';
    }
  }

  // Função "fake" para salvar as preferências
  salvarPreferencias(): void {
    this.isSaving = true;
    console.log('Salvando preferências:', { 
      email: this.notificarEmail, 
      sms: this.notificarSms 
    });

    // Finge uma chamada de API (demora 1 segundo)
    setTimeout(() => {
      this.isSaving = false;
      this.snackBar.open('Preferências de notificação salvas com sucesso!', 'Fechar', {
        duration: 3000,
        verticalPosition: 'top'
      });
    }, 1000);
  }
}