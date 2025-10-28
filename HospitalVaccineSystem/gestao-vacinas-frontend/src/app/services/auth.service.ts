import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { User, LoginRequest, LoginResponse } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  private mockUsers: User[] = [
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
    // NOVO USUÁRIO ADICIONADO
    {
      id: 4,
      nome: 'Carlos Paciente',
      email: 'paciente@hospital.com',
      perfil: 'paciente',
      ativo: true,
      dataCadastro: new Date('2024-03-01')
    }
  ];

  constructor() {
    const storedUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<User | null>(
      storedUser ? JSON.parse(storedUser) : null
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  login(credentials: LoginRequest): Observable<LoginResponse> {
    const user = this.mockUsers.find(u => u.email === credentials.email);

    // Use a senha '123456' para todos os mocks
    if (!user || credentials.senha !== '123456') {
      return throwError(() => new Error('Email ou senha inválidos')).pipe(delay(500));
    }

    const response: LoginResponse = {
      user: user,
      token: 'mock-jwt-token-' + user.id
    };

    localStorage.setItem('currentUser', JSON.stringify(user));
    localStorage.setItem('token', response.token);
    this.currentUserSubject.next(user);

    return of(response).pipe(delay(500));
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
  }

  isAuthenticated(): boolean {
    return !!this.currentUserValue;
  }

  hasRole(role: string): boolean {
    return this.currentUserValue?.perfil === role;
  }

  hasAnyRole(roles: string[]): boolean {
    return roles.includes(this.currentUserValue?.perfil || '');
  }
}