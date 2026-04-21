import { Component, OnInit, inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button'; // Importante para los iconos de botones
import { UserAdminService } from '../../../../core/services/user-admin.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    TableModule, 
    InputTextModule, 
    ButtonModule,
    MatCardModule
  ],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class UsuariosComponent implements OnInit {
  private userService = inject(UserAdminService);
  
  users: any[] = [];
  loading: boolean = false;
  searchTerm: string = '';
  private searchSubject = new Subject<string>();

  ngOnInit() {
    this.loadUsers();
    
    // Lógica de búsqueda optimizada (debounce)
    this.searchSubject.pipe(
      debounceTime(400), 
      distinctUntilChanged()
    ).subscribe((term: string) => {
      this.loadUsers(term);
    });
  }

  onSearchChange(event: any) {
    const value = event.target.value;
    this.searchSubject.next(value);
  }

  loadUsers(term: string = '') {
    this.loading = true;
    this.userService.getUsers(term).subscribe({
      next: (data) => {
        this.users = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar usuarios:', err);
        this.loading = false;
      }
    });
  }
}
