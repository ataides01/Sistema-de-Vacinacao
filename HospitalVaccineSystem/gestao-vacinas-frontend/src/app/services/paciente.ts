import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

// Definindo a interface do Paciente
export interface Paciente {
  id: number;
  nome: string;
  cpf: string;
  dataNascimento: string;
  email: string;
  ativo: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  // Mock (dados falsos) de pacientes
  private mockPacientes: Paciente[] = [
    { id: 101, nome: 'Joao Victor', cpf: '111.222.333-44', dataNascimento: '1985-05-15', email: 'jv@email.com', ativo: true },
    { id: 102, nome: 'Kawan Lopes', cpf: '222.333.444-55', dataNascimento: '1992-11-20', email: 'kawan@email.com', ativo: true },
    { id: 103, nome: 'Ataides Cota', cpf: '333.444.555-66', dataNascimento: '2018-02-10', email: 'ataides@email.com', ativo: true },
    { id: 104, nome: 'Laura Gomes', cpf: '444.555.666-77', dataNascimento: '1970-07-30', email: 'laura@email.com', ativo: false }
  ];

  constructor() { }

  // Método que "finge" buscar os pacientes da API
  getPacientes(): Observable<Paciente[]> {
    return of(this.mockPacientes).pipe(delay(500)); // Simula um delay de rede
  }
}