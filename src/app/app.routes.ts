import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => 
            import('./home/home')
            .then(m => m.Home),
    },
    {
        path: 'login',
        loadComponent: () => 
        import('./feature/auth/login/login')
            .then(m => m.Login),
        title: 'Login'
    },
    {
        path: 'encuesta',
        loadComponent: () => 
        import('./feature/encuesta/encuesta')
            .then(m => m.Encuesta),
        title: 'Encuesta'
    },
    {
        path: 'reporte',
        loadComponent: () => 
        import('./feature/reporte/reporte')
            .then(m => m.Reporte),
        title: 'Reporte'
    },
];
