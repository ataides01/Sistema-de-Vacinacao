// src/app/app.routes.ts

import { Routes } from '@angular/router';

// COMPONENTES PRINCIPAIS
import { LoginComponent } from './components/login/login.component';
import { LayoutComponent } from './components/layout/layout.component';
import { authGuard } from './guards/auth.guard';
import { roleGuard } from './guards/role.guard';

// DASHBOARDS
import { EnfermeiroDashboardComponent } from './components/enfermeiro/enfermeiro-dashboard.component';
import { FarmaceuticoDashboardComponent } from './components/farmaceutico/farmaceutico-dashboard.component';
import { AdministradorDashboardComponent } from './components/administrador/administrador-dashboard.component';
import { DashboardComponent as PacienteDashboardComponent } from './paciente/dashboard/dashboard';

// COMPONENTES ADMIN
import { AdminRelatoriosComponent } from './components/administrador/admin-relatorios/admin-relatorios';
import { AdminFuncionariosComponent } from './components/administrador/admin-funcionarios/admin-funcionarios';
import { AdminEstoqueComponent } from './components/administrador/admin-estoque/admin-estoque';
import { AdminPacientesComponent } from './components/administrador/admin-pacientes/admin-pacientes';

// COMPONENTES ENFERMEIRO
import { EnfermeiroPacientesComponent } from './components/enfermeiro/enfermeiro-pacientes/enfermeiro-pacientes';

import { EnfermeiroPacienteDetalheComponent } from './components/enfermeiro/enfermeiro-paciente-detalhe/enfermeiro-paciente-detalhe';


export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'enfermeiro',
    component: LayoutComponent,
    canActivate: [authGuard, roleGuard(['enfermeiro'])],
    children: [
      { path: '', component: EnfermeiroDashboardComponent },
      { path: 'pacientes', component: EnfermeiroPacientesComponent },
      { path: 'pacientes/:id', component: EnfermeiroPacienteDetalheComponent },
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
      { path: 'relatorios', component: AdminRelatoriosComponent },
      { path: 'funcionarios', component: AdminFuncionariosComponent },
      { path: 'estoque', component: AdminEstoqueComponent },
      { path: 'pacientes', component: AdminPacientesComponent }
    ]
  },
  {
    path: 'paciente',
    component: LayoutComponent,
    canActivate: [authGuard, roleGuard(['paciente'])],
    children: [
      { path: '', component: PacienteDashboardComponent }
    ]
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];