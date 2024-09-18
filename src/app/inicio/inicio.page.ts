import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonButton } from '@ionic/angular/standalone';
import { ControlMateriaService } from '../services/control-materia.service';
import { Materia } from '../Models/materia';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonList, IonItem, IonLabel, IonButton]
})
export class InicioPage implements OnInit {
  controlMateria: Materia[] = [];
  
  constructor( private controlMateriaService: ControlMateriaService) { }

  ngOnInit() {
    this.controlMateria = this.controlMateriaService.getControlMateria();

  }

  EstadoMateria(materia: Materia){
    return this.controlMateriaService.Paso(materia)? 'Pasa' : 'Pierde';
  }
}
