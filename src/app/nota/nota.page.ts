import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonList, IonButton, IonDatetimeButton } from '@ionic/angular/standalone';
import { ControlNotaService } from '../services/nota.service';
import { Nota } from '../Models/nota'
import { Router } from '@angular/router';

@Component({
  selector: 'app-notas',
  templateUrl: './nota.page.html',
  styleUrls: ['./nota.page.scss'],
  standalone: true,
  imports: [IonButton, IonDatetimeButton, IonList, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonItem, IonLabel]
})
export class NotaPage implements OnInit {
  nota: Nota = { id: 0, corte: 1, nota: 0, descripcion: '', fechaEntrega: '', observaciones: '' };

  constructor(private controlNotaService:ControlNotaService, private router:Router) { }

  ngOnInit() {
  }
  
  async crearNota() {
    await this.controlNotaService.CrearNota(this.nota);
    await this.controlNotaService.loadNotas()
    this.router.navigate(['/materia'])
  }
}
