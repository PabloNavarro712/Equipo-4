import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminGaleriaEditorComponent } from './salpicadero/admin-galeria-editor/admin-galeria-editor.component';
import { FormsModule } from '@angular/forms';
import { HomeAdminComponent } from './home/home-admin/home-admin.component';
import { PanelEdicionComponent } from './salpicadero/panel-edicion/panel-edicion.component';

// Angular Material modules
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDatepickerModule } from '@angular/material/datepicker'; // AÑADIR ESTE MÓDULO
import { MatNativeDateModule } from '@angular/material/core'; // AÑADIR ESTE MÓDULO

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { EditarServicioComponent } from './editar-servicio/editar-servicio.component';
import { ServiceDialogComponent } from './service-dialog/service-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EventosAdminComponent } from './editar_evento/eventos-admin/eventos-admin.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarioComponent } from './home/calendario/calendario.component';
@NgModule({
  declarations: [
    AdminGaleriaEditorComponent,
    HomeAdminComponent,
    PanelEdicionComponent,
    EditarServicioComponent,
    ServiceDialogComponent,
    EventosAdminComponent,
    CalendarioComponent
  ],
  imports: [
    FullCalendarModule,
    NgbModule,
    ReactiveFormsModule,
    MatDialogModule,
    CommonModule,
    FormsModule,
    MatCardModule,
    MatGridListModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatNativeDateModule
  ]
})
export class VistaAdminModule { }