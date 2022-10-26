"use strict";
exports.__esModule = true;
var pg_1 = require("pg");
require('dotenv').config();
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
    res.send('Hello World!');
});
app.listen(80, function () {
    console.log("Example app listening");
});
