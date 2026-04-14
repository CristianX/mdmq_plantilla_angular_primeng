declare let $: any;
import { Component } from '@angular/core';
import { filter } from 'rxjs/operators';
import { CommonModule, Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { RouterOutlet, Router, NavigationCancel, NavigationEnd } from '@angular/router';
import { CustomizerSettingsService } from '../../shared/components/customizer-settings/customizer-settings.service';
import { ToggleService } from '../../shared/components/sidebar/toggle.service';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';


@Component({
    selector: 'app-admin-page',
    imports: [CommonModule, RouterOutlet, SidebarComponent, HeaderComponent, FooterComponent],
    templateUrl: './admin-page.component.html',
    styleUrl: './admin-page.component.scss',
    providers: [
        Location, {
            provide: LocationStrategy,
            useClass: PathLocationStrategy
        }
    ]
})
export class AdminPageComponent {

  title = 'SGBIM -  Sistema de Gestión de Bienes Inmuebles Municipales';
  routerSubscription: any;
  location: any;

  // isSidebarToggled
  isSidebarToggled = false;

  // isToggled
  isToggled = false;

  constructor(
      public router: Router,
      private toggleService: ToggleService,
      public themeService: CustomizerSettingsService
  ) {
      this.toggleService.isSidebarToggled$.subscribe(isSidebarToggled => {
          this.isSidebarToggled = isSidebarToggled;
      });
      this.themeService.isToggled$.subscribe(isToggled => {
          this.isToggled = isToggled;
      });
  }

  // ngOnInit
  ngOnInit(){
      this.recallJsFuntions();
  }

  // recallJsFuntions
  recallJsFuntions() {
      this.routerSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd || event instanceof NavigationCancel))
      .subscribe(event => {
          this.location = this.router.url;
          if (!(event instanceof NavigationEnd)) {
              return;
          }
          window.scrollTo(0, 0);
      });
  }

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

  // Card Border Radius
  toggleCardBorderRadiusTheme() {
      this.themeService.toggleCardBorderRadiusTheme();
  }

  // RTL Mode
  toggleRTLEnabledTheme() {
      this.themeService.toggleRTLEnabledTheme();
  }

}
