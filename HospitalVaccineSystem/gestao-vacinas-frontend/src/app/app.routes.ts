import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LayoutComponent } from './components/layout/layout.component';
import { EnfermeiroDashboardComponent } from './components/enfermeiro/enfermeiro-dashboard.component';
import { FarmaceuticoDashboardComponent } from './components/farmaceutico/farmaceutico-dashboard.component';
import { AdministradorDashboardComponent } from './components/administrador/administrador-dashboard.component';
import { authGuard } from './guards/auth.guard';
import { roleGuard } from './guards/role.guard';

export const routes: Routes = [
  { 
    path: 'login', 
    component: LoginComponent 
  },
  {
    path: 'enfermeiro',
    component: LayoutComponent,
    canActivate: [authGuard, roleGuard(['enfermeiro'])],
    children: [
      { path: '', component: EnfermeiroDashboardComponent },
      { path: 'solicitar', component: EnfermeiroDashboardComponent },
      { path: 'solicitacoes', component: EnfermeiroDashboardComponent }
    ]
  },
  {
    path: 'farmaceutico',
    component: LayoutComponent,
    canActivate: [authGuard, roleGuard(['farmaceutico'])],
    children: [
      { path: '', component: FarmaceuticoDashboardComponent },
      { path: 'aprovar', component: FarmaceuticoDashboardComponent },
      { path: 'lotes', component: FarmaceuticoDashboardComponent },
      { path: 'estoque', component: FarmaceuticoDashboardComponent }
    ]
  },
  {
    path: 'administrador',
    component: LayoutComponent,
    canActivate: [authGuard, roleGuard(['administrador'])],
    children: [
      { path: '', component: AdministradorDashboardComponent },
      { path: 'relatorios', component: AdministradorDashboardComponent },
      { path: 'funcionarios', component: AdministradorDashboardComponent },
      { path: 'estoque', component: AdministradorDashboardComponent }
    ]
  },
  { 
    path: '', 
    redirectTo: '/login', 
    pathMatch: 'full' 
  },
  { 
    path: '**', 
    redirectTo: '/login' 
  }
];
