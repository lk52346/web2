"use strict";
exports.__esModule = true;
var React = require("react");
function Rezultati(_a) {
    var utakmice = _a.utakmice, isAdmin = _a.isAdmin;
    return (React.createElement("div", null, utakmice.map(function (el, i) {
        return (React.createElement("form", { action: "/azurirajrezultat", method: "post", key: i },
            React.createElement("input", { type: "hidden", name: "id", defaultValue: el.id }),
            React.createElement("span", null,
                el.domaci,
                " ",
                isAdmin ? React.createElement("input", { name: "goldomaci", size: "1", defaultValue: el.goldomaci }) : el.goldomaci == null ? '-' : el.goldomaci),
            React.createElement("span", null, "|"),
            React.createElement("span", null,
                isAdmin ? React.createElement("input", { name: "golgosti", size: "1", defaultValue: el.golgosti }) : el.golgosti == null ? '-' : el.golgosti,
                " ",
                el.gosti),
            isAdmin && React.createElement("input", { type: "submit", defaultValue: "Spremi" })));
    })));
}
exports["default"] = Rezultati;
