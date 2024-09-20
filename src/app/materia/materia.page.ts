import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonButton, IonInput, IonList } from '@ionic/angular/standalone';
import { ControlMateriaService } from '../services/control-materia.service';
import { ControlNotaService } from '../services/nota.service';
import { Materia } from '../Models/materia';
import { Nota } from '../Models/nota';
import { Router } from '@angular/router'; // Importar Router

@Component({
  selector: 'app-materia',
  templateUrl: './materia.page.html',
  styleUrls: ['./materia.page.scss'],
  standalone: true,
  imports: [IonList, IonInput, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, IonItem, IonLabel, IonButton, FormsModule]
})
export class MateriaPage implements OnInit {
controlNota: Nota[] = [];

  materia: Materia = { 
    id: 1, 
    nombre: '', 
    semestre: '', 
    codigo: '', 
    horario: '', 
    notas: [], 
    observaciones: '' 
  };
  constructor(private controlMateriaService: ControlMateriaService, private controlNotaService: ControlNotaService, private router: Router) { }
  async ngOnInit(): Promise<void> {
    await this.loadNotas();
  }

  async loadNotas() {
    this.controlNota = await this.controlNotaService.getControlNota();
  }

  async crearMateria() {
    await this.controlMateriaService.CrearMateria(this.materia); // Guardar materia
    await this.controlMateriaService.loadMaterias()
    this.router.navigate(['/inicio']);  // Navegar de vuelta al inicio
    
  }
  irANota() {
    this.router.navigate([`/nota`]);
  }

  async clearStorage(){
    await this.controlNotaService.clear();
    this.controlNota = []
  }
}

