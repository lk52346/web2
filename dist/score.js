"use strict";
exports.__esModule = true;
var React = require("react");
function Rezultati(_a) {
    var utakmice = _a.utakmice;
    return (React.createElement("div", null, utakmice.map(function (el) {
        return (React.createElement("div", { id: el.id },
            React.createElement("span", null,
                el.domaci,
                " ",
                el.goldomaci == null ? '-' : el.goldomaci),
            React.createElement("span", null, "|"),
            React.createElement("span", null,
                el.golgosti == null ? '-' : el.golgosti,
                " ",
                el.gosti)));
    })));
}
exports["default"] = Rezultati;
