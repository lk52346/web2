"use strict";
exports.__esModule = true;
var React = require("react");
var Logo = "https://logrocket-assets.io/static/home-hero-c97849b227a3d3015730e3371a76a7f0.svg";
function FirstComponent(_a) {
    var domaci = _a.domaci, gosti = _a.gosti;
    return (React.createElement("div", null,
        React.createElement("span", null, domaci),
        React.createElement("span", null, "|"),
        React.createElement("span", null, gosti)));
}
exports["default"] = FirstComponent;
