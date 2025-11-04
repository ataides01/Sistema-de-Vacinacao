import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VacinaService } from '../../../services/vacina.service';
import { EstoqueVacina } from '../../../models/vacina.model';

@Component({
  selector: 'app-admin-estoque',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-estoque.html', 
  styleUrls: ['./admin-estoque.scss'] 
})
export class AdminEstoqueComponent implements OnInit {
  estoque: EstoqueVacina[] = [];

  constructor(
    private vacinaService: VacinaService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.vacinaService.getEstoque().subscribe((estoque: EstoqueVacina[]) => {
      this.estoque = estoque;
    });
  }
}