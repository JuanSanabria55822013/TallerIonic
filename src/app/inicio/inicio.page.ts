import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonButton, IonMenu, IonButtons, IonMenuButton } from '@ionic/angular/standalone';
import { ControlMateriaService } from '../services/control-materia.service';
import { Materia } from '../Models/materia';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  standalone: true,
  imports: [IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonList, IonItem, IonLabel, IonButton, IonMenu, IonMenuButton]
})
export class InicioPage implements OnInit {
  controlMateria: Materia[] = [];
  
  constructor(private controlMateriaService: ControlMateriaService, private router: Router ) { }

  async ngOnInit() {
    // Asegurarse de que los datos se carguen correctamente desde el Storage
    await this.loadMaterias();
    console.log('Materias cargadas:', this.controlMateria);
  }

  // Método para cargar las materias de forma asíncrona
  async loadMaterias() {
    this.controlMateria = await this.controlMateriaService.getControlMateria();
  }

  EstadoMateria(materia: Materia){
    return this.controlMateriaService.Paso(materia) ? 'Pasa' : 'Pierde';
  }

  irAMateria() {
    this.router.navigate([`/materia`]);
  }

  async clearStorage(){
    await this.controlMateriaService.clear();
    this.controlMateria = []
  }
}
