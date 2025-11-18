import { AfterViewInit, Component, inject, OnDestroy, signal, viewChild } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterOutlet } from '@angular/router';
import { MenuItems } from "./menu-items/menu-items";
import { A11yModule } from "@angular/cdk/a11y";
import { APP_ROUTES } from '../../../common/constants';
import { ThemeText } from "../../../common/theme/theme-text/theme-text";
import { AuthService } from '../../../auth/services/auth.service';
@Component({
  selector: 'app-dashboard-layout',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatSidenavModule, MatListModule, RouterOutlet, MenuItems, A11yModule, ThemeText],
  templateUrl: './dashboard-layout.html',
  styleUrl: './dashboard-layout.css'
})
export class DashboardLayout implements OnDestroy, AfterViewInit {

  fillerNav = Array.from({ length: 50 }, (_, i) => `Nav Item ${i + 1}`);
  isMobile = signal(true);
  isDrawerOpen = signal(false);
  private authService = inject(AuthService);
  user = this.authService.user;
  APP_ROUTES = APP_ROUTES;
  router = inject(Router);
  private _mediaQuery = window.matchMedia('(max-width: 600px)');
  private _snav = viewChild.required<MatSidenav>('snav');
  private _listener = (event: MediaQueryListEvent) => {
    this.isMobile.set(event.matches);
  };

  constructor() {
    this.isMobile.set(this._mediaQuery.matches);
    this._mediaQuery.addEventListener('change', this._listener);
  }
  ngAfterViewInit(): void {
    const sidenav = this._snav();
    if (!sidenav) return;

    if (!this.isMobile()) {
      sidenav.open();
      this.isDrawerOpen.set(true);
    }


    sidenav.openedChange.subscribe((opened) => {
      this.isDrawerOpen.set(opened);
    });
  }
  toggleDrawer(): void {
    const sidenav = this._snav();
    sidenav?.toggle();
    this.isDrawerOpen.update((open) => !open);
  }
  ngOnDestroy(): void {
    this._mediaQuery.removeEventListener('change', this._listener);
  }
  logout() {
    this.authService.logout();
    this.router.navigateByUrl('auth', { replaceUrl: true });
  }
}