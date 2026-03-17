import { ApplicationConfig, inject, provideAppInitializer } from '@angular/core';
import { PreloadAllModules, provideRouter, withPreloading } from '@angular/router';

import { APP_ROUTES } from './app.routes';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { KeycloakService } from 'keycloak-angular';
import { initializeKeycloak } from './core/auth/keycloak.init';
import { KeycloakAuthService } from './core/auth/services/keycloak-auth.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';


export const appConfig: ApplicationConfig = {
    providers: [
        providePrimeNG({
            theme: {
                preset: Aura
            }
        }),
        BrowserAnimationsModule,
        BrowserModule,
        KeycloakService,

        provideAppInitializer(() => {
            const initializerFn = (initializeKeycloak)(inject(KeycloakService));
            return initializerFn();
        }),
        KeycloakAuthService,
        provideAnimations(),
        provideRouter(APP_ROUTES, withPreloading(PreloadAllModules)),
        provideHttpClient(withInterceptorsFromDi()),
        provideClientHydration(),

    ]
};