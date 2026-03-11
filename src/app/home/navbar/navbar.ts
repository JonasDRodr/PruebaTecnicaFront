import { CommonModule } from '@angular/common';
import { Component, inject, OnInit} from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {
  router = inject(Router);

  ngOnInit(): void {
    console.log('Navbar initialized. Current route:', this.router.url);
  }
}
