import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private mockUsuarios: User[] = [
    {
      id: 1,
      nome: 'Maria Enfermeira',
      email: 'enfermeiro@hospital.com',
      perfil: 'enfermeiro',
      ativo: true,
      dataCadastro: new Date('2024-01-15')
    },
    {
      id: 2,
      nome: 'João Farmacêutico',
      email: 'farmaceutico@hospital.com',
      perfil: 'farmaceutico',
      ativo: true,
      dataCadastro: new Date('2024-01-10')
    },
    {
      id: 3,
      nome: 'Ana Administradora',
      email: 'admin@hospital.com',
      perfil: 'administrador',
      ativo: true,
      dataCadastro: new Date('2024-01-01')
    },
    {
      id: 4,
      nome: 'Pedro Enfermeiro',
      email: 'pedro.enfermeiro@hospital.com',
      perfil: 'enfermeiro',
      ativo: true,
      dataCadastro: new Date('2024-05-20')
    }
  ];

  constructor() {}

  getUsuarios(): Observable<User[]> {
    return of(this.mockUsuarios).pipe(delay(300));
  }

  getUsuarioById(id: number): Observable<User | undefined> {
    return of(this.mockUsuarios.find(u => u.id === id)).pipe(delay(300));
  }

  getUsuariosByPerfil(perfil: string): Observable<User[]> {
    return of(this.mockUsuarios.filter(u => u.perfil === perfil)).pipe(delay(300));
  }

  criarUsuario(usuario: Omit<User, 'id' | 'dataCadastro'>): Observable<User> {
    const novoUsuario: User = {
      ...usuario,
      id: this.mockUsuarios.length + 1,
      dataCadastro: new Date()
    };
    this.mockUsuarios.push(novoUsuario);
    return of(novoUsuario).pipe(delay(500));
  }

  atualizarUsuario(id: number, dados: Partial<User>): Observable<User> {
    const usuario = this.mockUsuarios.find(u => u.id === id);
    if (usuario) {
      Object.assign(usuario, dados);
    }
    return of(usuario!).pipe(delay(500));
  }

  desativarUsuario(id: number): Observable<User> {
    const usuario = this.mockUsuarios.find(u => u.id === id);
    if (usuario) {
      usuario.ativo = false;
    }
    return of(usuario!).pipe(delay(500));
  }

  ativarUsuario(id: number): Observable<User> {
    const usuario = this.mockUsuarios.find(u => u.id === id);
    if (usuario) {
      usuario.ativo = true;
    }
    return of(usuario!).pipe(delay(500));
  }
}
