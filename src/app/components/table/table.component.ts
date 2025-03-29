import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { ActionType, Job, User } from '../../interface';
import { CommonModule } from '@angular/common';
import { abecedarioUIColores } from '../../utils/index';


@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {
  @Input() data: User[] = [];
  @Input() onAction!: (action: ActionType, user : User) => void;
  currentPage = 0;
  pageSize = 8;
  displayedColumns: string[] = ['Nombre', 'Puesto', 'Fecha', 'Salario', 'Edad'];

  getBackgroundColor(nombre: string): string {
    if (!nombre) return '#CCCCCC'; // Color gris por defecto si no hay nombre
    const primeraLetra = nombre.charAt(0).toUpperCase();
    return abecedarioUIColores[primeraLetra] || '#CCCCCC';
  }

  actionJob(action: ActionType, user :  User) {
    this.onAction(action, user);
  };


  get totalPages() {
    return Math.ceil(this.data.length / this.pageSize);
  }

  get paginatedData() {
    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;
    return this.data.slice(start, end);
  }

  nextPage() {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
    }
  }
}

