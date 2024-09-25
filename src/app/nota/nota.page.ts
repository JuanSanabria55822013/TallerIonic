import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonList, IonButton, IonInput } from '@ionic/angular/standalone';
import { ControlNotaService } from '../services/nota.service';
import { Nota } from '../Models/nota'
import { Router, ActivatedRoute,  RouterModule } from '@angular/router';

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
    RouterModule,
    FormsModule,]
})
export class NotaPage implements OnInit{
MateriaID: any;
notaID: any;
editando: boolean = false; 
  nota: Nota = { 
    idMateria: 0,
    id: 1, 
    corte: 1,
    nota: 0, 
    descripcion: '',
    fechaEntrega: '',
    observaciones: ''
    };

  constructor(private controlNotaService:ControlNotaService, private router:Router, private activatedRoute: ActivatedRoute) { }

async ngOnInit(){ 
  this.notaID = this.activatedRoute.snapshot.paramMap.get('NotaId')
  this.MateriaID = this.activatedRoute.snapshot.paramMap.get('MateriaId')
  this.nota.idMateria = this.MateriaID

  if (this.notaID) {
    // Si hay un notaId, estamos editando una nota
    this.editando = true;
    await this.loadNota(this.notaID);
  } else {
    // Si no hay notaId, estamos creando una nueva nota
    this.editando = false;
  }

}
async loadNota(id: number) {
  const nota = await this.controlNotaService.getNota(id);
  if (nota) {
    this.nota = nota;
  } else {
    console.error('Nota no encontrada');
  }
}

async guardarNota() {
  if (this.editando === true) {
    // Si estamos editando, actualizamos la nota
    await this.controlNotaService.ActualizarNota(this.nota);
  } else {
    // Si estamos creando una nueva nota
    this.nota.idMateria = this.MateriaID;  // Asegurarse de asignar la materia
    await this.controlNotaService.CrearNota(this.nota);
  }

  this.router.navigate(['/materia', this.MateriaID]);  // Redirigir a la materia después de guardar
}

  async crearNota() {
    await this.controlNotaService.CrearNota(this.nota);
    this.router.navigate(['/materia'])
  }
}
