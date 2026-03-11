import { Component, inject, PLATFORM_ID, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { Navbar } from './home/navbar/navbar';
import { isPlatformBrowser } from '@angular/common';
import { InactivityService } from './core/services/inactivity.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Encuesta');

  private inactivityService = inject(InactivityService);

  private platformId = inject(PLATFORM_ID);

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem('token')) {
        this.inactivityService.startWatching();
      }
    }
  }

  ngOnDestroy() {
    this.inactivityService.stopWatching();
  }

}
