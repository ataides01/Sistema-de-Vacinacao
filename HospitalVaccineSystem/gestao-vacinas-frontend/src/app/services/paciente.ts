import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface Paciente {
  id: number;
  nome: string;
  cpf: string;
  dataNascimento: string;
  email: string;
  ativo: boolean;
}


export interface VacinaAplicada {
  id: number;
  nomeVacina: string;
  dose: string;
  dataAplicacao: string;
  lote: string;
  profissional: string;
}
export interface PacienteDetalhes extends Paciente {
  historico: VacinaAplicada[];
}

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  private mockPacientes: Paciente[] = [
    { id: 101, nome: 'Joao Victor S.', cpf: '111.222.333-44', dataNascimento: '1985-05-15', email: 'jv@email.com', ativo: true },
    { id: 102, nome: 'Kawan Lopes', cpf: '222.333.444-55', dataNascimento: '1992-11-20', email: 'kawan@email.com', ativo: true },
    { id: 103, nome: 'Ataides Cota', cpf: '333.444.555-66', dataNascimento: '2018-02-10', email: 'ataides@email.com', ativo: true },
    { id: 104, nome: 'Laura Gomes', cpf: '444.555.666-77', dataNascimento: '1970-07-30', email: 'laura.gomes@email.com', ativo: false }
  ];

  private mockHistoricos: { [key: number]: PacienteDetalhes } = {
    101: {
      ...this.mockPacientes[0],
      historico: [
        { id: 1, nomeVacina: 'COVID-19', dose: '1ª Dose', dataAplicacao: '2023-01-10', lote: 'FA1234', profissional: 'Maria Enfermeira' },
        { id: 2, nomeVacina: 'COVID-19', dose: '2ª Dose', dataAplicacao: '2023-04-10', lote: 'FB5678', profissional: 'Maria Enfermeira' },
        { id: 3, nomeVacina: 'Gripe (Influenza)', dose: 'Anual', dataAplicacao: '2024-03-20', lote: 'GR9900', profissional: 'Maria Enfermeira' },
      ]
    },
    102: {
      ...this.mockPacientes[1],
      historico: [
        { id: 4, nomeVacina: 'Hepatite B', dose: 'Única', dataAplicacao: '2022-11-05', lote: 'HB4500', profissional: 'Maria Enfermeira' },
      ]
    },
    103: { ...this.mockPacientes[2], historico: [] },
    104: { ...this.mockPacientes[3], historico: [] },
  };

  constructor() { }

  getPacientes(): Observable<Paciente[]> {
    return of(this.mockPacientes).pipe(delay(500));
  }
  
  getPacienteById(id: number): Observable<PacienteDetalhes> {
    const paciente = this.mockHistoricos[id];
    return of(paciente).pipe(delay(600));
  }

  aplicarVacina(aplicacao: any): Observable<any> {
    const historico = this.mockHistoricos[aplicacao.pacienteId].historico;
    historico.push({
      id: new Date().getTime(),
      nomeVacina: aplicacao.vacinaNome,
      dose: aplicacao.dose,
      dataAplicacao: aplicacao.dataAplicacao,
      lote: aplicacao.lote,
      profissional: 'Maria Enfermeira'
    });
    return of({ success: true }).pipe(delay(800));
  }


  criarPaciente(paciente: any): Observable<Paciente> {
    const novoId = new Date().getTime(); 
    const novoPaciente: Paciente = {
      ...paciente,
      id: novoId,
      ativo: true
    };
    
    this.mockPacientes.push(novoPaciente);
    console.log('FINGINDO criar paciente:', novoPaciente);
    
    return of(novoPaciente).pipe(delay(700));
  }
}