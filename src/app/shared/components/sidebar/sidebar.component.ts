import { Component, ViewChildren, QueryList } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { CustomizerSettingsService } from '../customizer-settings/customizer-settings.service';
import { KeycloakAuthService } from '../../../core/auth/services/keycloak-auth.service';
import { MatExpansionModule, MatExpansionPanel } from '@angular/material/expansion';
import { ArtesService } from '@core/services/artes/artes.service';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { ToggleService } from './toggle.service';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-sidebar',
    standalone: true,
    imports: [
        NgScrollbarModule, 
        MatExpansionModule, 
        RouterLinkActive, 
        RouterModule, 
        RouterLink, 
        NgClass
    ],
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
    // Referencia a todos los mat-expansion-panel del HTML
    @ViewChildren(MatExpansionPanel) panels!: QueryList<MatExpansionPanel>;

    isSidebarToggled = false;
    isToggled = false;
    imgEscudo: any;
    panelOpenState = false;

    constructor(
        private artesService: ArtesService,
        private toggleService: ToggleService,
        public themeService: CustomizerSettingsService,
        private keycloakAuthService: KeycloakAuthService
    ) {
        // Escucha el estado del sidebar desde el servicio
        this.toggleService.isSidebarToggled$.subscribe(isSidebarToggled => {
            this.isSidebarToggled = isSidebarToggled;
            
            // Si el sidebar se activa (se encoge), cerramos los paneles abiertos
            if (this.isSidebarToggled) {
                this.closeAllPanels();
            }
        });

        this.themeService.isToggled$.subscribe(isToggled => {
            this.isToggled = isToggled;
        });

        this.imgEscudo = this.artesService.getImagen('icoEscudo');
    }

    /**
     * Cierra programáticamente todos los mat-expansion-panel
     */
    private closeAllPanels() {
        if (this.panels) {
            this.panels.forEach(panel => panel.close());
        }
    }

    // Alternar el estado del sidebar
    toggle() {
        this.toggleService.toggle();
    }

    // Métodos de configuración de tema (Dark Mode, RTL, etc.)
    toggleTheme() {
        this.themeService.toggleTheme();
    }

    toggleSidebarTheme() {
        this.themeService.toggleSidebarTheme();
    }

    toggleRightSidebarTheme() {
        this.themeService.toggleRightSidebarTheme();
    }

    toggleHideSidebarTheme() {
        this.themeService.toggleHideSidebarTheme();
    }

    toggleHeaderTheme() {
        this.themeService.toggleHeaderTheme();
    }

    toggleCardBorderTheme() {
        this.themeService.toggleCardBorderTheme();
    }

    toggleRTLEnabledTheme() {
        this.themeService.toggleRTLEnabledTheme();
    }

    logout() {
        this.keycloakAuthService.logout(false);
    }
}