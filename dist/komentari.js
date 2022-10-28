"use strict";
exports.__esModule = true;
var React = require("react");
function Komentari(_a) {
    var sviKomentari = _a.sviKomentari, isAdmin = _a.isAdmin, username = _a.username, kolo = _a.kolo;
    return (React.createElement("details", { style: { marginLeft: 100, marginBot: 30 } },
        React.createElement("summary", null, "Komentari"),
        sviKomentari.map(function (el, i) {
            var datum = "".concat(el.vrijeme.getDate(), ".").concat(el.vrijeme.getMonth() + 1, ".").concat(el.vrijeme.getFullYear(), " ").concat(el.vrijeme.getHours(), ":").concat(el.vrijeme.getMinutes());
            return (React.createElement("div", { key: i },
                React.createElement("hr", null),
                React.createElement("div", { style: { display: "flex" } },
                    React.createElement("div", { className: "komentator" }, el.komentator),
                    (username == el.komentator || isAdmin) &&
                        React.createElement("form", { action: "/obrisikomentar", method: "post", style: { margin: "5px" } },
                            React.createElement("input", { type: "hidden", name: "id", defaultValue: el.id }),
                            React.createElement("input", { type: "submit", defaultValue: "X", className: "obrisiBtn" }))),
                React.createElement("p", null, datum),
                username == el.komentator ?
                    React.createElement("form", { action: "/azurirajkomentar", method: "post", style: { marginLeft: "10px" } },
                        React.createElement("input", { type: "hidden", name: "id", defaultValue: el.id }),
                        React.createElement("textarea", { name: "tekst", className: "komentar", defaultValue: el.tekst, width: "100" }),
                        React.createElement("input", { type: "submit", defaultValue: "Uredi komentar" })) : React.createElement("p", { style: { marginLeft: "10px" } }, el.tekst)));
        }),
        username &&
            React.createElement("div", { style: { marginTop: "25px" } },
                React.createElement("div", { style: { fontSize: "25px", margin: "10px" } }, "Dodaj komentar"),
                React.createElement("form", { action: "/dodajkomentar", method: "post" },
                    React.createElement("input", { type: "hidden", name: "kolo", defaultValue: kolo }),
                    React.createElement("textarea", { className: "komentar", name: "tekst" }),
                    React.createElement("input", { type: "submit", defaultValue: "Komentiraj" })))));
}
exports["default"] = Komentari;
