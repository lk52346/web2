"use strict";
exports.__esModule = true;
var React = require("react");
function Tablica(_a) {
    var sviKlubovi = _a.sviKlubovi;
    return (React.createElement("div", null,
        React.createElement("hr", null),
        React.createElement("h2", null, "Poredak"),
        React.createElement("table", null,
            React.createElement("tr", null,
                React.createElement("th", null, "#"),
                React.createElement("th", null, "Klub"),
                React.createElement("th", null, "Bodovi"),
                React.createElement("th", null, "Golovi")),
            sviKlubovi.map(function (el, i) {
                return (React.createElement("tr", null,
                    React.createElement("td", null,
                        i + 1,
                        "."),
                    React.createElement("td", null, el.ime),
                    React.createElement("td", null, el.bodovi),
                    React.createElement("td", null, el.golovi)));
            }))));
}
exports["default"] = Tablica;
