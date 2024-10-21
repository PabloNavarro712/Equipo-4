import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InicioComponent } from './_inicio/inicio/inicio.component';
import { CarruselComponent } from './_inicio/carrusel/carrusel.component';
import { GaleriaCategoriaComponent } from './_inicio/galeria-categoria/galeria-categoria.component';
import { GradienteComponent } from './_inicio/gradiente/gradiente.component';
import { TextoImagenComponent } from './_inicio/texto-imagen/texto-imagen.component';
import { ServiciosComponent } from './_Servicios/servicios/servicios.component';
import { NuestraHistoriaComponent } from './_NuestraHistoria/nuestra-historia/nuestra-historia.component';



@NgModule({
  declarations: [
    InicioComponent,
    CarruselComponent,
    GaleriaCategoriaComponent,
    GradienteComponent,
    TextoImagenComponent,
    ServiciosComponent,
    NuestraHistoriaComponent
  ],
  imports: [
    FormsModule,
    CommonModule
  ],
  exports: [
    InicioComponent 
  ]
})
export class VistaClienteModule { 
  

}