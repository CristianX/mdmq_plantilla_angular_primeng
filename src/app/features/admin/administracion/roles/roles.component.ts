import { Component, OnInit, inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { UserAdminService } from '../../../../core/services/user-admin.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, MatCardModule],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.scss',
  encapsulation: ViewEncapsulation.None 
})
export class RolesComponent implements OnInit {
  private userService = inject(UserAdminService);
  
  roles: any[] = [];
  loading: boolean = false;
  totalAdmins: number = 0; 
  totalUsers: number = 0;

  ngOnInit() {
    this.totalAdmins = 8; // Valores de ejemplo para las cartas
    this.totalUsers = 124;
    this.loadRoles();
  }

  loadRoles() {
    this.loading = true;
    this.userService.getUsers('').subscribe({
      next: (data: any) => {
        this.roles = data.map((user: any) => ({
          ...user,
          name: `${user.firstName} ${user.lastName}`,
          username: user.username,
          roleName: user.roleName || 'Sin asignar',
          department: user.department || 'General',
          status: user.status || 'Activo'
        }));
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  gestionarRol(empleado: any) {
    console.log('Gestionando permisos para:', empleado.username);
  }
}
