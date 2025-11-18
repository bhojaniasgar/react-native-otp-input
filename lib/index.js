"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAutoFillSupported = exports.codeToArray = exports.getSizeConfig = exports.SIZES = exports.ResponsiveHelper = exports.OtpInputView = exports.default = void 0;
// Main component exports
var components_1 = require("./components");
Object.defineProperty(exports, "default", { enumerable: true, get: function () { return __importDefault(components_1).default; } });
Object.defineProperty(exports, "OtpInputView", { enumerable: true, get: function () { return components_1.OtpInputView; } });
// Utility exports (for advanced users)
var utils_1 = require("./utils");
Object.defineProperty(exports, "ResponsiveHelper", { enumerable: true, get: function () { return utils_1.ResponsiveHelper; } });
Object.defineProperty(exports, "SIZES", { enumerable: true, get: function () { return utils_1.SIZES; } });
Object.defineProperty(exports, "getSizeConfig", { enumerable: true, get: function () { return utils_1.getSizeConfig; } });
Object.defineProperty(exports, "codeToArray", { enumerable: true, get: function () { return utils_1.codeToArray; } });
Object.defineProperty(exports, "isAutoFillSupported", { enumerable: true, get: function () { return utils_1.isAutoFillSupported; } });
//# sourceMappingURL=index.js.map