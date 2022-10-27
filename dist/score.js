"use strict";
exports.__esModule = true;
var React = require("react");
function Rezultati(_a) {
    var utakmice = _a.utakmice, isAdmin = _a.isAdmin;
    return (React.createElement("div", null, utakmice.map(function (el) {
        return (React.createElement("form", { action: "/azurirajrezultat", method: "post" },
            React.createElement("input", { type: "hidden", name: "id", value: el.id }),
            React.createElement("span", null,
                el.domaci,
                " ",
                isAdmin ? React.createElement("input", { name: "goldomaci", size: "1", value: el.goldomaci }) : el.goldomaci == null ? '-' : el.goldomaci),
            React.createElement("span", null, "|"),
            React.createElement("span", null,
                isAdmin ? React.createElement("input", { name: "golgosti", size: "1", value: el.golgosti }) : el.golgosti == null ? '-' : el.golgosti,
                " ",
                el.gosti),
            isAdmin && React.createElement("input", { type: "submit", value: "Spremi" })));
    })));
}
exports["default"] = Rezultati;
