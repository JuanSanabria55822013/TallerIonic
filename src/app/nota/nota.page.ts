import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonList, IonButton, IonInput, IonSelect, IonSelectOption } from '@ionic/angular/standalone';
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
    IonSelect,
    IonSelectOption,
    RouterModule,
    FormsModule,]
})
export class NotaPage implements OnInit{
MateriaID: any;
notaID: any;
TextGuardar = '';
editando: boolean = false;
  nota: Nota = { 
    id: 1,
    idMateria: 0,
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
  if(this.nota.nota > 5 || this.nota.nota < 0){
    alert("La nota no debe ser mayor a 5 o menor de 0")
    return;
  }


  if (this.notaID) {
    this.TextGuardar = 'Actualizar Nota'
    this.editando = true;
    await this.loadNota(this.notaID);
  } else {
    this.TextGuardar = 'Crear Nota'
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
GuardarNota(){
  if(this.notaID){
    this.actualizarNota()
  } else{
    this.crearNota()
  }
}

async actualizarNota() {
    await this.controlNotaService.ActualizarNota(this.nota);
  this.router.navigate(['/materia', this.nota.idMateria]);  // Redirigir a la materia después de guardar
}

  async crearNota() {
    this.nota.idMateria = this.MateriaID
    await this.controlNotaService.CrearNota(this.nota);
    this.router.navigate(['/materia', this.nota.idMateria])
  }


}
