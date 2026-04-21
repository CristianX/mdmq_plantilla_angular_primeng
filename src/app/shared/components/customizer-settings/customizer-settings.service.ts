import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CustomizerSettingsService {
    
    // Dark Mode
    private isDarkTheme: boolean;

    // Sidebar Dark Mode
    private isSidebarDarkTheme: boolean;

    // Right Sidebar
    private isRightSidebarTheme: boolean;

    // Hide Sidebar
    private isHideSidebarTheme: boolean;

    // Header Dark Mode
    private isHeaderDarkTheme: boolean;

    // Card Border
    private isCardBorderTheme: boolean;

    // Card Border Radius
    private isCardBorderRadiusTheme: boolean;

    // RTL Mode
    private isRTLEnabledTheme: boolean;

    constructor() {
        // Defaults seguros (evita JSON.parse(null) y rompe-app en primer arranque)
        this.isDarkTheme = this.readBool('isDarkTheme', false);
        this.isSidebarDarkTheme = this.readBool('isSidebarDarkTheme', false);
        this.isRightSidebarTheme = this.readBool('isRightSidebarTheme', false);
        this.isHideSidebarTheme = this.readBool('isHideSidebarTheme', false);
        this.isHeaderDarkTheme = this.readBool('isHeaderDarkTheme', false);
        this.isCardBorderTheme = this.readBool('isCardBorderTheme', false);
        this.isCardBorderRadiusTheme = this.readBool('isCardBorderRadiusTheme', false);
        this.isRTLEnabledTheme = this.readBool('isRTLEnabledTheme', false);
    }

    private readBool(key: string, fallback: boolean): boolean {
        try {
            const raw = localStorage.getItem(key);
            if (raw === null) return fallback;
            const parsed = JSON.parse(raw);
            return typeof parsed === 'boolean' ? parsed : fallback;
        } catch {
            return fallback;
        }
    }

    // Dark Mode
    toggleTheme() {
        this.isDarkTheme = !this.isDarkTheme;
        localStorage.setItem('isDarkTheme', JSON.stringify(this.isDarkTheme));
    }
    isDark() {
        return this.isDarkTheme;
    }

    // Sidebar Dark
    toggleSidebarTheme() {
        this.isSidebarDarkTheme = !this.isSidebarDarkTheme;
        localStorage.setItem('isSidebarDarkTheme', JSON.stringify(this.isSidebarDarkTheme));
    }
    isSidebarDark() {
        return this.isSidebarDarkTheme;
    }

    // Right Sidebar
    toggleRightSidebarTheme() {
        this.isRightSidebarTheme = !this.isRightSidebarTheme;
        localStorage.setItem('isRightSidebarTheme', JSON.stringify(this.isRightSidebarTheme));
    }
    isRightSidebar() {
        return this.isRightSidebarTheme;
    }

    // Hide Sidebar
    toggleHideSidebarTheme() {
        this.isHideSidebarTheme = !this.isHideSidebarTheme;
        localStorage.setItem('isHideSidebarTheme', JSON.stringify(this.isHideSidebarTheme));
    }
    isHideSidebar() {
        return this.isHideSidebarTheme;
    }

    // Header Dark Mode
    toggleHeaderTheme() {
        this.isHeaderDarkTheme = !this.isHeaderDarkTheme;
        localStorage.setItem('isHeaderDarkTheme', JSON.stringify(this.isHeaderDarkTheme));
    }
    isHeaderDark() {
        return this.isHeaderDarkTheme;
    }

    // Card Border
    toggleCardBorderTheme() {
        this.isCardBorderTheme = !this.isCardBorderTheme;
        localStorage.setItem('isCardBorderTheme', JSON.stringify(this.isCardBorderTheme));
    }
    isCardBorder() {
        return this.isCardBorderTheme;
    }

    // Card Border Radius
    toggleCardBorderRadiusTheme() {
        this.isCardBorderRadiusTheme = !this.isCardBorderRadiusTheme;
        localStorage.setItem('isCardBorderRadiusTheme', JSON.stringify(this.isCardBorderRadiusTheme));
    }
    isCardBorderRadius() {
        return this.isCardBorderRadiusTheme;
    }

    // RTL Mode
    toggleRTLEnabledTheme() {
        this.isRTLEnabledTheme = !this.isRTLEnabledTheme;
        localStorage.setItem('isRTLEnabledTheme', JSON.stringify(this.isRTLEnabledTheme));
    }
    isRTLEnabled() {
        return this.isRTLEnabledTheme;
    }

    // isToggled
    private isToggled = new BehaviorSubject<boolean>(false);
    get isToggled$() {
        return this.isToggled.asObservable();
    }
    toggle() {
        this.isToggled.next(!this.isToggled.value);
    }
    
}
