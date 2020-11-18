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
Object.defineProperty(exports, "__esModule", { value: true });
exports.InfobyteController = void 0;
const common_1 = require("@nestjs/common");
const create_info_byte_dto_1 = require("./dto/create-info-byte.dto");
const update_info_byte_dto_1 = require("./dto/update-info-byte.dto");
const infobyte_service_1 = require("./infobyte.service");
let InfobyteController = class InfobyteController {
    constructor(infobyteService) {
        this.infobyteService = infobyteService;
    }
    create(createInfoByteDto) {
        return this.infobyteService.create(createInfoByteDto);
    }
    findAll() {
        return this.infobyteService.findAll();
    }
    findOne(id) {
        return this.infobyteService.findById(id);
    }
    update(id, updateInfoByteDto) {
        return this.infobyteService.update(id, updateInfoByteDto);
    }
    remove(id) {
        return this.infobyteService.delete(id);
    }
};
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_info_byte_dto_1.CreateInfoByteDto]),
    __metadata("design:returntype", void 0)
], InfobyteController.prototype, "create", null);
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], InfobyteController.prototype, "findAll", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], InfobyteController.prototype, "findOne", null);
__decorate([
    common_1.Put(':id'),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_info_byte_dto_1.UpdateInfoByteDto]),
    __metadata("design:returntype", void 0)
], InfobyteController.prototype, "update", null);
__decorate([
    common_1.Delete(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], InfobyteController.prototype, "remove", null);
InfobyteController = __decorate([
    common_1.Controller('infobyte'),
    __metadata("design:paramtypes", [infobyte_service_1.InfobyteService])
], InfobyteController);
exports.InfobyteController = InfobyteController;
//# sourceMappingURL=infobyte.controller.js.map