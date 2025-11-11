import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { Paciente, PacienteService } from '../../../services/paciente'; 

@Component({
  selector: 'app-enfermeiro-pacientes',
  standalone: true,
  imports: [CommonModule, RouterModule, DatePipe, FormsModule], 
  templateUrl: './enfermeiro-pacientes.html', 
  styleUrls: ['./enfermeiro-pacientes.scss'] 
})
export class EnfermeiroPacientesComponent implements OnInit {
  
  pacientesExibidos: Paciente[] = [];
  todosPacientes: Paciente[] = [];
  isLoading = true;

  
  showPacienteModal = false;
  novoPaciente = {
    nome: '',
    email: '',
    cpf: '',
    dataNascimento: ''
  };

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

  abrirModalPaciente(): void {
    this.showPacienteModal = true;
    this.novoPaciente = {
      nome: '',
      email: '',
      cpf: '',
      dataNascimento: ''
    };
  }

  criarPaciente(): void {
    if (!this.novoPaciente.nome || !this.novoPaciente.email || !this.novoPaciente.cpf || !this.novoPaciente.dataNascimento) {
      alert('Preencha todos os campos');
      return;
    }

    this.pacienteService.criarPaciente(this.novoPaciente).subscribe(() => {
      this.showPacienteModal = false;
      this.pacienteService.getPacientes().subscribe((data: Paciente[]) => {
        this.todosPacientes = data;
        this.pacientesExibidos = data;
      });
    });
  }
}