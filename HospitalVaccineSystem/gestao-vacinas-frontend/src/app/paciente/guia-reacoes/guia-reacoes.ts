import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// Import do Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-guia-reacoes',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './guia-reacoes.html',
  styleUrls: ['./guia-reacoes.scss']
})
export class GuiaReacoesComponent {
  // Este componente pode ser estático, o conteúdo está no HTML.
  constructor() { }
}