import { NgModule } from '@angular/core'; 
import { FormsModule } from "@angular/forms";
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
  { path: 'nota', component: NotaPage }, 
];

@NgModule({
  imports: [
    CommonModule,
    IonicStorageModule.forRoot(),
    [RouterModule.forRoot(routes)],
    FormsModule
  ],
  exports: [RouterModule],
})
export class AppModule { }