export class UsuariosDocument {
  static collectionName = 'usuarios';
  id: string;
  usuario: string;
  correo: string;
  contrasena: string;
  esAdministrador: boolean;
  nombreCompleto: string;

  constructor(partial: Partial<UsuariosDocument>) {
    Object.assign(this, partial);
  }
}