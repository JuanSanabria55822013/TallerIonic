import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonList, IonButton, IonInput } from '@ionic/angular/standalone';
import { ControlNotaService } from '../services/nota.service';
import { Nota } from '../Models/nota'
import { Router } from '@angular/router';

@Component({
  selector: 'app-notas',
  templateUrl: './nota.page.html',
  styleUrls: ['./nota.page.scss'],
  standalone: true,
  imports: [IonInput, 
    IonButton,
    IonList,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    IonItem,
    IonLabel,
    FormsModule,]
})
export class NotaPage {
  nota: Nota = { 
    id: 0, 
    corte: 1,
    nota: 0, 
    descripcion: '',
    fechaEntrega: '',
    observaciones: ''
    };

  constructor(private controlNotaService:ControlNotaService, private router:Router) { }
  
  async crearNota() {
    await this.controlNotaService.CrearNota(this.nota);
    await this.controlNotaService.loadNotas()
    this.router.navigate(['/materia'])
  }
}
