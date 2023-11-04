"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_dom_1 = __importDefault(require("react-dom"));
var index_1 = __importDefault(require("./index"));
require("./demo.css");
function Demo() {
    var _a = react_1.default.useState(true), isOpen = _a[0], setIsOpen = _a[1];
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(react_1.default.StrictMode, null,
            react_1.default.createElement("button", { onClick: function () { return setIsOpen(true); } }, "Open Drawer"),
            react_1.default.createElement(index_1.default, { isVisible: isOpen, onClose: function () { return setIsOpen(false); }, duration: 250, hideScrollbars: true, className: "drawer" },
                react_1.default.createElement("h1", null, " React Bottom Drawers! "),
                react_1.default.createElement("p", null, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque commodo vitae sapien in gravida. Donec fermentum nibh interdum, laoreet arcu sit amet, condimentum enim. Duis justo est, commodo vel ultricies ut, consequat vel velit. Aliquam erat volutpat. Integer vel erat ut ipsum interdum ornare. Vivamus vitae quam cursus, varius lorem ut, aliquet eros. Aenean rhoncus nisl sit amet lorem dapibus, eu placerat odio tempus. Ut justo ipsum, tempor quis rutrum nec, aliquam et nunc. Donec nec nisi nec ligula vehicula venenatis eu nec lorem. Aliquam nec sagittis lectus. Quisque sapien ligula, elementum non rutrum et, laoreet ut lectus. In a elit id tortor volutpat tempus eget vitae tellus. Vivamus iaculis odio tellus, id egestas velit consectetur nec. Phasellus molestie elit in lacinia aliquam."),
                react_1.default.createElement("p", null, "In vel semper nisl. Praesent felis augue, hendrerit ac scelerisque vel, bibendum ut turpis. Aliquam volutpat purus massa, vitae consequat arcu lacinia at. Suspendisse vitae mattis turpis. Donec sit amet rutrum est, eu posuere nibh. Vivamus imperdiet sed est in aliquet. Aenean libero massa, consequat nec convallis sed, iaculis nec quam. Maecenas vel rutrum lorem. Nullam eu hendrerit odio, quis consequat odio. Donec fringilla mi dignissim quam eleifend mattis. Sed ligula nibh, tincidunt nec dictum ultricies, rutrum at dui. Sed hendrerit nulla sit amet leo facilisis interdum. Aenean sagittis at ex id auctor. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed sed metus id urna ultrices imperdiet sed id enim. Suspendisse rhoncus ex lorem, et commodo turpis sollicitudin blandit."),
                react_1.default.createElement("p", null, "Morbi eu ullamcorper sapien. Aenean vitae vestibulum orci. Sed in volutpat urna. Aliquam erat volutpat. Pellentesque aliquet sit amet massa ut tempor. Aenean sit amet magna efficitur, sollicitudin tellus tincidunt, blandit lectus. Aliquam in nulla et metus bibendum euismod non et dui. Integer posuere porta ligula, et iaculis lectus lacinia vitae. Aliquam erat volutpat."),
                react_1.default.createElement("p", null, "Integer faucibus, leo sit amet facilisis tempus, dolor enim porttitor lorem, sit amet facilisis dui neque in mi. Morbi nisl metus, cursus quis quam id, tristique ullamcorper sem. Morbi vitae posuere massa, in tristique quam. Phasellus id laoreet nulla, vel ullamcorper ante. Cras nec augue sed metus tincidunt fringilla non eu turpis. In quis est tellus. Vestibulum eget fringilla lorem, porttitor faucibus neque. Nam congue, libero id pulvinar hendrerit, mi eros malesuada nibh, a euismod eros enim et magna. Etiam nec placerat nunc. Integer porttitor mauris ut mi vehicula, lobortis pulvinar leo scelerisque. Suspendisse maximus lorem nec ornare tincidunt."),
                react_1.default.createElement("p", null, "Sed interdum vitae ante nec consectetur. Quisque elementum tortor erat, condimentum gravida massa commodo non. Maecenas eget ante vel purus suscipit volutpat. Nulla vulputate euismod urna sit amet tristique. Morbi rhoncus urna et erat varius, non bibendum tortor fermentum. Proin finibus ligula quis ipsum tempus laoreet. Aenean ipsum neque, mollis et tortor in, lobortis hendrerit est. In sed commodo nunc.")))));
}
react_dom_1.default.render(react_1.default.createElement(Demo, null), document.getElementById("app-root"));
