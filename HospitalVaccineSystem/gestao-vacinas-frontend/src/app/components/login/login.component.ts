import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoginRequest } from '../../models/user.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  credentials: LoginRequest = {
    email: '',
    senha: ''
  };
  error: string = '';
  loading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login(): void {
    this.error = '';
    this.loading = true;

    this.authService.login(this.credentials).subscribe({
      next: (response) => {
        this.loading = false;
        const perfil = response.user.perfil;
        
        if (perfil === 'enfermeiro') {
          this.router.navigate(['/enfermeiro']);
        } else if (perfil === 'farmaceutico') {
          this.router.navigate(['/farmaceutico']);
        } else if (perfil === 'administrador') {
          this.router.navigate(['/administrador']);
        }
      },
      error: (err) => {
        this.loading = false;
        this.error = err.message || 'Erro ao fazer login';
      }
    });
  }
}
