import { NgModule } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { IonicStorageModule } from '@ionic/storage-angular';
import { Routes, RouterModule } from '@angular/router';
import { InicioPage } from 'src/app/inicio/inicio.page';
import { MateriaPage } from 'src/app/materia/materia.page';
import { NotaPage } from '../nota/nota.page';

const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', component: InicioPage },
  { path: 'materia', component: MateriaPage },
  { path: 'notas/:id', component: NotaPage }, // Nueva ruta para notas con ID de la materia
];

@NgModule({
  imports: [
    CommonModule,
    IonicStorageModule.forRoot(),
    [RouterModule.forRoot(routes)]
  ],
  exports: [RouterModule],
})
export class AppModule { }