import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../../../services/usuario.service';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-admin-funcionarios',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './admin-funcionarios.html',
  styleUrls: ['./admin-funcionarios.scss']
})
export class AdminFuncionariosComponent implements OnInit {
  usuarios: User[] = [];
  showUsuarioModal = false;
  
  novoUsuario = {
    nome: '',
    email: '',
    perfil: 'enfermeiro' as 'enfermeiro' | 'farmaceutico' | 'administrador',
    ativo: true
  };

  constructor(
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.usuarioService.getUsuarios().subscribe(users => {
      this.usuarios = users;
    });
  }

  abrirModalUsuario(): void {
    this.showUsuarioModal = true;
    this.novoUsuario = {
      nome: '',
      email: '',
      perfil: 'enfermeiro',
      ativo: true
    };
  }

  criarUsuario(): void {
    if (!this.novoUsuario.nome || !this.novoUsuario.email) {
      alert('Preencha todos os campos');
      return;
    }

    this.usuarioService.criarUsuario(this.novoUsuario).subscribe(() => {
      this.showUsuarioModal = false;
      this.loadData();
    });
  }

  desativarUsuario(id: number): void {
    if (confirm('Deseja realmente desativar este usuário?')) {
      this.usuarioService.desativarUsuario(id).subscribe(() => {
        this.loadData();
      });
    }
  }

  ativarUsuario(id: number): void {
    this.usuarioService.ativarUsuario(id).subscribe(() => {
      this.loadData();
    });
  }

  getPerfilLabel(perfil: string): string {
    const perfis: any = {
      'enfermeiro': 'Enfermeiro',
      'farmaceutico': 'Farmacêutico',
      'administrador': 'Administrador'
    };
    return perfis[perfil] || perfil;
  }
}