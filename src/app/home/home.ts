import { Component, inject } from '@angular/core';
import { Login } from '../feature/auth/login/login';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private router = inject(Router);
  showLoginButton = false;

  ngOnInit() {
    // Verificar ruta inicial
    this.checkRoute(this.router.url);

    // Escuchar cambios de ruta
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.checkRoute(event.urlAfterRedirects);
    });
  }

  private checkRoute(url: string) {
    // El botón solo aparece en la home (ruta '/' o '')
    this.showLoginButton = url === '/' || url === '';
  }
}
