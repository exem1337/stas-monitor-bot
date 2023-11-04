"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var lodash_debounce_1 = __importDefault(require("lodash.debounce"));
var React = __importStar(require("react"));
var react_swipeable_1 = require("react-swipeable");
var react_transition_group_1 = require("react-transition-group");
var useEscButton_1 = __importDefault(require("./lib/hooks/useEscButton"));
var usePreventScroll_1 = __importDefault(require("./lib/hooks/usePreventScroll"));
var styles_1 = require("./lib/styles");
var useGlobalStyles_1 = __importDefault(require("./lib/hooks/useGlobalStyles"));
var clsx_1 = __importDefault(require("clsx"));
var SlideUpTransition = function (_a) {
    var isVisible = _a.isVisible, children = _a.children, onClose = _a.onClose, _b = _a.unmountOnExit, unmountOnExit = _b === void 0 ? true : _b, _c = _a.mountOnEnter, mountOnEnter = _c === void 0 ? true : _c, _d = _a.duration, duration = _d === void 0 ? 250 : _d, _e = _a.hideScrollbars, hideScrollbars = _e === void 0 ? false : _e, _f = _a.className, className = _f === void 0 ? "" : _f;
    var classNames = useGlobalStyles_1.default(duration, hideScrollbars);
    var nodeRef = React.useRef(null);
    // Actions to close
    useEscButton_1.default(onClose, isVisible);
    usePreventScroll_1.default(isVisible, classNames.contentWrapper);
    // Swiping down interaction
    var _g = React.useState(0), currentDeltaY = _g[0], setDeltaY = _g[1];
    var swipeHandlers = react_swipeable_1.useSwipeable({
        onSwipedDown: lodash_debounce_1.default(function (_a) {
            var velocity = _a.velocity;
            setDeltaY(0);
            if (velocity > 0.5) {
                onClose();
            }
        }, 500, { leading: true }),
        onSwiping: function (_a) {
            var deltaY = _a.deltaY;
            setDeltaY(deltaY);
        },
    });
    var getTransforms = function () {
        if (currentDeltaY >= 0) {
            return undefined;
        }
        return {
            transform: "translate3d(0, " + currentDeltaY * -1 + "px, 0)",
            transition: "none",
        };
    };
    // Layout
    return (React.createElement(React.Fragment, null,
        React.createElement(react_transition_group_1.Transition, { appear: true, in: isVisible, timeout: { appear: 0, enter: 0, exit: duration }, unmountOnExit: unmountOnExit, mountOnEnter: mountOnEnter, nodeRef: nodeRef }, function (state) { return (React.createElement("div", { ref: nodeRef },
            React.createElement("div", { onClick: onClose, className: clsx_1.default(className && className + "__backdrop", classNames.backdrop), style: styles_1.BackdropStyles[state] }),
            React.createElement("div", { className: clsx_1.default(className, classNames.drawer), style: __assign(__assign({}, styles_1.TransitionStyles[state]), getTransforms()) },
                React.createElement("div", __assign({}, swipeHandlers, { className: clsx_1.default(className && className + "__handle-wrapper", classNames.handleWrapper) }),
                    React.createElement("div", { className: clsx_1.default(className && className + "__handle", classNames.handle) })),
                React.createElement("div", { className: clsx_1.default(className && className + "__content", classNames.contentWrapper) }, children)))); })));
};
exports.default = SlideUpTransition;
