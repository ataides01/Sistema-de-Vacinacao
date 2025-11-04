import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { RouterModule } from '@angular/router';
import { Paciente, PacienteService } from '../../../services/paciente'; 

@Component({
  selector: 'app-admin-pacientes',
  standalone: true,
  imports: [CommonModule, RouterModule], 
  templateUrl: './admin-pacientes.html', 
  styleUrls: ['./admin-pacientes.scss'] 
})
export class AdminPacientesComponent implements OnInit {

  pacientesExibidos: Paciente[] = [];
  todosPacientes: Paciente[] = []; 
  isLoading = true;

  constructor(private pacienteService: PacienteService) { }

  ngOnInit(): void {
    this.pacienteService.getPacientes().subscribe((data: Paciente[]) => { 
      this.todosPacientes = data;
      this.pacientesExibidos = data;
      this.isLoading = false;
    });
  }

  buscarPaciente(event: any): void {
    const termo = event.target.value.toLowerCase();
    if (!termo) {
      this.pacientesExibidos = this.todosPacientes;
    } else {
      this.pacientesExibidos = this.todosPacientes.filter(p => 
        p.nome.toLowerCase().includes(termo) || 
        p.cpf.includes(termo)
      );
    }
  }
}