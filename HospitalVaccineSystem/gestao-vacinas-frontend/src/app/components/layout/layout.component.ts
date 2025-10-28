import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // Importe CommonModule
import { RouterModule } from '@angular/router';   // Importe RouterModule
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-layout',
  standalone: true, // Adicionado 'standalone: true'
  imports: [
    CommonModule,   // Adicionado 'imports'
    RouterModule
  ],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  // === 1. VARIÁVEL ADICIONADA ===
  // Controla o estado (aberta/fechada)
  public sidebarCollapsed = false;
  
  public currentUser: User | null;
  public menuItems: any[] = [];

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.currentUser = this.authService.currentUserValue;
  }

  ngOnInit(): void {
    // Define os itens do menu baseados no perfil do usuário
    this.setMenuItems();
  }

  /**
   * Define os itens de menu com base no perfil do usuário logado.
   */
  setMenuItems(): void {
    const perfil = this.currentUser?.perfil;

    if (perfil === 'administrador') {
      this.menuItems = [
        { route: '/administrador', icon: 'dashboard', label: 'Dashboard' },
        { route: '/administrador/relatorios', icon: 'assessment', label: 'Relatórios' },
        { route: '/administrador/funcionarios', icon: 'groups', label: 'Funcionários' },
        { route: '/administrador/estoque', icon: 'inventory_2', label: 'Estoque Geral' },
      ];
    } else if (perfil === 'enfermeiro') {
      this.menuItems = [
        // Adicione os links do enfermeiro aqui
        { route: '/enfermeiro', icon: 'dashboard', label: 'Dashboard' },
      ];
    } else if (perfil === 'farmaceutico') {
      this.menuItems = [
        // Adicione os links do farmaceutico aqui
        { route: '/farmaceutico', icon: 'dashboard', label: 'Dashboard' },
      ];
    } else if (perfil === 'paciente') {
      this.menuItems = [
        // O paciente não tem menu na sidebar (por enquanto)
        { route: '/paciente', icon: 'person', label: 'Minha Área' },
      ];
    }
  }

  /**
   * Retorna o nome do perfil formatado.
   */
  getPerfilLabel(): string {
    const perfil = this.currentUser?.perfil;
    if (!perfil) return 'Usuário';
    
    // Deixa a primeira letra maiúscula
    return perfil.charAt(0).toUpperCase() + perfil.slice(1);
  }

  /**
   * Desloga o usuário e o redireciona para a tela de login.
   */
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  // === 2. FUNÇÃO ADICIONADA ===
  // Esta é a função que o (click)="toggleSidebar()" chama
  public toggleSidebar(): void {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }
}