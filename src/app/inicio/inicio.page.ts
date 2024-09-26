import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonButton, IonMenu, IonButtons, IonMenuButton, IonIcon, IonSearchbar } from '@ionic/angular/standalone';
import { ControlMateriaService } from '../services/control-materia.service';
import { ControlNotaService } from '../services/nota.service';
import { Materia } from '../Models/materia';
import { Nota } from '../Models/nota';
import { RouterModule } from '@angular/router'; 

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  standalone: true,
  imports: [IonIcon, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonList, IonItem, IonLabel, IonButton, IonMenu, IonMenuButton, RouterModule, IonSearchbar]
})
export class InicioPage implements OnInit {
  controlMateria: Materia[] = [];
  controlNota: Nota[] = [];
  searchTerm: string = '';
  

  constructor(private controlMateriaService: ControlMateriaService, private controlNotaService: ControlNotaService) { }

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

  async buscarMateriasYNotas(event: any) {
    const searchValue = event.target.value.toLowerCase();

    // Filtrar materias por nombre
    this.controlMateria = (await (this.controlMateriaService.getControlMateria())).filter(materia =>
      materia.nombre.toLowerCase().includes(searchValue)
    );

    // Filtrar notas por descripción
    this.controlNota = (await (this.controlNotaService.getControlNota())).filter(nota =>
      nota.descripcion.toLowerCase().includes(searchValue)
    );
  }
}
