"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var UsuariosService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuariosService = void 0;
const common_1 = require("@nestjs/common");
const generic_service_1 = require("../shared/generic.service");
const usuarios_document_1 = require("../todos/document/usuarios.document");
const firestore_1 = require("@google-cloud/firestore");
let UsuariosService = UsuariosService_1 = class UsuariosService extends generic_service_1.GenericService {
    constructor() {
        super(usuarios_document_1.UsuariosDocument.collectionName);
        this.logger = new common_1.Logger(UsuariosService_1.name);
        this.firestore = new firestore_1.Firestore();
    }
    async verificarYCrearUsuario(usuario) {
        try {
            const usuariosRef = this.firestore.collection(usuarios_document_1.UsuariosDocument.collectionName);
            const usuarioSnapshot = await usuariosRef
                .where('usuario', '==', usuario.usuario)
                .get();
            if (!usuarioSnapshot.empty) {
                throw new common_1.BadRequestException('El usuario ya existe.');
            }
            const correoSnapshot = await usuariosRef
                .where('correo', '==', usuario.correo)
                .get();
            if (!correoSnapshot.empty) {
                throw new common_1.BadRequestException('El correo ya está registrado.');
            }
            await usuariosRef.add({ ...usuario });
            return { message: 'Usuario creado exitosamente.' };
        }
        catch (error) {
            this.logger.error(`Error al crear usuario: ${error.message}`);
            throw error;
        }
    }
};
exports.UsuariosService = UsuariosService;
exports.UsuariosService = UsuariosService = UsuariosService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], UsuariosService);
//# sourceMappingURL=usuarios.service.js.map