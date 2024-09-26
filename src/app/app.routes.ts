import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full',
  },
  {
    path: 'inicio',
    loadComponent: () => import('./inicio/inicio.page').then( m => m.InicioPage)
  },
  {
    path: 'materia',
    loadComponent: () => import('./materia/materia.page').then( m => m.MateriaPage)
  },
  {
    path: 'materia/:materiaID',
    loadComponent: () => import('./materia/materia.page').then( m => m.MateriaPage)
  },
  {
    path: 'nota/:MateriaId',
    loadComponent: () => import('./nota/nota.page').then( m => m.NotaPage)
  },
  {
    path: 'nota/:MateriaId/nota/:NotaId',
    loadComponent: () => import('./nota/nota.page').then( m => m.NotaPage)
  },
 


];
