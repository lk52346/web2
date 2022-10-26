"use strict";
exports.__esModule = true;
var React = require("react");
var score_1 = require("./score");
function Kola(_a) {
    var svaKola = _a.svaKola;
    return (React.createElement("div", null, svaKola.map(function (el) {
        return (React.createElement("div", null,
            React.createElement("h3", null, el.ime),
            React.createElement(score_1["default"], { utakmice: el.utakmice })));
    })));
}
exports["default"] = Kola;
