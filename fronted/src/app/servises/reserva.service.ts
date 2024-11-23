import { Injectable } from '@angular/core';
import { Servicio } from './servicio.service'; // Ajusta la ruta según tu estructura

interface Reserva {
  servicio: Servicio;
  precioTotal: number;
  opcionesSeleccionadas: any[];
}

@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  private reservaActual: Reserva | null = null;

  guardarReserva(servicio: Servicio, precioTotal: number, opcionesSeleccionadas: any[]): void {
    this.reservaActual = { servicio, precioTotal, opcionesSeleccionadas };
  }

  obtenerReserva(): Reserva | null {
    return this.reservaActual;
  }

  limpiarReserva(): void {
    this.reservaActual = null;
  }
}