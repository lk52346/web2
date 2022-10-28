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
exports.deleteKomentar = exports.getKomentar = exports.getKomentariKola = exports.azurirajKomentar = exports.azurirajRezultat = exports.postKomentar = exports.postRezultat = exports.getBodoviKluba = exports.getKluboviSaGolovima = exports.getUtakmiceByKolo = exports.getAllKola = void 0;
var Pool = require('pg').Pool;
var pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: 'rezultatiligedb',
    password: process.env.DB_PASSWORD,
    port: 5432,
    ssl: true
});
pool.connect();
function getAllKola() {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, pool.query("SELECT * FROM kolo")];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result.rows];
            }
        });
    });
}
exports.getAllKola = getAllKola;
function getUtakmiceByKolo(idKola) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, pool.query("\n    SELECT utakmica.id, kolo.ime imeKola, utakmica.goldomaci, utakmica.golgosti, klubDomaci.ime domaci, klubGosti.ime gosti FROM utakmica\n    LEFT JOIN kolo ON kolo.id=utakmica.kolo\n    LEFT JOIN klub klubDomaci ON klubDomaci.id=utakmica.domaci\n    LEFT JOIN klub klubGosti ON klubGosti.id=utakmica.gosti\n    WHERE kolo.id = ".concat(idKola))];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result.rows];
            }
        });
    });
}
exports.getUtakmiceByKolo = getUtakmiceByKolo;
function getKluboviSaGolovima() {
    return __awaiter(this, void 0, void 0, function () {
        var klubovi, _i, klubovi_1, klub, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, pool.query("\n    SELECT * FROM klub\n    ")];
                case 1:
                    klubovi = (_c.sent()).rows;
                    _i = 0, klubovi_1 = klubovi;
                    _c.label = 2;
                case 2:
                    if (!(_i < klubovi_1.length)) return [3 /*break*/, 6];
                    klub = klubovi_1[_i];
                    _a = klub;
                    return [4 /*yield*/, pool.query("\n            SELECT SUM(\n                CASE\n                    WHEN utakmica.domaci = ".concat(klub.id, " THEN utakmica.goldomaci\n                    WHEN utakmica.gosti = ").concat(klub.id, " THEN utakmica.golgosti\n                    ELSE 0\n                END\n            ) FROM utakmica WHERE utakmica.domaci = ").concat(klub.id, " OR utakmica.gosti = ").concat(klub.id, "\n            "))];
                case 3:
                    _a.golovi = (_c.sent()).rows[0].sum;
                    _b = klub;
                    return [4 /*yield*/, getBodoviKluba(klub.id)];
                case 4:
                    _b.bodovi = _c.sent();
                    _c.label = 5;
                case 5:
                    _i++;
                    return [3 /*break*/, 2];
                case 6: return [2 /*return*/, klubovi.sort(function (a, b) {
                        if (a.bodovi == b.bodovi)
                            return b.golovi - a.golovi;
                        else
                            return b.bodovi - a.bodovi;
                    })];
            }
        });
    });
}
exports.getKluboviSaGolovima = getKluboviSaGolovima;
function getBodoviKluba(id) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, pool.query("\n        SELECT SUM(\n            CASE\n                WHEN domaci = ".concat(id, " AND goldomaci > golgosti THEN 3\n                WHEN gosti = ").concat(id, " AND golgosti > goldomaci THEN 3\n                WHEN golgosti = goldomaci THEN 1\n                ELSE 0\n            END\n        ) FROM utakmica WHERE utakmica.domaci = ").concat(id, " OR utakmica.gosti = ").concat(id, "\n        "))];
                case 1: return [2 /*return*/, (_a.sent()).rows[0].sum];
            }
        });
    });
}
exports.getBodoviKluba = getBodoviKluba;
function postRezultat(utakmica) {
    return __awaiter(this, void 0, void 0, function () {
        var domaci, gosti;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, pool.query("INSERT INTO klub(ime) SELECT '".concat(utakmica.imedomaci, "' WHERE NOT EXISTS(SELECT ime FROM klub WHERE LOWER(ime) LIKE '").concat(utakmica.imedomaci.toLowerCase(), "')"))];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, pool.query("INSERT INTO klub(ime) SELECT '".concat(utakmica.imegosti, "' WHERE NOT EXISTS(SELECT ime FROM klub WHERE LOWER(ime) LIKE '").concat(utakmica.imegosti.toLowerCase(), "')"))];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, pool.query("SELECT id FROM klub WHERE LOWER(ime) LIKE LOWER('".concat(utakmica.imedomaci, "')"))];
                case 3:
                    domaci = (_a.sent()).rows[0].id;
                    return [4 /*yield*/, pool.query("SELECT id FROM klub WHERE LOWER(ime) LIKE LOWER('".concat(utakmica.imegosti, "')"))];
                case 4:
                    gosti = (_a.sent()).rows[0].id;
                    return [4 /*yield*/, pool.query("\n        INSERT INTO utakmica(kolo, domaci, gosti, goldomaci, golgosti) VALUES\n        (".concat(utakmica.kolo, ", ").concat(domaci, ", ").concat(gosti, ", ").concat(utakmica.goldomaci == '' ? 'NULL' : utakmica.goldomaci, ", ").concat(utakmica.golgosti == '' ? 'NULL' : utakmica.golgosti, ")\n        "))];
                case 5:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.postRezultat = postRezultat;
function postKomentar(komentar) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, pool.query("\n        INSERT INTO komentar(komentator, tekst, vrijeme, kolo) VALUES\n        ('".concat(komentar.komentator, "', '").concat(komentar.tekst, "', now(), ").concat(komentar.kolo, ")\n        "))];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.postKomentar = postKomentar;
function azurirajRezultat(utakmica) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, pool.query("\n        UPDATE utakmica SET goldomaci = ".concat(utakmica.goldomaci == '' ? 'NULL' : utakmica.goldomaci, ", golgosti = ").concat(utakmica.golgosti == '' ? 'NULL' : utakmica.golgosti, " WHERE id=").concat(utakmica.id, "\n        "))];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.azurirajRezultat = azurirajRezultat;
function azurirajKomentar(komentar) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, pool.query("\n        UPDATE komentar SET tekst = '".concat(komentar.tekst, "' WHERE id=").concat(komentar.id, "\n        "))];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.azurirajKomentar = azurirajKomentar;
function getKomentariKola(id) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, pool.query("\n        SELECT * FROM komentar WHERE kolo = ".concat(id, "\n        "))];
                case 1: return [2 /*return*/, (_a.sent()).rows];
            }
        });
    });
}
exports.getKomentariKola = getKomentariKola;
function getKomentar(id) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, pool.query("\n        SELECT * FROM komentar WHERE id = ".concat(id, "\n        "))];
                case 1: return [2 /*return*/, (_a.sent()).rows[0]];
            }
        });
    });
}
exports.getKomentar = getKomentar;
function deleteKomentar(id) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, pool.query("\n        DELETE FROM komentar WHERE id = ".concat(id, "\n        "))];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.deleteKomentar = deleteKomentar;
