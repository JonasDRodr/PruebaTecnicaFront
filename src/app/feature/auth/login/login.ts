import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from "@angular/router";
import { UserService } from '../../../core/services/user.service';
import { User } from '../../../Modules/users.module';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  private ventaService = inject(UserService);
  private router = inject(Router);

  idPermission: number = 1;
  userName: string = "";
  password: string = "";
  errorLogin = signal<string>('');
  btnPass: boolean = false;

  ngOnInit() {
    console.log('Login component initialized');
  }
  
  login() {
    const request: User = {
       id: 0, // El ID se asignará en el backend
       idRol: this.idPermission,
       userName: this.userName,
       password: this.password
     };
     
    this.ventaService.postConsultaLogin(request).subscribe({
      next: (response: any) => {
        this.router.navigate(['/encuesta']);
        localStorage.setItem('token', response.token);
        localStorage.setItem('rol', response.idRol);

        if (response.idRol === '1') {
          this.router.navigate(['/reporte']);
        } else {
          this.router.navigate(['/encuesta']);
        }
        console.log('Usuario logueado:', response);
      },
      error: (err) => {
        this.errorLogin.set(err.error?.message || 'Error al loguear usuario');
        setTimeout(() => {
          this.errorLogin.set('');
        }, 3000); // 3 segundos
        console.error('Error al loguear usuario:', this.errorLogin);
      }
    });
  }

  buttonPass() {
    this.btnPass = !this.btnPass;
  }
}
