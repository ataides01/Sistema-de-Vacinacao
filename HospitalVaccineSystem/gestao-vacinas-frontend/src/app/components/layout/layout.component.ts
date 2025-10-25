import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  currentUser: User | null = null;
  menuItems: any[] = [];
  sidebarCollapsed = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
      this.updateMenuItems();
    });
  }

  updateMenuItems(): void {
    if (!this.currentUser) return;

    const perfil = this.currentUser.perfil;

    if (perfil === 'enfermeiro') {
      this.menuItems = [
        { label: 'Dashboard', icon: 'dashboard', route: '/enfermeiro' },
        { label: 'Solicitar Vacinas', icon: 'add', route: '/enfermeiro/solicitar' },
        { label: 'Minhas Solicitações', icon: 'list', route: '/enfermeiro/solicitacoes' }
      ];
    } else if (perfil === 'farmaceutico') {
      this.menuItems = [
        { label: 'Dashboard', icon: 'dashboard', route: '/farmaceutico' },
        { label: 'Aprovar Solicitações', icon: 'check', route: '/farmaceutico/aprovar' },
        { label: 'Gerenciar Lotes', icon: 'inventory', route: '/farmaceutico/lotes' },
        { label: 'Estoque', icon: 'storage', route: '/farmaceutico/estoque' }
      ];
    } else if (perfil === 'administrador') {
      this.menuItems = [
        { label: 'Dashboard', icon: 'dashboard', route: '/administrador' },
        { label: 'Relatórios', icon: 'assessment', route: '/administrador/relatorios' },
        { label: 'Funcionários', icon: 'people', route: '/administrador/funcionarios' },
        { label: 'Estoque Geral', icon: 'storage', route: '/administrador/estoque' }
      ];
    }
  }

  toggleSidebar(): void {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  getPerfilLabel(): string {
    if (!this.currentUser) return '';
    const perfis: any = {
      'enfermeiro': 'Enfermeiro(a)',
      'farmaceutico': 'Farmacêutico(a)',
      'administrador': 'Administrador(a)'
    };
    return perfis[this.currentUser.perfil] || '';
  }
}
