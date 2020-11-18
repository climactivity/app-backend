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
exports.InfobyteService = void 0;
const mongoose_1 = require("mongoose");
const common_1 = require("@nestjs/common");
const mongoose_2 = require("@nestjs/mongoose");
const infobyte_schema_1 = require("./schemas/infobyte.schema");
let InfobyteService = class InfobyteService {
    constructor(infoByteModel) {
        this.infoByteModel = infoByteModel;
    }
    async create(createInfoByteDto) {
        const createdInfoByte = new this.infoByteModel(createInfoByteDto);
        return createdInfoByte.save();
    }
    async findAll() {
        return this.infoByteModel.find().select('name _id').exec();
    }
    async findById(id) {
        return this.infoByteModel.findById(id).exec();
    }
    async update(id, updateInfoByteDto) {
        return this.infoByteModel.findByIdAndUpdate(id, updateInfoByteDto).exec();
    }
    async delete(id) {
        return this.infoByteModel.findByIdAndDelete(id).exec();
    }
};
InfobyteService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_2.InjectModel(infobyte_schema_1.InfoByte.name)),
    __metadata("design:paramtypes", [mongoose_1.Model])
], InfobyteService);
exports.InfobyteService = InfobyteService;
//# sourceMappingURL=infobyte.service.js.map