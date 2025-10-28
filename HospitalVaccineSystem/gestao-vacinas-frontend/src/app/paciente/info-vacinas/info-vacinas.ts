import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// Import do Angular Material
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-info-vacinas',
  standalone: true,
  imports: [
    CommonModule,
    MatExpansionModule
  ],
  templateUrl: './info-vacinas.html',
  styleUrls: ['./info-vacinas.scss']
})
export class InfoVacinasComponent {

  // Mock de Perguntas Frequentes (FAQ)
  mockPerguntas = [
    {
      pergunta: 'Vacinas causam autismo?',
      resposta: 'Não. Esta é uma das fake news mais comuns. Diversos estudos científicos rigorosos e de larga escala já comprovaram que não existe nenhuma relação entre vacinas (especificamente a tríplice viral) e o autismo.'
    },
    {
      pergunta: 'Posso beber álcool depois de tomar a vacina da COVID-19?',
      resposta: 'O consumo moderado de álcool não interfere na resposta da vacina. No entanto, o consumo excessivo pode sobrecarregar o fígado e diminuir a resposta imunológica. É recomendado evitar excessos nos dias próximos à vacinação.'
    },
    {
      pergunta: 'Por que preciso de doses de reforço?',
      resposta: 'A resposta imunológica do corpo (os anticorpos) diminui naturalmente com o tempo. As doses de reforço servem para "relembrar" o sistema imunológico como combater o vírus, garantindo que você mantenha um alto nível de proteção por mais tempo.'
    }
  ];
  
  constructor() { }
}