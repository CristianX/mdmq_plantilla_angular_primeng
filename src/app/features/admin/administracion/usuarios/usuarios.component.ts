import { Component, OnInit, inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { UserAdminService } from '../../../../core/services/user-admin.service';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule, TableModule, InputTextModule],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss',
  encapsulation: ViewEncapsulation.None // <--- Fundamental
})
export class UsuariosComponent implements OnInit {
  private userService = inject(UserAdminService);
  users: any[] = [];
  loading: boolean = false;
  searchTerm: string = '';
  private searchSubject = new Subject<string>();

  ngOnInit() {
    this.loadUsers();
    this.searchSubject.pipe(
      debounceTime(500), 
      distinctUntilChanged()
    ).subscribe((term: string) => this.loadUsers(term));
  }

  onSearchChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.searchSubject.next(target.value);
  }

  loadUsers(term: string = '') {
    this.loading = true;
    this.userService.getUsers(term).subscribe({
      next: (data: any) => {
        this.users = data;
        this.loading = false;
      },
      error: (err: any) => {
        console.error('Error:', err);
        this.loading = false;
      }
    });
  }
}