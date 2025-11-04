import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
// Imports que seu HTML precisa (presumidos)
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  // Adicione CommonModule e RouterModule aos imports
  imports: [ CommonModule, RouterModule ],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  public sidebarCollapsed = false;
  currentUser: User | null;
  menuItems: any[] = [];

  constructor(
    private authService: AuthService, 
    private router: Router
  ) {
    this.currentUser = this.authService.currentUserValue;
  }

  ngOnInit(): void {
    this.setMenuItems();
  }

  setMenuItems(): void {
    const perfil = this.currentUser?.perfil;

    if (perfil === 'administrador') {
      this.menuItems = [
        { route: '/administrador', icon: 'dashboard', label: 'Dashboard' },
        { route: '/administrador/relatorios', icon: 'assessment', label: 'Relatórios' },
        { route: '/administrador/funcionarios', icon: 'groups', label: 'Funcionários' },
        // ===== ADICIONE ESTA LINHA PARA O ADMIN =====
        { route: '/administrador/pacientes', icon: 'people_outline', label: 'Pacientes' },
        // =============================================
        { route: '/administrador/estoque', icon: 'inventory_2', label: 'Estoque Geral' },
      ];
    } else if (perfil === 'enfermeiro') {
      this.menuItems = [
        { route: '/enfermeiro', icon: 'dashboard', label: 'Dashboard' },
        // ===== ADICIONE ESTA LINHA PARA O ENFERMEIRO =====
        { route: '/enfermeiro/pacientes', icon: 'people_outline', label: 'Pacientes' },
        // =================================================
        // (Aqui você pode adicionar as outras rotas do enfermeiro)
        // { route: '/enfermeiro/solicitar', icon: 'add_circle', label: 'Solicitar Vacina' },
        // { route: '/enfermeiro/solicitacoes', icon: 'list_alt', label: 'Minhas Solicitações' },
      ];
    } else if (perfil === 'farmaceutico') {
      this.menuItems = [
        // (Menu do Farmacêutico aqui)
        { route: '/farmaceutico', icon: 'dashboard', label: 'Dashboard' },
      ];
    } else if (perfil === 'paciente') {
      this.menuItems = [
        // (Menu do Paciente aqui)
        { route: '/paciente', icon: 'dashboard', label: 'Minhas Vacinas' },
      ];
    }
  }

  // Função que seu HTML do layout precisa
  getPerfilLabel(): string {
    const perfis: any = {
      'enfermeiro': 'Enfermeiro(a)',
      'farmaceutico': 'Farmacêutico(a)',
      'administrador': 'Administrador(a)',
      'paciente': 'Paciente'
    };
    return perfis[this.currentUser?.perfil || ''] || 'Usuário';
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  public toggleSidebar(): void {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }
}