const { Pool } = require('pg')
import * as React from "react";

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: 'rezultatiligedb',
    password: process.env.DB_PASSWORD,
    port: 5432,
    ssl : true
})

pool.connect()

export async function getAllKola(){
    var result = await pool.query(`SELECT * FROM kolo`);
    return result.rows
}

export async function getUtakmiceByKolo(idKola : number){
    var result = await pool.query(`
    SELECT utakmica.id, kolo.ime imeKola, utakmica.goldomaci, utakmica.golgosti, klubDomaci.ime domaci, klubGosti.ime gosti FROM utakmica
    LEFT JOIN kolo ON kolo.id=utakmica.kolo
    LEFT JOIN klub klubDomaci ON klubDomaci.id=utakmica.domaci
    LEFT JOIN klub klubGosti ON klubGosti.id=utakmica.gosti
    WHERE kolo.id = ${idKola}`);
    return result.rows
}

export async function getKluboviSaGolovima(){
    var klubovi = (await pool.query(`
    SELECT * FROM klub
    `)).rows;
    for(var klub of klubovi){
        klub.golovi = (await pool.query(
            `
            SELECT SUM(
                CASE
                    WHEN utakmica.domaci = ${klub.id} THEN utakmica.goldomaci
                    WHEN utakmica.gosti = ${klub.id} THEN utakmica.golgosti
                    ELSE 0
                END
            ) FROM utakmica WHERE utakmica.domaci = ${klub.id} OR utakmica.gosti = ${klub.id}
            `
        )).rows[0].sum;

        klub.bodovi = await getBodoviKluba(klub.id);
    }
    return klubovi.sort((a,b)=>{
        if(a.bodovi==b.bodovi)
            return b.golovi - a.golovi
        else
            return b.bodovi - a.bodovi
    });
}

export async function getBodoviKluba(id:number) : Promise<number>{
    return (await pool.query(
        `
        SELECT SUM(
            CASE
                WHEN domaci = ${id} AND goldomaci > golgosti THEN 3
                WHEN gosti = ${id} AND golgosti > goldomaci THEN 3
                WHEN golgosti = goldomaci THEN 1
                ELSE 0
            END
        ) FROM utakmica WHERE utakmica.domaci = ${id} OR utakmica.gosti = ${id}
        `
    )).rows[0].sum;
}

export async function postRezultat(utakmica){
    await pool.query(`INSERT INTO klub(ime) SELECT '${utakmica.imedomaci}' WHERE NOT EXISTS(SELECT ime FROM klub WHERE LOWER(ime) LIKE '${utakmica.imedomaci.toLowerCase()}')`);
    await pool.query(`INSERT INTO klub(ime) SELECT '${utakmica.imegosti}' WHERE NOT EXISTS(SELECT ime FROM klub WHERE LOWER(ime) LIKE '${utakmica.imegosti.toLowerCase()}')`);
    var domaci = (await pool.query(`SELECT id FROM klub WHERE LOWER(ime) LIKE '${utakmica.imedomaci}'`)).rows[0].id
    var gosti = (await pool.query(`SELECT id FROM klub WHERE LOWER(ime) LIKE '${utakmica.imegosti}'`)).rows[0].id
    await pool.query(
        `
        INSERT INTO utakmica(kolo, domaci, gosti, goldomaci, golgosti) VALUES
        (${utakmica.kolo}, ${domaci}, ${gosti}, ${utakmica.goldomaci=='' ? 'NULL' : utakmica.goldomaci}, ${utakmica.golgosti=='' ? 'NULL' : utakmica.golgosti})
        `
    );
}

export async function postKomentar(komentar){
    await pool.query(
        `
        INSERT INTO komentar(komentator, tekst, vrijeme, kolo) VALUES
        ('${komentar.komentator}', '${komentar.tekst}', now(), ${komentar.kolo})
        `
    );
}

export async function azurirajRezultat(utakmica){
    await pool.query(
        `
        UPDATE utakmica SET goldomaci = ${utakmica.goldomaci=='' ? 'NULL' : utakmica.goldomaci}, golgosti = ${utakmica.golgosti=='' ? 'NULL' : utakmica.golgosti} WHERE id=${utakmica.id}
        `
    );
}

export async function azurirajKomentar(komentar){
    await pool.query(
        `
        UPDATE komentar SET tekst = '${komentar.tekst}' WHERE id=${komentar.id}
        `
    );
}

export async function getKomentariKola(id:number){
    return (await pool.query(
        `
        SELECT * FROM komentar WHERE kolo = ${id}
        `
    )).rows;
}

export async function getKomentar(id:number){
    return (await pool.query(
        `
        SELECT * FROM komentar WHERE id = ${id}
        `
    )).rows[0];
}

export async function deleteKomentar(id:number){
    await pool.query(
        `
        DELETE FROM komentar WHERE id = ${id}
        `
    );
}