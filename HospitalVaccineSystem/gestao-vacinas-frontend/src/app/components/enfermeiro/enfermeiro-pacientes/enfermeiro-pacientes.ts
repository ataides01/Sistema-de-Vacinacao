import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common'; 
import { RouterModule } from '@angular/router';
import { Paciente, PacienteService } from '../../../services/paciente';

@Component({
  selector: 'app-enfermeiro-pacientes',
  standalone: true,
  imports: [CommonModule, RouterModule, DatePipe], 
  templateUrl: './enfermeiro-pacientes.html', 
  styleUrls: ['./enfermeiro-pacientes.scss'] 
})
export class EnfermeiroPacientesComponent implements OnInit {
  
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