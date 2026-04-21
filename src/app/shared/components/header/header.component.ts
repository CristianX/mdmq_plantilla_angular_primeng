import { NgClass } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { Component, HostListener, OnInit } from '@angular/core';
import { ToggleService } from '../sidebar/toggle.service';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { CustomizerSettingsService } from '../customizer-settings/customizer-settings.service';
import { KeycloakAuthService } from '../../../core/auth/services/keycloak-auth.service';

@Component({
    selector: 'app-header',
    standalone: true, 
    imports: [NgClass, MatMenuModule, MatButtonModule, RouterLink],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

    // Estados de la interfaz
    isSidebarToggled = false;
    isToggled = false;
    isSticky = false;

    // Datos del usuario (Keycloak)
    roles = this.keycloakAuthService.getRoles();
    nombreRol = this.roles.map(r => this.keycloakAuthService.getNombreRol(r));
    loggedUser = this.keycloakAuthService.getLoggedUser()?.['name'] || 'Usuario';

    constructor(
        private toggleService: ToggleService,
        public themeService: CustomizerSettingsService,
        private keycloakAuthService: KeycloakAuthService
    ) {}

    ngOnInit() {
        // Suscripciones a estados globales
        this.toggleService.isSidebarToggled$.subscribe(isSidebarToggled => {
            this.isSidebarToggled = isSidebarToggled;
        });
        this.themeService.isToggled$.subscribe(isToggled => {
            this.isToggled = isToggled;
        });
    }

    // Burger Menu Toggle
    toggle() {
        this.toggleService.toggle();
    }

    // Header Sticky modernizado
    @HostListener('window:scroll', [])
    onWindowScroll() {
        // Añade la clase .sticky cuando baja más de 50px
        this.isSticky = window.scrollY > 50;
    }

    // Lógica de cambio de tema
    toggleTheme() {
        this.themeService.toggleTheme();
    }

    // Lógica de Logout
    logout() {
        this.keycloakAuthService.logout(false);
    }

    // --- Métodos de compatibilidad de plantilla (Se mantienen) ---
    toggleSidebarTheme() { this.themeService.toggleSidebarTheme(); }
    toggleRightSidebarTheme() { this.themeService.toggleRightSidebarTheme(); }
    toggleHideSidebarTheme() { this.themeService.toggleHideSidebarTheme(); }
    toggleHeaderTheme() { this.themeService.toggleHeaderTheme(); }
    toggleCardBorderTheme() { this.themeService.toggleCardBorderTheme(); }
    toggleRTLEnabledTheme() { this.themeService.toggleRTLEnabledTheme(); }
}