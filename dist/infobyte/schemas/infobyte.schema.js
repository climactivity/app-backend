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
Object.defineProperty(exports, "__esModule", { value: true });
exports.InfoByteSchema = exports.InfoByte = exports.InfoBit = exports.Question = exports.Answer = void 0;
const mongoose_1 = require("@nestjs/mongoose");
class Answer {
}
exports.Answer = Answer;
class Question {
}
exports.Question = Question;
class InfoBit {
}
exports.InfoBit = InfoBit;
let InfoByte = class InfoByte {
};
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], InfoByte.prototype, "region", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], InfoByte.prototype, "language", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], InfoByte.prototype, "name", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], InfoByte.prototype, "frontmatter", void 0);
__decorate([
    mongoose_1.Prop([mongoose_1.raw]),
    __metadata("design:type", Array)
], InfoByte.prototype, "infobits", void 0);
__decorate([
    mongoose_1.Prop([Question]),
    __metadata("design:type", Array)
], InfoByte.prototype, "questions", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", Number)
], InfoByte.prototype, "xp", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", Boolean)
], InfoByte.prototype, "published", void 0);
InfoByte = __decorate([
    mongoose_1.Schema()
], InfoByte);
exports.InfoByte = InfoByte;
exports.InfoByteSchema = mongoose_1.SchemaFactory.createForClass(InfoByte);
//# sourceMappingURL=infobyte.schema.js.map