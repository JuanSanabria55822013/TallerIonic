import { Storage } from '@ionic/storage-angular';
import { Nota } from '../Models/nota';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ControlNotaService {
  private ControlNota: Nota[] = [];
  private STORAGE_KEY = 'Nota';

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this.storage = storage;
    await this.loadNotas();  // Cargar Notas una vez creado el Storage
  }

  async loadNotas() {
    let Notas = await this.storage.get(this.STORAGE_KEY);
    if (Notas) {
      this.ControlNota = Notas;
    } else {
      this.ControlNota = [];  // Si no hay Notas, inicializa como arreglo vacío
    }
  }

  async getControlNota(): Promise<Nota[]> {
    await this.loadNotas();
    return this.ControlNota;
  }

  getNota(id: number) {
    return this.ControlNota.find(m => m.id === id);
  }

  async CrearNota(Nota: Nota) {
    this.ControlNota.push(Nota);
    await this.GuardarStorage();  // Guardar después de crear
  }

  async ActualizarNota(Nota: Nota) {
    const index = this.ControlNota.findIndex(m => m.id === Nota.id);
    if (index !== -1) {
      this.ControlNota[index] = Nota;
      await this.GuardarStorage();
    }
  }

  async BorrarNota(id: number) {
    this.ControlNota = this.ControlNota.filter(m => m.id !== id);
    this.GuardarStorage();
  }

  private async GuardarStorage() {
    await this.storage.set(this.STORAGE_KEY, this.ControlNota);
    this.loadNotas();
  }

  public async clear(){
    this.storage.clear();
    this.ControlNota = [];
    this.loadNotas();
  }

}

