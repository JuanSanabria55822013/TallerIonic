import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonButton, IonInput, IonList, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButtons, IonMenu, IonMenuButton } from '@ionic/angular/standalone';
import { ControlMateriaService } from '../services/control-materia.service';
import { ControlNotaService } from '../services/nota.service';
import { Materia } from '../Models/materia';
import { Nota } from '../Models/nota';
import { Router, RouterModule, ActivatedRoute } from '@angular/router'; // Importar Rutas

@Component({
  selector: 'app-materia',
  templateUrl: './materia.page.html',
  styleUrls: ['./materia.page.scss'],
  standalone: true,
  imports: [IonButtons,
    IonCardContent,
    IonCardTitle,
    IonCardHeader,
    IonCard,
    IonList,
    IonInput,
    IonContent,
    IonHeader,
    IonMenu,
    IonMenuButton,
    IonTitle,
    IonToolbar,
    CommonModule,
    IonItem,
    IonLabel,
    IonButton,
    RouterModule,
    FormsModule]
})
export class MateriaPage implements OnInit {
controlMateria: Materia[] = [];
controlNota: Nota[] = [];
materiaID: any;
editar: boolean = false;
titulo = 'Crear Materia'
notasFiltradasCorte: { [corte: number]: Nota[] } = {};


  materia: Materia = {
    id: 1,
    nombre: '',
    semestre: '',
    codigo: '',
    horario: '',
    notas: [],
    observaciones: ''
  };
  constructor(private controlMateriaService: ControlMateriaService, private controlNotaService: ControlNotaService, private router: Router, private activatedRoute: ActivatedRoute) { }
  async ngOnInit() {
    this.materiaID = this.activatedRoute.snapshot.paramMap.get('materiaID')
    await this.loadNotas();

    if(this.materiaID){
      await this.loadMateria(this.materiaID)
      console.log(this.materia.nombre)
      this.titulo = this.materia.nombre
      this.editar = true;
      this.filtrarNotasMateria()
      console.log(this.notasFiltradasCorte)
    }
  }

  async loadMateria(id: number){
    const materia = await this.controlMateriaService.getMateria(id);
    if(materia){
      this.materia = materia;
    } else {
      console.error('Materia no encontrada')
    }
  }
  async loadNotas() {
    this.controlNota = await this.controlNotaService.getControlNota();
  }

  filtrarNotasMateria() {
    const cortes = [1, 2, 3, 4]; // Define los cortes

    cortes.forEach(corte => {
      // Filtrar por materia y corte al mismo tiempo
      this.notasFiltradasCorte[corte] = this.controlNota.filter(nota =>
        nota.idMateria === this.materia.id && nota.corte === corte
      );
    });
  }


  // crear la materia, guardarla en el storage
  async crearMateria() {
    await this.controlMateriaService.CrearMateria(this.materia); // Guardar materia
    await this.controlMateriaService.loadMaterias()
    this.router.navigate(['/inicio']);  // Navegar de vuelta al inicio

  }

  // para ir a crear una nueva nota y guardar la materia de paso
  async irANota() {
    this.router.navigate([`/nota/`,this.materia.id])
    await this.controlMateriaService.CrearMateria(this.materia);;
  }

  // limpiar todo el storage de notas
  async clearStorage(){
    await this.controlNotaService.clear();
    this.controlNota = []
  }

  // borrar nota de forma individual
  async borrarNota(id: number){
    await this.controlNotaService.BorrarNota(id)
  }

}

