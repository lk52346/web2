"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var React = require("react");
require('dotenv').config();
var kola_1 = require("./kola");
var data = require("./data");
var tablica_1 = require("./tablica");
var ReactDOMServer = require('react-dom/server');
var express = require('express');
var app = express();
var externalUrl = process.env.RENDER_EXTERNAL_URL;
var port = (externalUrl && process.env.PORT) ? parseInt(process.env.PORT) : 4080;
var bodyParser = require('body-parser');
var _a = require('express-openid-connect'), auth = _a.auth, requiresAuth = _a.requiresAuth;
var admins = ["bomecmsnagbujctppr@tmmwj.net"];
var config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.SECRET,
    baseURL: externalUrl || "http://localhost:".concat(port),
    clientID: process.env.CLIENT_ID,
    issuerBaseURL: 'https://dev-32t7tjpqcg4madc1.us.auth0.com'
};
app.use(auth(config));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static(__dirname + '/public'));
app.get('/profile', requiresAuth(), function (req, res) {
    res.send(JSON.stringify(req.oidc.user));
});
app.post('/dodajrezultat', requiresAuth(), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!admins.includes(req.oidc.user.email)) return [3 /*break*/, 2];
                return [4 /*yield*/, data.postRezultat(req.body)];
            case 1:
                _a.sent();
                res.redirect('/');
                return [3 /*break*/, 3];
            case 2:
                res.send("NOT AUTHORIZED");
                _a.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); });
app.post('/azurirajrezultat', requiresAuth(), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!admins.includes(req.oidc.user.email)) return [3 /*break*/, 2];
                return [4 /*yield*/, data.azurirajRezultat(req.body)];
            case 1:
                _a.sent();
                res.redirect('/');
                return [3 /*break*/, 3];
            case 2:
                res.send("NOT AUTHORIZED");
                _a.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); });
app.post('/azurirajkomentar', requiresAuth(), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var komentar;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, data.getKomentar(req.body.id)];
            case 1:
                komentar = _a.sent();
                if (!(req.oidc.user.email == komentar.komentator)) return [3 /*break*/, 3];
                return [4 /*yield*/, data.azurirajKomentar(req.body)];
            case 2:
                _a.sent();
                res.redirect('/');
                return [3 /*break*/, 4];
            case 3:
                res.send("NOT AUTHORIZED");
                _a.label = 4;
            case 4: return [2 /*return*/];
        }
    });
}); });
app.post('/dodajkomentar', requiresAuth(), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var komentar;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                komentar = req.body;
                komentar.komentator = req.oidc.user.email;
                return [4 /*yield*/, data.postKomentar(komentar)];
            case 1:
                _a.sent();
                res.redirect('/');
                return [2 /*return*/];
        }
    });
}); });
app.post('/obrisikomentar', requiresAuth(), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var komentar;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, data.getKomentar(req.body.id)];
            case 1:
                komentar = _a.sent();
                if (!(admins.includes(req.oidc.user.email) || (komentar && komentar.komentator == req.oidc.user.email))) return [3 /*break*/, 3];
                return [4 /*yield*/, data.deleteKomentar(req.body.id)];
            case 2:
                _a.sent();
                res.redirect('/');
                return [3 /*break*/, 4];
            case 3:
                res.send("NOT AUTHORIZED");
                _a.label = 4;
            case 4: return [2 /*return*/];
        }
    });
}); });
app.get('/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var svaKola, _i, svaKola_1, el, _a, _b, sviKlubovi, username, isLoggedIn, isAdmin;
    var _c, _d, _e;
    return __generator(this, function (_f) {
        switch (_f.label) {
            case 0: return [4 /*yield*/, data.getAllKola()];
            case 1:
                svaKola = _f.sent();
                _i = 0, svaKola_1 = svaKola;
                _f.label = 2;
            case 2:
                if (!(_i < svaKola_1.length)) return [3 /*break*/, 6];
                el = svaKola_1[_i];
                _a = el;
                return [4 /*yield*/, data.getUtakmiceByKolo(el.id)];
            case 3:
                _a.utakmice = _f.sent();
                _b = el;
                return [4 /*yield*/, data.getKomentariKola(el.id)];
            case 4:
                _b.komentari = _f.sent();
                _f.label = 5;
            case 5:
                _i++;
                return [3 /*break*/, 2];
            case 6: return [4 /*yield*/, data.getKluboviSaGolovima()];
            case 7:
                sviKlubovi = _f.sent();
                isLoggedIn = req.oidc.isAuthenticated();
                if (isLoggedIn) {
                    username = (_d = (_c = req.oidc.user) === null || _c === void 0 ? void 0 : _c.name) !== null && _d !== void 0 ? _d : (_e = req.oidc.user) === null || _e === void 0 ? void 0 : _e.sub;
                }
                isAdmin = isLoggedIn && (admins.includes(req.oidc.user.email));
                res.send("\n        <link rel=\"stylesheet\" type=\"text/css\" href=\"/styles.css\" />\n        <div id=\"root\" class=\"glavno\">\n            <h1 class=\"naslov\">Velika Liga</h1>\n            <div class=\"dobrodosli\">\n              <div>Dobrodo\u0161li".concat(isLoggedIn ? ", " + username : "", "!</div>\n              <div>\n                <form action=\"").concat(isLoggedIn ? "/logout" : "/login", "\">\n                  <input type=\"submit\" value=\"").concat(isLoggedIn ? "Logout" : "Login", "\" />\n                </form>\n              </div>\n            </div>\n            <div>").concat(ReactDOMServer.renderToString(React.createElement(kola_1["default"], { svaKola: svaKola, isAdmin: isAdmin, username: username })), "</div>\n            <div>").concat(ReactDOMServer.renderToString(React.createElement(tablica_1["default"], { sviKlubovi: sviKlubovi })), "</div>\n        </div>\n        "));
                return [2 /*return*/];
        }
    });
}); });
// app.listen(port, ()=>{
//   console.log("Server pokrenut!")
// })
if (externalUrl) {
    var hostname_1 = '127.0.0.1';
    app.listen(port, hostname_1, function () {
        console.log("Server locally running at http://".concat(hostname_1, ":").concat(port, "/ and from outside on ").concat(externalUrl));
    });
}
else {
    app.listen(port, function () {
        console.log("Server running on localhost");
    });
}
