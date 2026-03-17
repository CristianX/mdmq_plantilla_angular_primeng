import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { CustomizerSettingsService } from '../customizer-settings/customizer-settings.service';
import { KeycloakAuthService } from '../../../core/auth/services/keycloak-auth.service';
import { MatExpansionModule } from '@angular/material/expansion';
import { ArtesService } from '@core/services/artes/artes.service';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { ToggleService } from './toggle.service';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-sidebar',
    imports: [NgScrollbarModule, MatExpansionModule, RouterLinkActive, RouterModule, RouterLink, NgClass],
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

    // isSidebarToggled
    isSidebarToggled = false;

    // isToggled
    isToggled = false;
    imgEscudo: any;

    constructor(
        private artesService: ArtesService,
        private toggleService: ToggleService,
        public themeService: CustomizerSettingsService,
        private keycloakAuthService: KeycloakAuthService
    ) {
        this.toggleService.isSidebarToggled$.subscribe(isSidebarToggled => {
            this.isSidebarToggled = isSidebarToggled;
        });
        this.themeService.isToggled$.subscribe(isToggled => {
            this.isToggled = isToggled;
        });

        this.imgEscudo = this.artesService.getImagen('icoEscudo');
    }

    // Burger Menu Toggle
    toggle() {
        this.toggleService.toggle();
    }

    // Mat Expansion
    panelOpenState = false;

    // Dark Mode
    toggleTheme() {
        this.themeService.toggleTheme();
    }

    // Sidebar Dark
    toggleSidebarTheme() {
        this.themeService.toggleSidebarTheme();
    }

    // Right Sidebar
    toggleRightSidebarTheme() {
        this.themeService.toggleRightSidebarTheme();
    }

    // Hide Sidebar
    toggleHideSidebarTheme() {
        this.themeService.toggleHideSidebarTheme();
    }

    // Header Dark Mode
    toggleHeaderTheme() {
        this.themeService.toggleHeaderTheme();
    }

    // Card Border
    toggleCardBorderTheme() {
        this.themeService.toggleCardBorderTheme();
    }

    // RTL Mode
    toggleRTLEnabledTheme() {
        this.themeService.toggleRTLEnabledTheme();
    }

    logout(){
        this.keycloakAuthService.logout(false);
    }

}