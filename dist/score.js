"use strict";
exports.__esModule = true;
var React = require("react");
function Rezultati(_a) {
    var utakmice = _a.utakmice, isAdmin = _a.isAdmin;
    return (React.createElement("div", { className: "sviRezultati" }, utakmice.map(function (el, i) {
        return (React.createElement("form", { action: "/azurirajrezultat", method: "post", key: i, className: "rezultat" },
            React.createElement("span", { style: { justifySelf: "end" }, className: "rezultatDio" },
                React.createElement("div", null, el.domaci),
                React.createElement("div", { className: "gol" }, isAdmin ? React.createElement("input", { name: "goldomaci", size: "1", defaultValue: el.goldomaci, style: { textAlign: "end" } }) : el.goldomaci == null ? '-' : el.goldomaci)),
            React.createElement("span", { className: "rezultatDio" },
                React.createElement("div", { className: "gol" }, isAdmin ? React.createElement("input", { name: "golgosti", size: "1", defaultValue: el.golgosti }) : el.golgosti == null ? '-' : el.golgosti),
                React.createElement("div", null, el.gosti)),
            React.createElement("input", { type: "hidden", name: "id", defaultValue: el.id }),
            isAdmin && React.createElement("input", { type: "submit", defaultValue: "Spremi", className: "spremiBtn" })));
    })));
}
exports["default"] = Rezultati;
