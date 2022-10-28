"use strict";
exports.__esModule = true;
var React = require("react");
function Tablica(_a) {
    var sviKlubovi = _a.sviKlubovi;
    return (React.createElement("div", { className: "tablicaKartica" },
        React.createElement("div", { className: "poredak" }, "Poredak"),
        React.createElement("table", { className: "tablica" },
            React.createElement("tr", null,
                React.createElement("th", null, "#"),
                React.createElement("th", null, "Klub"),
                React.createElement("th", null, "Bodovi"),
                React.createElement("th", null, "Golovi")),
            sviKlubovi.map(function (el, i) {
                return (React.createElement("tr", { key: i },
                    React.createElement("td", null,
                        i + 1,
                        "."),
                    React.createElement("td", null, el.ime),
                    React.createElement("td", null, el.bodovi || '0'),
                    React.createElement("td", null, el.golovi || '0')));
            }))));
}
exports["default"] = Tablica;
