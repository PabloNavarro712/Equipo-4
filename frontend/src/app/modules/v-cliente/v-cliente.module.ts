import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetallesEventosComponent } from './detalles-eventos/detalles-eventos.component';
import { InicioClienteModule } from './inicio-cliente/inicio-cliente.module';  // Importa InicioClienteModule
import { NosotrosComponent } from './nosotros/nosotros.component';
import { PlantillaModule } from './plantilla/plantilla.module';  // Asegúrate de importar el módulo PlantillaModule
import { VistaServiciosComponent } from './vista-servicios/vista-servicios.component';
import { ReservacionComponent } from './vista-servicios/reservacion/reservacion.component';
import { RouterModule } from '@angular/router';  // Importa RouterModule
import { FormsModule } from '@angular/forms';  // Agrega FormsModule aquí
import { LoginComponent } from './plantilla/login/login.component';
import { AyudaComponent } from './ayuda/ayuda.component';
// Rutas internas
import { VClienteRoutingModule } from './v-cliente-routing.module';

@NgModule({
  declarations: [
    DetallesEventosComponent,
    NosotrosComponent,
    LoginComponent,
    VistaServiciosComponent,
     ReservacionComponent,
     AyudaComponent
  ],
  imports: [
    CommonModule,
    
    InicioClienteModule,
    PlantillaModule,  RouterModule,
    FormsModule,
    VClienteRoutingModule
  ]
})
export class VClienteModule { }
