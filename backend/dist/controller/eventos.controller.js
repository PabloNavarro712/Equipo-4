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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var EventosController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventosController = void 0;
const common_1 = require("@nestjs/common");
const eventos_service_1 = require("../service/eventos.service");
const eventos_document_1 = require("../todos/document/eventos.document");
const generic_controller_1 = require("../shared/generic.controller");
const endpoint = 'api/eventos';
const GenericEventosController = (0, generic_controller_1.createGenericController)(eventos_document_1.EventosDocument.collectionName, endpoint);
let EventosController = EventosController_1 = class EventosController extends GenericEventosController {
    constructor(eventosService) {
        super();
        this.eventosService = eventosService;
        this.logger = new common_1.Logger(EventosController_1.name);
    }
    async getEventosByEstado(estado) {
        return this.eventosService.getEventosByEstado(estado);
    }
    async getEventosProximos(fechaBase) {
        const fecha = new Date(fechaBase);
        return this.eventosService.getEventosProximos(fecha);
    }
    async getEventosByCliente(idCliente) {
        return this.eventosService.getEventosByCliente(idCliente);
    }
    async getFechasEventosPendientesYAceptados() {
        try {
            return await this.eventosService.getFechasEventosPendientesYAceptados();
        }
        catch (error) {
            this.logger.error(`Error al obtener fechas de eventos: ${error.message}`);
            throw error;
        }
    }
};
exports.EventosController = EventosController;
__decorate([
    (0, common_1.Get)('/estado/:estado'),
    __param(0, (0, common_1.Param)('estado')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EventosController.prototype, "getEventosByEstado", null);
__decorate([
    (0, common_1.Get)('/proximos'),
    __param(0, (0, common_1.Query)('fechaBase')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EventosController.prototype, "getEventosProximos", null);
__decorate([
    (0, common_1.Get)('/cliente/:idCliente'),
    __param(0, (0, common_1.Param)('idCliente')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EventosController.prototype, "getEventosByCliente", null);
__decorate([
    (0, common_1.Get)('/fechas'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EventosController.prototype, "getFechasEventosPendientesYAceptados", null);
exports.EventosController = EventosController = EventosController_1 = __decorate([
    (0, common_1.Controller)(endpoint),
    __metadata("design:paramtypes", [eventos_service_1.EventosService])
], EventosController);
//# sourceMappingURL=eventos.controller.js.map