import { Component, Input, OnInit } from '@angular/core';
import { Servicio } from './../../../servises/servicio.service';
import { NgForm } from '@angular/forms';
import { EventosService } from 'src/app/servises/eventos.service';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit {
  @Input() servicioSeleccionado?: Servicio;
  diasDeLaSemana: string[] = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  dias: number[] = [];
  mes: number = new Date().getMonth();
  anio: number = new Date().getFullYear();
  fechaSeleccionada: Date | null = null;
  fechasNoSeleccionables: Date[] = []; 

  usuario: string = 'usuarioTest';  
  idCliente: string = 'cliente123';

  constructor(private eventosService: EventosService) {}

  ngOnInit() {
    this.generarDias(); 
    this.obtenerFechasNoSeleccionables();
  }

  obtenerFechasNoSeleccionables() {
    this.eventosService.getFechasEventos().subscribe(fechas => {
      this.fechasNoSeleccionables = fechas.map(fechaString => new Date(fechaString));
    });
  }

  generarDias() {
    this.dias = [];
    const fecha = new Date(this.anio, this.mes + 1, 0);
    const totalDias = fecha.getDate();
    const primerDiaDelMes = new Date(this.anio, this.mes, 1).getDay();

    for (let i = 0; i < primerDiaDelMes; i++) {
      this.dias.push(0);
    }
    for (let dia = 1; dia <= totalDias; dia++) {
      this.dias.push(dia);
    }
  }

  navegarMes(direccion: number) {
    this.mes += direccion;
    if (this.mes < 0) {
      this.mes = 11;
      this.anio--;
    } else if (this.mes > 11) {
      this.mes = 0;
      this.anio++;
    }
    this.generarDias();
  }

  seleccionarFecha(dia: number) {
    if (this.isSelectable(dia)) {
      this.fechaSeleccionada = new Date(this.anio, this.mes, dia);
      console.log('Fecha seleccionada:', this.fechaSeleccionada);
    }
  }

  isToday(dia: number): boolean {
    const hoy = new Date();
    return hoy.getFullYear() === this.anio && hoy.getMonth() === this.mes && hoy.getDate() === dia;
  }

  isSelectable(dia: number): boolean {
    if (dia <= 0) return false;

    const fechaSeleccionada = new Date(this.anio, this.mes, dia);
    const hoy = new Date();
    const maniana = new Date(hoy);
    maniana.setDate(hoy.getDate() + 1);

    const esPasado = fechaSeleccionada < maniana || fechaSeleccionada.toDateString() === hoy.toDateString();
    const esDiaNoSeleccionable = this.fechasNoSeleccionables.some(
      fecha => fecha.toDateString() === fechaSeleccionada.toDateString()
    );

    return !esPasado && !esDiaNoSeleccionable;
  }

  enviarFormulario(form: NgForm) {
    if (form.valid && this.servicioSeleccionado && this.fechaSeleccionada) {
      const evento = {
        id_del_cliente: this.idCliente, 
        usuario: this.usuario,
        descripcion: `Reserva del servicio: ${this.servicioSeleccionado.titulo}`,
        servicio_seleccionado: this.servicioSeleccionado.titulo,
        estado_evento: 'activo',
        tipo_evento: 'Boda', 
        nombre_contacto: form.value.nombre, 
        numero_telefono: form.value.numero,
        direccion_local: form.value.direccion,
        fecha_evento: this.fechaSeleccionada.toISOString(),
        hora: form.value.hora 
      };
      
      this.eventosService.createEvento(evento).subscribe({
        next: (respuesta) => {
          console.log('Evento guardado con éxito:', respuesta);
          form.resetForm();
        },
        error: (error) => console.error('Error al guardar el evento:', error)
      });
    }
  }

  calcularPrecioTotal(): number {
    if (this.servicioSeleccionado) {
      return this.servicioSeleccionado.opciones.reduce((total, opcion) => {
        return opcion.seleccionada ? total + opcion.precio : total;
      }, 0);
    }
    return 0;
  }
}
