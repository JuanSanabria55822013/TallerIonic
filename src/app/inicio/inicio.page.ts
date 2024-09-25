import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonButton, IonMenu, IonButtons, IonMenuButton } from '@ionic/angular/standalone';
import { ControlMateriaService } from '../services/control-materia.service';
import { Materia } from '../Models/materia';
import { RouterModule } from '@angular/router'; 

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  standalone: true,
  imports: [IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonList, IonItem, IonLabel, IonButton, IonMenu, IonMenuButton, RouterModule]
})
export class InicioPage implements OnInit {
  controlMateria: Materia[] = [];
  
  constructor(private controlMateriaService: ControlMateriaService) { }

  async ngOnInit() {
    await this.loadMaterias();
    console.log('Materias cargadas:', this.controlMateria);

  }

  // Método para cargar las materias de forma asíncrona
  async loadMaterias() {
    this.controlMateria = await this.controlMateriaService.getControlMateria();
  }
  
  async clearStorage(){
    await this.controlMateriaService.clear();
    this.controlMateria = []
  }
}
