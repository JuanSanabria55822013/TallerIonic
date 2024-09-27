import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent,
   IonHeader,
    IonTitle, 
    IonToolbar, 
    IonList, IonItem, 
    IonLabel, IonButton, 
    IonMenu, IonButtons, 
    IonMenuButton, IonIcon,
     IonSearchbar, IonRefresher, IonRefresherContent } from '@ionic/angular/standalone';
import { ControlMateriaService } from '../services/control-materia.service';
import { ControlNotaService } from '../services/nota.service';
import { Materia } from '../Models/materia';
import { Nota } from '../Models/nota';
import { RouterModule } from '@angular/router';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  standalone: true,
  imports: [IonRefresherContent, IonRefresher, IonIcon, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonList, IonItem, IonLabel, IonButton, IonMenu, IonMenuButton, RouterModule, IonSearchbar]
})
export class InicioPage implements OnInit {
  controlMateria: Materia[] = [];
  controlNota: Nota[] = [];
  searchTerm: string = '';
  Promedio = [];
  

  constructor(private controlMateriaService: ControlMateriaService, private controlNotaService: ControlNotaService, private alertController: AlertController) { }

  async ngOnInit() {
    await this.loadMaterias();
    console.log('Materias cargadas:', this.controlMateria);

  }

  // Método para cargar las materias de forma asíncrona
  async loadMaterias() {
    this.controlMateria = await this.controlMateriaService.getControlMateria();
  }
  
  async clearStorage(){
    await this.controlMateriaService.clear();
    this.controlMateria = []
  }

  async buscarMaterias(event: any) {
    const searchValue = event.target.value.toLowerCase();

    // Filtrar materias por nombre
    this.controlMateria = (await (this.controlMateriaService.getControlMateria())).filter(materia =>
      materia.nombre.toLowerCase().includes(searchValue)
    );

  }

  ActualizarPagina(event: any) {
    setTimeout(async () => {
      location.reload()
      await this.loadMaterias();
      event.target.complete(); 
    }, 2000); // Simula un tiempo de espera
  }

  async confirmarEliminarMateria(id: number) {
    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: '¿Estás seguro de que quieres eliminar esta materia?',
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
            await this.controlMateriaService.BorrarMateria(id); // Suponiendo que tienes un método para borrar la materia
            console.log('Materia eliminada');
            this.mostrarAlerta('Materia eliminada con éxito');
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
  
    await alert.present();
  }

}
