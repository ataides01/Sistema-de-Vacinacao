import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { VacinaService } from '../../services/vacina.service';
import { User } from '../../models/user.model';
import { EstoqueVacina } from '../../models/vacina.model';

@Component({
  selector: 'app-administrador-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './administrador-dashboard.component.html', 
  styleUrls: ['./administrador-dashboard.component.scss']  
})
export class AdministradorDashboardComponent implements OnInit {
  estoque: EstoqueVacina[] = [];
  totalUsuarios = 0;
  totalEstoque = 0;

  constructor(
    private usuarioService: UsuarioService,
    private vacinaService: VacinaService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.usuarioService.getUsuarios().subscribe(users => {
      this.totalUsuarios = users.filter(u => u.ativo).length;
    });

    this.vacinaService.getEstoque().subscribe(estoque => {
      this.estoque = estoque;
      this.totalEstoque = estoque.reduce((sum, e) => sum + e.quantidadeTotal, 0);
    });
  }
}