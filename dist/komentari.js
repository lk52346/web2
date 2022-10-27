"use strict";
exports.__esModule = true;
var React = require("react");
function Komentari(_a) {
    var sviKomentari = _a.sviKomentari, isAdmin = _a.isAdmin, username = _a.username, kolo = _a.kolo;
    return (React.createElement("div", { style: { marginLeft: 100, marginBot: 30 } },
        React.createElement("h2", null, "Komentari"),
        sviKomentari.map(function (el) {
            return (React.createElement("div", null,
                React.createElement("hr", null),
                React.createElement("div", { style: { display: "flex" } },
                    React.createElement("h3", null, el.komentator),
                    (username == el.komentator || isAdmin) &&
                        React.createElement("form", { action: "/obrisikomentar", method: "post" },
                            React.createElement("input", { type: "hidden", name: "id", value: el.id }),
                            React.createElement("input", { type: "submit", value: "Obri\u0161i komentar" }))),
                React.createElement("p", null, el.vrijeme.toString()),
                username == el.komentator ?
                    React.createElement("form", { action: "/azurirajkomentar", method: "post" },
                        React.createElement("input", { type: "hidden", name: "id", value: el.id }),
                        React.createElement("textarea", { name: "tekst", value: el.tekst, width: "100" }),
                        React.createElement("input", { type: "submit", value: "Uredi komentar" })) : React.createElement("p", null, el.tekst),
                React.createElement("hr", null)));
        }),
        React.createElement("form", { action: "/dodajkomentar", method: "post" },
            React.createElement("input", { type: "hidden", name: "kolo", value: kolo }),
            React.createElement("input", { name: "tekst" }),
            React.createElement("input", { type: "submit", value: "Komentiraj" }))));
}
exports["default"] = Komentari;
