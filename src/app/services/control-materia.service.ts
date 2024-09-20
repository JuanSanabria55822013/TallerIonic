import { Storage } from '@ionic/storage-angular';
import { Materia } from '../Models/materia';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ControlMateriaService {
  private ControlMateria: Materia[] = [];
  private STORAGE_KEY = 'Control';

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this.storage = storage;
    await this.loadMaterias();  // Cargar materias una vez creado el Storage
  }

  async loadMaterias() {
    let materias = await this.storage.get(this.STORAGE_KEY);
    if (materias) {
      this.ControlMateria = materias;
    } else {
      this.ControlMateria = [];  // Si no hay materias, inicializa como arreglo vacío
    }
  }


  async getControlMateria(): Promise<Materia[]> {
    await this.loadMaterias();
    return this.ControlMateria;
  }

  getMateria(id: number) {
    return this.ControlMateria.find(m => m.id === id);
  }

  async CrearMateria(materia: Materia) {
    this.ControlMateria.push(materia);
    await this.GuardarStorage();  // Guardar después de crear
  }

  async ActualizarMateria(materia: Materia) {
    const index = this.ControlMateria.findIndex(m => m.id === materia.id);
    if (index !== -1) {
      this.ControlMateria[index] = materia;
      await this.GuardarStorage();
    }
  }

  async BorrarMateria(id: number) {
    this.ControlMateria = this.ControlMateria.filter(m => m.id !== id);
    this.GuardarStorage();
  }

  private async GuardarStorage() {
    await this.storage.set(this.STORAGE_KEY, this.ControlMateria);
    this.loadMaterias();
  }

  public async clear(){
    this.storage.clear();
    this.ControlMateria = [];
    this.loadMaterias();
  }

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

