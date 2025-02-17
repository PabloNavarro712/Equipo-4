import { Component, OnInit } from '@angular/core';
import { EventosService } from 'src/services/api/eventos/eventos.service';
import { IEvento} from 'src/models/ievento.metadata'
import Swal from 'sweetalert2';
@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {
  reservas: IEvento[] = [];
  reservasFiltradas:IEvento[] = [];
  filtros = {
    fecha: '',
    tipoEvento: '',
    estadoEvento: ''
  };
  reservaSeleccionada: IEvento | null = null;
  modoEdicion = false;
  reservaCancelacion: any = null;
  constructor(private eventosService: EventosService) {}

  ngOnInit(): void {
    this.cargarReservas();
    
  }
  mostrarSolicitudCancelacion(reserva: any) {
    this.reservaCancelacion = reserva;
  }
  cerrarSolicitudCancelacion() {
    this.reservaCancelacion = null;
  }
   // Convertir la fecha al formato adecuado para el <input type="date">

  // Cargar todas las reservas desde el servicio
// Cargar todas las reservas desde el servicio
cargarReservas(): void {
  this.eventosService.getAll().subscribe({
    next: (response) => {
      if (!response.error && response.data) {
        this.reservas = response.data;
        this.aplicarFiltros();
      } else {
        Swal.fire('Error', response.msg || 'No se encontraron eventos.', 'error');
      }
    },
    error: (error) => {
      Swal.fire('Error', 'Hubo un error al cargar los eventos.', 'error');
      console.error('Error al cargar los eventos:', error);
    }
  });
}


  // Aplicar filtros a las reservas
  aplicarFiltros(): void {
    this.reservasFiltradas = this.reservas.filter((reserva) => {
      const cumpleFecha =
        !this.filtros.fecha || new Date(reserva.fechaEvento).toISOString().split('T')[0] === this.filtros.fecha;
      const cumpleTipo = !this.filtros.tipoEvento || reserva.tipoEvento === this.filtros.tipoEvento;
      const cumpleEstado = !this.filtros.estadoEvento || reserva.estado === this.filtros.estadoEvento;
      return cumpleFecha && cumpleTipo && cumpleEstado;
    });
  }

  // Ver detalles de una reserva
  verDetalles(reserva: IEvento): void {
    this.reservaSeleccionada = { ...reserva };
    this.modoEdicion = false;
  }

  // Activar modo edición
  activarEdicion(): void {
    this.modoEdicion = true;
  }

  // Cerrar el modal
  cerrarModal(): void {
    this.reservaSeleccionada = null;
    this.modoEdicion = false;
  }
  formatearFecha(): void {
    if (this.reservaSeleccionada?.fechaEvento) {
      const fechaSeleccionada = new Date(this.reservaSeleccionada.fechaEvento);
      if (!isNaN(fechaSeleccionada.getTime())) {
        // Establecer la hora UTC a las 06:00
        fechaSeleccionada.setUTCHours(6, 0, 0, 0);
        // Convertir al formato ISO
        this.reservaSeleccionada.fechaEvento = fechaSeleccionada.toISOString();
        console.log("Fecha formateada en formato ISO:", this.reservaSeleccionada.fechaEvento);
      } else {
        console.error("La fecha seleccionada no es válida.");
      }
    }
  }
  
  
  // Guardar cambios en el evento
// Guardar cambios en el evento
guardarCambios(): void {
  if (!this.reservaSeleccionada) return;

  // Validar y convertir la fechaEvento
  if (typeof this.reservaSeleccionada.fechaEvento === 'string') {
    const fechaEventoDate = new Date(this.reservaSeleccionada.fechaEvento);
    if (!isNaN(fechaEventoDate.getTime())) {
      this.reservaSeleccionada.fechaEvento = fechaEventoDate.toISOString();
    } else {
      console.error("Fecha inválida. No se puede guardar.");
      Swal.fire('Error', 'La fecha seleccionada no es válida.', 'error');
      return;
    }
  }

  // Establecer valores adicionales antes de enviar
  this.reservaSeleccionada.solicitud_cancelar = false;
  this.reservaSeleccionada.reagendar = false;

  // Llamada al servicio para actualizar
  this.eventosService.update(this.reservaSeleccionada.id!, this.reservaSeleccionada).subscribe({
    next: (response) => {
      if (!response.error && response.data) {
        // Actualizar la lista de reservas localmente
        const index = this.reservas.findIndex(
          (reserva) => reserva.idCliente === this.reservaSeleccionada?.idCliente
        );
        if (index > -1) {
          this.reservas[index] = response.data;
          this.aplicarFiltros();
        }
        this.cerrarModal();
        Swal.fire('Actualizado', 'El evento se ha actualizado con éxito.', 'success');
        this.cargarReservas();
      } else {
        console.error("Error en la respuesta del servidor:", response);
        Swal.fire('Actualizado', 'El evento se ha actualizado con éxito.', 'success');
        this.cerrarModal();
        this.cargarReservas();
      }
    },
    error: (error) => {
      Swal.fire('Error', 'Hubo un problema al actualizar el evento.', 'error');
      console.error('Error al actualizar el evento:', error);
    }
  });
}

abrirSelectorFecha(): void {
  const dateInput = document.getElementById('nuevaFecha') as HTMLInputElement;
  if (dateInput) {
    dateInput.click();
  }
}

  // Crear un nuevo evento
 // Crear un nuevo evento
crearEvento(evento: IEvento): void {
  this.eventosService.create('eventos', evento).subscribe({
    next: (response) => {
      if (!response.error && response.data) {
        this.reservas.push(response.data);
        this.aplicarFiltros();
      } else {
        Swal.fire('Error', response.msg || 'Hubo un problema al crear el evento.', 'error');
      }
    },
    error: (error) => {
      Swal.fire('Error', 'Hubo un problema al crear el evento.', 'error');
      console.error('Error al crear el evento:', error);
    }
  });
}

 // Confirmar y eliminar un evento
// Confirmar y eliminar un evento
eliminarEvento(id: string): void {
  Swal.fire({
    title: '¿Estás seguro?',
    text: 'Esta acción no se puede deshacer.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      this.eventosService.delete(id).subscribe({
        next: () => {
          this.reservas = this.reservas.filter((reserva) => reserva.idCliente !== id);
          this.aplicarFiltros();
          Swal.fire('Eliminado', 'El evento ha sido eliminado.', 'success');
          this.cargarReservas();
        },
        error: (error) => {
          Swal.fire('Error', 'Hubo un problema al eliminar el evento.', 'error');
          console.error('Error al eliminar el evento:', error);
        }
      });
    }
  });
}

  limpiarFiltros(): void {
  this.filtros = {
    fecha: '',
    tipoEvento: '',
    estadoEvento: ''
  };
  this.aplicarFiltros();
  Swal.fire('Filtros limpiados', 'Se han eliminado los filtros.', 'info');
}

confirmarReagendacion(): void {
  if (this.reservaSeleccionada) {  // Verifica que reservaSeleccionada no sea null
    const fecha = this.reservaSeleccionada.nvfecha 
      ? new Date(this.reservaSeleccionada.nvfecha) 
      : null; // Asigna null si nvfecha es undefined

    if (!fecha || isNaN(fecha.getTime())) {  // Verifica si la fecha es válida
      Swal.fire('Error', 'La fecha proporcionada no es válida.', 'error');
      return;
    }

    if (this.reservaSeleccionada.id) {
      this.eventosService.reagendarEvento(this.reservaSeleccionada.id, fecha)
        .toPromise()
        .then(() => {
          Swal.fire('Éxito', 'Evento reagendado con éxito', 'success');
          this.cargarReservas();  // Recarga las reservas para mostrar la actualización
        })
        .catch((error) => {
          Swal.fire('Error', error || 'No se pudo reagendar el evento. Intenta nuevamente.', 'error');
          this.cargarReservas();
        });
    } else {
      Swal.fire('Error', 'El evento seleccionado no tiene un ID válido.', 'error');
    }
  } else {
    Swal.fire('Error', 'No se ha seleccionado ningún evento para reagendar.', 'error');
  }
}

}