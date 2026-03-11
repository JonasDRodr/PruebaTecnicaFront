import { Injectable, NgZone, PLATFORM_ID, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class InactivityService {

  private timeout: any;
  private readonly INACTIVITY_TIME = 5 * 60 * 1000;
//   private readonly INACTIVITY_TIME = 10 * 1000; // Para pruebas, 10 segundos

  constructor(
    private router: Router,
    private ngZone: NgZone,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  startWatching() {
    if (!isPlatformBrowser(this.platformId)) return;

    this.resetTimer();

    const events = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'];
    events.forEach(event => {
      window.addEventListener(event, () => this.resetTimer());
    });
  }

  stopWatching() {
    clearTimeout(this.timeout);
  }

  private resetTimer() {
    clearTimeout(this.timeout);

    this.ngZone.runOutsideAngular(() => {
      this.timeout = setTimeout(() => {
        this.ngZone.run(() => {
          this.logout();
        });
      }, this.INACTIVITY_TIME);
    });
  }

  private logout() {
    if (localStorage.getItem('token')) {
      localStorage.removeItem('token');
      localStorage.removeItem('rol');
      this.router.navigate(['/login']);
    }
  }
}