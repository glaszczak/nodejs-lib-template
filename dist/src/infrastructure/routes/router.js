"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const package_json_1 = __importDefault(require("@root/package.json"));
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get('/check/ping', async (req, res) => {
    try {
        res.status(200).json({
            v: package_json_1.default.version,
        });
    }
    catch (error) {
        res.status(error.statusCode || 500).json(error.response);
    }
});
router.get('*', (_, res) => res.status(404).json({ code: "CODE_G003" }));
exports.default = router;
//# sourceMappingURL=router.js.map