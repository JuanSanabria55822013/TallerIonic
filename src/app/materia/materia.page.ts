import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { ControlMateriaService } from '../services/control-materia.service';
import { Materia } from '../Models/materia';

@Component({
  selector: 'app-materia',
  templateUrl: './materia.page.html',
  styleUrls: ['./materia.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class MateriaPage{

  materia: Materia = { id: Date.now(), nombre: '', semestre: '', codigo: '', horario: '', notas: [], observaciones: '' };

  constructor(private controlMateriaService: ControlMateriaService) { }

  ngOnInit() {
    this.controlMateriaService.CrearMateria(this.materia)
  }

}
