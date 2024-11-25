export interface Evento {
  id?: string;
  idServicio?: string; // id del servicio
  idCliente: string;
  nombre: string;
  contacto: string;
  correoElectronico: string; // Correo electrónico
  fechaHoraReserva: Date; // Fecha y hora de la reserva
  ubicacionEvento: string; // Ubicación del evento
  tipoEvento: string; // Tipo de evento
  horaEvento: string; // Hora del evento
  fechaEvento: Date; // Fecha del evento
  estado: 'aceptado' | 'reechazado' | 'pendiente' | 'cancelado';
  precio_final: number;
  adiciones: {
    nombre: string;
    precio: number;
  }[];
  }
  