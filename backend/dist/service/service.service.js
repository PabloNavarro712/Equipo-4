"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceService = void 0;
const common_1 = require("@nestjs/common");
const firebase_config_1 = require("../firebase.config");
const database_1 = require("firebase/database");
let ServiceService = class ServiceService {
    async createData(data) {
        const dataRef = (0, database_1.ref)(firebase_config_1.firebaseDataBase, 'Data');
        const newElementRef = (0, database_1.push)(dataRef, { dataRef: data });
        await (0, database_1.set)(newElementRef, data);
    }
    async getData() {
        const dataRef = (0, database_1.ref)(firebase_config_1.firebaseDataBase, 'Data');
        const snapshot = await (0, database_1.get)(dataRef);
        return snapshot.val();
    }
};
exports.ServiceService = ServiceService;
exports.ServiceService = ServiceService = __decorate([
    (0, common_1.Injectable)()
], ServiceService);
//# sourceMappingURL=service.service.js.map