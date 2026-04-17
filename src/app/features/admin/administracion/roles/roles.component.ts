import { Component, OnInit, inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button'; // Falta para los botones de acciones
import { TooltipModule } from 'primeng/tooltip'; // Útil para iconos
import { UserAdminService } from '../../../../core/services/user-admin.service';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [
    CommonModule, 
    TableModule,
    ButtonModule,
    TooltipModule
  ],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.scss',
  encapsulation: ViewEncapsulation.None 
})
export class RolesComponent implements OnInit {
  private userService = inject(UserAdminService);
  
  roles: any[] = [];
  loading: boolean = false;
  
  // Variables para los cuadros azules de arriba
  totalAdmins: number = 0; 
  totalUsers: number = 0;

  ngOnInit() {
    this.loadStats();
    this.loadRoles();
  }

  loadStats() {
    this.totalAdmins = 5; 
    this.totalUsers = 150;
  }

  loadRoles() {
    this.loading = true;
    this.userService.getUsers('').subscribe({
      next: (data: any) => {
        // Mapeamos los datos para que coincidan con las 6 columnas del HTML
        this.roles = data.map((user: any) => ({
          ...user,
          name: user.firstName + ' ' + user.lastName,
          username: user.username,
          department: 'Sistemas', // Dato simulado
          roleName: user.username === 'admin' ? 'Administrador' : 'Operador', // Lógica de ejemplo
          status: 'Activo' // Dato simulado
        }));
        this.loading = false;
      },
      error: (err: any) => {
        console.error('Error al cargar roles:', err);
        this.loading = false;
      }
    });
  }
}