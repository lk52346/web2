"use strict";
exports.__esModule = true;
var React = require("react");
var score_1 = require("./score");
var komentari_1 = require("./komentari");
function Kola(_a) {
    var svaKola = _a.svaKola, isAdmin = _a.isAdmin, username = _a.username;
    return (React.createElement("div", null, svaKola.map(function (el, i) {
        return (React.createElement("div", { className: "kolo", key: i },
            React.createElement("hr", null),
            React.createElement("h3", null, el.ime),
            React.createElement(score_1["default"], { utakmice: el.utakmice, isAdmin: isAdmin }),
            isAdmin &&
                React.createElement("form", { action: "/dodajrezultat", method: "post", style: { display: 'flex' } },
                    React.createElement("input", { type: "hidden", name: "kolo", defaultValue: el.id }),
                    React.createElement("input", { size: "15", placeholder: "Doma\u0107i klub", name: "imedomaci" }),
                    React.createElement("input", { size: "1", placeholder: "0", name: "goldomaci" }),
                    React.createElement("input", { size: "1", placeholder: "0", name: "golgosti" }),
                    React.createElement("input", { size: "15", placeholder: "Klub gostiju", name: "imegosti" }),
                    React.createElement("input", { type: "submit", defaultValue: "Dodaj" })),
            React.createElement(komentari_1["default"], { sviKomentari: el.komentari, isAdmin: isAdmin, username: username, kolo: el.id })));
    })));
}
exports["default"] = Kola;
