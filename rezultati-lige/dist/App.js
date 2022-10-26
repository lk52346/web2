"use strict";
exports.__esModule = true;
var pg_1 = require("pg");
var React = require("react");
require('dotenv').config();
var score_1 = require("./score");
var ReactDOMServer = require('react-dom/server');
var express = require('express');
var app = express();
var pool = new pg_1.Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: 'rezultatiligedb',
    password: process.env.DB_PASSWORD,
    port: 5432,
    ssl: true
});
app.get('/', function (req, res) {
    res.send("\n        <div id=\"root\">".concat(ReactDOMServer.renderToString(React.createElement(score_1["default"], { domaci: "1", gosti: "2" })), "</div>\n        "));
});
app.listen(80, function () {
    console.log("Example app listening");
});
