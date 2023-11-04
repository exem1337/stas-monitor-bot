"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var styles_1 = __importStar(require("../styles"));
function useGlobalStyles(duration, hideScrollbars) {
    var identifier = react_1.default.useMemo(function () { return Math.random().toString(36).substr(2); }, []);
    var classNames = react_1.default.useMemo(function () { return styles_1.getClassNames(identifier); }, [identifier]);
    react_1.default.useEffect(function () {
        if (typeof document === "undefined") {
            return;
        }
        var styles = styles_1.default(identifier, { duration: duration, hideScrollbars: hideScrollbars });
        var tag = document.createElement("style");
        tag.setAttribute("data-react-bottom-drawer", identifier);
        tag.innerHTML = styles;
        document.head.appendChild(tag);
        return function () {
            var stylesheet = document.querySelector("style[data-react-bottom-drawer='" + identifier + "']");
            if (stylesheet) {
                stylesheet.remove();
            }
        };
    }, [duration, hideScrollbars]);
    return classNames;
}
exports.default = useGlobalStyles;
