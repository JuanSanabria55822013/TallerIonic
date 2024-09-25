import { Storage } from '@ionic/storage-angular';
import { Materia } from '../Models/materia';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ControlMateriaService {
  private ControlMateria: Materia[] = [];
  private STORAGENOTA_KEY = 'Control';

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this.storage = storage;
    await this.loadMaterias();  // Cargar materias una vez creado el Storage
  }

  async loadMaterias() {
    let materias = await this.storage.get(this.STORAGENOTA_KEY);
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
    await this.storage.set(this.STORAGENOTA_KEY, this.ControlMateria);
    this.loadMaterias();
  }

  public async clear(){
    this.storage.clear();
    this.ControlMateria = [];
    this.loadMaterias();
  }
  
}

