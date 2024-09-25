import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonButton, IonInput, IonList, IonCard } from '@ionic/angular/standalone';
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
  imports: [IonCard, IonList,
    IonInput,
    IonContent, 
    IonHeader,
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
controlNota: Nota[] = [];
materiaID: any;
editar: boolean = false;

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
      this.editar = true;
      await this.loadMateria(this.materiaID)
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

  async crearMateria() {
    await this.controlMateriaService.CrearMateria(this.materia); // Guardar materia
    await this.controlMateriaService.loadMaterias()
    this.router.navigate(['/inicio']);  // Navegar de vuelta al inicio
    
  }
  irANota() {
    this.router.navigate([`/nota/`,this.materia.id]);
  }

  async clearStorage(){
    await this.controlNotaService.clear();
    this.controlNota = []
  }

  async borrarNota(id: number){
    await this.controlNotaService.BorrarNota(id)
  }

}

