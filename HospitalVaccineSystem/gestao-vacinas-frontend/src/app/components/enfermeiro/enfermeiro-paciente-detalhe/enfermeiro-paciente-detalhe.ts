import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router'; // Importe ActivatedRoute
import { PacienteService, PacienteDetalhes } from '../../../services/paciente';
import { Observable } from 'rxjs';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { ModalAplicarVacinaComponent } from '../modal-aplicar-vacina/modal-aplicar-vacina';

@Component({
  selector: 'app-enfermeiro-paciente-detalhe',
  standalone: true,
  imports: [
    CommonModule,
    DatePipe,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  templateUrl: './enfermeiro-paciente-detalhe.html',
  styleUrls: ['./enfermeiro-paciente-detalhe.scss']
})
export class EnfermeiroPacienteDetalheComponent implements OnInit {

  paciente$: Observable<PacienteDetalhes> | null = null;
  pacienteId!: number;
  pacienteNome: string = '';

  constructor(
    private route: ActivatedRoute, 
    private pacienteService: PacienteService,
    public dialog: MatDialog, 
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
   
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.pacienteId = +idParam;
      this.loadPaciente();
    }
  }

  loadPaciente(): void {
    this.paciente$ = this.pacienteService.getPacienteById(this.pacienteId);
    
    this.paciente$.subscribe(paciente => {
      this.pacienteNome = paciente.nome;
    });
  }

  abrirModalAplicacao(): void {
    const dialogRef = this.dialog.open(ModalAplicarVacinaComponent, {
      width: '600px',
      data: { 
        pacienteId: this.pacienteId,
        pacienteNome: this.pacienteNome 
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.loadPaciente();
        this.snackBar.open('Nova vacina aplicada com sucesso!', 'Fechar', { duration: 3000 });
      }
    });
  }
}