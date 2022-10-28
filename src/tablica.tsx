import * as React from "react";
export default function Tablica ({sviKlubovi}){
    return (
        <div className="tablicaKartica">
            <div className="poredak">Poredak</div>
            <table className="tablica">
                <tr>
                    <th>#</th>
                    <th>Klub</th>
                    <th>Bodovi</th>
                    <th>Golovi</th>
                </tr>
                {sviKlubovi.map((el, i) => {
                return(
                    <tr key={i}>
                        <td>{i+1}.</td>
                        <td>{el.ime}</td>
                        <td>{el.bodovi || '0'}</td>
                        <td>{el.golovi || '0'}</td>
                    </tr>
                )
                })}
            </table>
        </div>
    );
}