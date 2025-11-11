import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PacienteService } from '../../../services/paciente';

import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-modal-aplicar-vacina',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './modal-aplicar-vacina.html',
  styleUrls: ['./modal-aplicar-vacina.scss']
})
export class ModalAplicarVacinaComponent {
  
  aplicacao: any;
  isSaving = false;

  vacinasDisponiveis = [
    'COVID-19 (Bivalente)',
    'Gripe (Influenza)',
    'Febre Amarela',
    'Hepatite B',
    'Tríplice Viral (Sarampo, Caxumba, Rubéola)'
  ];

  constructor(
    public dialogRef: MatDialogRef<ModalAplicarVacinaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { pacienteId: number, pacienteNome: string },
    private pacienteService: PacienteService
  ) {
    this.aplicacao = {
      pacienteId: this.data.pacienteId,
      vacinaNome: '',
      dose: '',
      dataAplicacao: new Date(),
      lote: ''
    };
  }

  salvarAplicacao(): void {
    if (!this.aplicacao.vacinaNome || !this.aplicacao.dose || !this.aplicacao.lote) {
      alert('Por favor, preencha todos os campos.');
      return;
    }
    
    this.isSaving = true;
    this.pacienteService.aplicarVacina(this.aplicacao).subscribe(() => {
      this.isSaving = false;
      this.dialogRef.close(true); 
    });
  }

  fechar(): void {
    this.dialogRef.close();
  }
}