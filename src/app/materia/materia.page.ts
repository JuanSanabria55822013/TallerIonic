import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms';
import { IonContent, IonHeader,
   IonTitle, IonToolbar,
    IonItem, IonLabel, 
    IonButton, IonInput,
     IonList, IonCard, 
     IonCardHeader, IonCardTitle,
      IonCardContent, IonButtons,
       IonMenu, IonMenuButton,
        IonCardSubtitle, IonSearchbar, IonRefresherContent, IonRefresher } from '@ionic/angular/standalone';
import { ControlMateriaService } from '../services/control-materia.service';
import { ControlNotaService } from '../services/nota.service';
import { Materia } from '../Models/materia';
import { Nota } from '../Models/nota';
import { Router, RouterModule, ActivatedRoute } from '@angular/router'; // Importar Rutas
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-materia',
  templateUrl: './materia.page.html',
  styleUrls: ['./materia.page.scss'],
  standalone: true,
  imports: [IonRefresher, IonRefresherContent, IonCardSubtitle, IonButtons,
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
    IonSearchbar,
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
searchTerm: string = '';

Irnota: boolean = false;


  materia: Materia = {
    id: 1,
    nombre: '',
    semestre: '',
    codigo: '',
    horario: '',
    notas: [],
    observaciones: ''
  };

  constructor(private controlMateriaService: ControlMateriaService, private controlNotaService: ControlNotaService, private router: Router, private activatedRoute: ActivatedRoute,   private alertController: AlertController) { }
  async ngOnInit() {
    this.materiaID = this.activatedRoute.snapshot.paramMap.get('materiaID'); // Obtener materiaID al inicio
    await this.loadNotas();
    console.log(this.controlNota.filter(nota => nota.corte === 1))
    if(this.materiaID){
      await this.loadMateria(this.materiaID)
      this.titulo = this.materia.nombre
      this.editar = true;
      this.filtrarNotasMateria()
    }


  }

  //Buscar  Notas
  
  buscarNotas(event: any) {
    const searchValue = event.target.value.toLowerCase();

    for (let corte of [1, 2, 3, 4]) {
      this.notasFiltradasCorte[corte] = this.controlNota.filter(nota =>
        nota.descripcion.toLowerCase().includes(searchValue) && nota.corte === corte
      );
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
    const notasMateria = this.controlNota.filter(nota => nota.idMateria === this.materiaID)
    if(notasMateria){
      this.materia.notas = notasMateria.map(nota => nota.nota)
    }
    this.materiaID = this.activatedRoute.snapshot.paramMap.get('materiaID')

  }

  //Para acualizar los datos de la pagina, refrescarla
  ActualizarPagina(event: any) {
    setTimeout(async () => {
      location.reload()
      await this.loadNotas();
      event.target.complete(); 
    }, 2000); 
  }


  GuardarMateria(){
    if(this.materiaID){
      this.actualizarMateria()
    } else{
      this.crearMateria()
    }
  }


  filtrarNotasMateria() {
    const cortes = [1,2,3,4]; // Define los cortes

    // Filtrar las notas por idMateria y corte al mismo tiempo
    cortes.forEach(corte => {
      this.notasFiltradasCorte[corte] = this.controlNota.filter(nota =>
        nota.idMateria === this.materia.id && nota.corte === corte
      );
      console.log(this.controlNota.filter(nota => nota.corte === corte))  
    });
  }


  //   
  async confirmarEliminarNota(id: number) {
    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: '¿Estás seguro de que quieres eliminar esta nota?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Eliminación cancelada');
          }
        },
        {
          text: 'Eliminar',
          handler: async () => {
            await this.borrarNota(id);
            console.log('Nota eliminada');
            this.mostrarAlerta('Nota eliminada con éxito');
            location.reload();
          }
        }
      ]
    });
  
    await alert.present();
  }
 
  async mostrarAlerta(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Éxito',
      message: mensaje,
      buttons: ['OK']
    });
    await this.controlMateriaService.loadMaterias()
    await alert.present();
  }

  // crear la materia, guardarla en el storage
  async crearMateria() {
    await this.controlMateriaService.CrearMateria(this.materia); // Guardar materia
    await this.controlMateriaService.loadMaterias()
    if(this.Irnota === false){
      this.router.navigate(['/inicio']); 
    }
     // Navegar de vuelta al inicio
    this.mostrarAlerta('Materia guardada con éxito');
  }

  // Para actualizarNota

  async actualizarMateria() {
    await this.controlMateriaService.ActualizarMateria(this.materia);
    this.router.navigate(['/inicio']);
}

  async IrNota(){
    if(this.materiaID){
      this.Irnota === false;
      } else {
      this.crearMateria()
      this.Irnota === true;
    }
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

