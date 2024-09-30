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
searchTerm: string = '';
notasPrimerCorte:Nota[] = [];
notasSegundoCorte: Nota[] = [];
notasTercerCorte: Nota[] = [];
notasCuartoCorte: Nota[] = [];
PrimerCorte = 0;
SegundoCorte = 0;
TercerCorte = 0;
CuartoCorte = 0;
PromedioCortes = 0;


Irnota: boolean = false;


  materia: Materia = {
    id: 1,
    nombre: '',
    semestre: '',
    codigo: '',
    horario: '',
    notas: [],
    observaciones: '',
    promedio: 1,
  };
  
  Promedio = 0;

  constructor(private controlMateriaService: ControlMateriaService, private controlNotaService: ControlNotaService, private router: Router, private activatedRoute: ActivatedRoute,   private alertController: AlertController) { }
  async ngOnInit() {
    this.materiaID = this.activatedRoute.snapshot.paramMap.get('materiaID');

    if(this.materiaID){
      await this.loadMateria(this.materiaID)
      await this.loadNotas();
      this.calcularPromedioCorte()
      this.titulo = this.materia.nombre
      this.editar = true;
    } else{
      this.materia.id = this.generarId();
    }
  }



  async loadMateria(id: number) {
    const controlMaterias = await this.controlMateriaService.getControlMateria();
    const materia = controlMaterias.find(m => m.id === Number(id)); // Asegúrate de convertir a número
    if (materia) {
      this.materia = { ...materia }; // Asigna los datos de la materia encontrada al objeto `materia`
      console.log("Materia cargada", this.materia);
    } else {
      console.error('Materia no encontrada');
    }
  }

  async loadNotas() {
    this.controlNota = await this.controlNotaService.getControlNota();
    const notasMateria = this.controlNota.filter(nota => nota.idMateria === this.materiaID)
    console.log(notasMateria)
    if(notasMateria){
      this.materia.notas = notasMateria.map(nota => nota.nota)
      console.log(this.materia.notas)
    }
  }

  //Para acualizar los datos de la pagina, refrescarla
  ActualizarPagina(event: any) {
    setTimeout(async () => {
      location.reload()
    }, 2000); 
  }


  GuardarMateria(){
    if(this.materiaID){
      this.actualizarMateria()
    } else{
      this.crearMateria()
    }
  }

  calcularPromedioCorte(){
    this.notasPrimerCorte = this.controlNota.filter(nota => nota.idMateria === this.materiaID && nota.corte === 1)
    this.notasSegundoCorte = this.controlNota.filter(nota => nota.idMateria === this.materiaID && nota.corte === 2)
    this.notasTercerCorte = this.controlNota.filter(nota => nota.idMateria === this.materiaID && nota.corte === 3)
    this.notasCuartoCorte = this.controlNota.filter(nota => nota.idMateria === this.materiaID && nota.corte === 4)

    this.notasPrimerCorte.forEach(nota =>{
      this.PrimerCorte += nota.nota;
    })
    this.notasSegundoCorte.forEach(nota =>{
      this.SegundoCorte += nota.nota;
    })
    this.notasTercerCorte.forEach(nota => {
      this.TercerCorte += nota.nota;
    })
    this.notasCuartoCorte.forEach(nota =>{
      this.CuartoCorte += nota.nota
    })
    this.PrimerCorte = (this.PrimerCorte / this.notasPrimerCorte.length);
    this.SegundoCorte = (this.SegundoCorte / this.notasSegundoCorte.length);
    this.TercerCorte = (this.TercerCorte / this.notasTercerCorte.length);
    this.CuartoCorte = (this.CuartoCorte/ this.notasCuartoCorte.length);

    this.Promedio = (this.PrimerCorte*0.2 || 0) + (this.SegundoCorte*0.2 || 0 ) + (this.TercerCorte*0.2 || 0) + (this.CuartoCorte*0.4 || 0)
    this.materia.promedio = this.Promedio
    this.controlMateriaService.ActualizarMateria(this.materia);
    console.log( 'Promedio materia', this.Promedio)
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
    this.materiaID = this.materia.id
    this.mostrarAlerta('Se creo la materia con exito')
  }

  // Para actualizarNota

  async actualizarMateria() {
    console.log("materia Cargada", this.materia)
    await this.controlMateriaService.ActualizarMateria(this.materia);
    await this.controlMateriaService.loadMaterias()
    this.router.navigate(['/inicio']);
}

  async IrNota(){
    if(this.materiaID){
      this.Irnota === false;
      } else {
      this.Irnota === true;
      this.crearMateria()
    }
  }

  // borrar nota de forma individual
  async borrarNota(id: number){
    await this.controlNotaService.BorrarNota(id)
  }

  generarId(): number {
    return Math.floor(Math.random() * 10000); 
  }

}

