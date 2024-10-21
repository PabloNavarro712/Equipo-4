import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminGaleriaEditorComponent } from './salpicadero/admin-galeria-editor/admin-galeria-editor.component';
import { FormsModule } from '@angular/forms';
import { HomeAdminComponent } from './home/home-admin/home-admin.component';
import { CalendarioAdminComponent } from './home/home-admin/calendario-admin/calendario-admin.component';
import { PanelEdicionComponent } from './salpicadero/panel-edicion/panel-edicion.component';

@NgModule({
  declarations: [
    AdminGaleriaEditorComponent,
    HomeAdminComponent,
    CalendarioAdminComponent,
    PanelEdicionComponent

  ],
  imports: [
    CommonModule,
    FormsModule
  
  ]
})
export class VistaAdminModule { }