"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClassNames = exports.BackdropStyles = exports.TransitionStyles = void 0;
exports.TransitionStyles = {
    entering: { transform: "translate3d(0, 100%, 0)" },
    entered: { transform: "none" },
    exiting: { transform: "translate3d(0, 100%, 0)" },
    exited: { display: "none" },
};
exports.BackdropStyles = {
    entering: { opacity: "0" },
    entered: { opacity: "1" },
    exiting: { opacity: "0" },
    exited: { display: "none" },
};
exports.getClassNames = function (identifier) { return ({
    backdrop: "rbd-" + identifier + "-db",
    drawer: "rbd-" + identifier + "-dr",
    handleWrapper: "rbd-" + identifier + "-hw",
    handle: "rbd-" + identifier + "-h",
    contentWrapper: "rbd-" + identifier + "-cw",
}); };
var globalStylesheet = function (identifier, _a) {
    var duration = _a.duration, hideScrollbars = _a.hideScrollbars;
    var classNames = exports.getClassNames(identifier);
    return ("\n  ." + classNames.backdrop + " {\n    position: fixed;\n    z-index: 10;\n    background: rgba(0, 0, 0, 0.5);\n    top: 0;\n    left: 0;\n    height: 100%;\n    width: 100%;\n    transition: opacity " + duration + "ms;\n  }\n  ." + classNames.drawer + " {\n    position: fixed;\n    z-index: 11;\n    left: 0;\n    bottom: 0;\n    width: 100vw;\n    background: white;\n    border-top-left-radius: 15px;\n    border-top-right-radius: 15px;\n    transition: transform " + duration + "ms;\n  }\n  ." + classNames.handleWrapper + " {\n    display: flex;\n    justify-content: center;\n    padding: 10px 0;\n  }\n  ." + classNames.handle + " {\n    background: #e3e3e3;\n    height: 5px;\n    width: 70px;\n    border-radius: 5px;\n  }\n  ." + classNames.contentWrapper + " {\n    padding: 0 10px;\n    max-height: calc(70vh - 25px);\n    overflow-x: hidden;\n    overflow-y: auto;\n    " + (hideScrollbars
        ? "\n      scrollbar-width: none;\n      -ms-overflow-style: none;\n    "
        : "") + "\n  }\n  " + (hideScrollbars
        ? "\n  ." + classNames.contentWrapper + "::-webkit-scrollbar {\n    width: 0px;\n    background: transparent;\n  }\n  "
        : "") + "\n    \n")
        .split("\n")
        .map(function (l) { return l.trim(); })
        .join("");
};
exports.default = globalStylesheet;
