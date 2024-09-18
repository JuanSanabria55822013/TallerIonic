// import {Storage} from '@ionic/storage-angular';
import { Materia } from '../Models/materia';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ControlMateriaService {
  private ControlMateria: Materia[] = [];

  // constructor( private storage: Storage) { 
  //   this.init();
  // }

  // async init() {
  //   this.storage.create();
  //   this.ControlMateria = await this.storage.get('ControlMateria');
  // }

  getControlMateria() {
    return this.ControlMateria
  }

  getMateria(id: number) {
    return this.ControlMateria.find(m => m.id === id);
  }

  CrearMateria(materia: Materia) {
    this.ControlMateria.push(materia);
    // this.GuardarStorage();
  }

  ActualizarMateria(materia: Materia) {
    const index = this.ControlMateria.findIndex(m => m.id === materia.id);
    if (index !== -1) {
      this.ControlMateria[index] = materia;
      // this.GuardarStorage();
    }
  }

  BorarMateria(id: number) {
    this.ControlMateria = this.ControlMateria.filter(m => m.id !== id);
    // this.GuardarStorage();
  }

  // private GuardarStorage() {
  //   this.storage.set('ControlMateria', this.ControlMateria);
  // }

  Promedio(materia: Materia): number {
    const notasPorCorte = [0, 0, 0, 0];
    const totalPorcentaje = [20, 20, 20, 40];
    materia.notas.forEach(nota => {
      notasPorCorte[nota.corte - 1] += nota.nota;
    });
    const promedio = notasPorCorte.reduce((total, nota, index) => total + (nota * totalPorcentaje[index] / 100), 0);
    return parseFloat(promedio.toFixed(2));
  }

  Paso(materia: Materia): boolean {
    const promedio = this.Promedio(materia);
    return promedio >= 3.0;
  }

}
