import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-visualizar-estoque',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule, 
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './visualizar-estoque.html',
  styleUrls: ['./visualizar-estoque.scss']
})
export class VisualizarEstoqueComponent {
  searchTerm: string = '';
  clinicasEncontradas: any[] = [];
  buscaRealizada: boolean = false;

 
  private mockClinicas = [
    { nome: 'P.U Saquarema', endereco: 'R. Cel. Madureira, 113', vacinas: ['Gripe', 'COVID-19 (Reforço)', 'Febre Amarela'] },
    { nome: 'ESF Bacaxá', endereco: 'R. Alfredo Menezes, 980', vacinas: ['Gripe', 'Hepatite B'] },
    { nome: 'ESF Barreira', endereco: 'R. Cap. Nunes, 2605', vacinas: ['COVID-19 (Reforço)', 'Sarampo'] }
  ];

  constructor() { }

  buscar(): void {
  
    this.buscaRealizada = true;
    if (this.searchTerm.length > 0) {
      this.clinicasEncontradas = this.mockClinicas;
    } else {
      this.clinicasEncontradas = [];
    }
  }
}