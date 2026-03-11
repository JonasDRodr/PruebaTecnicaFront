import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router } from 'express';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const token = localStorage.getItem('token'); // o lo que uses para verificar sesión

  if (token) {
    return true; // ← deja pasar
  } else {
    router.navigate(['/login']); // ← redirige si no está autenticado
    return false;
  }
  return true;
};
