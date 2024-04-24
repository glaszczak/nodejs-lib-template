"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const router_1 = __importDefault(require("infrastructure/routes/router"));
const app = (0, express_1.default)();
exports.app = app;
app.use(express_1.default.json());
app.use((0, helmet_1.default)());
app.use('/api', router_1.default);
//# sourceMappingURL=app.js.map