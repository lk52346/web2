import * as React from "react";
export default function Tablica ({sviKlubovi}){
    return (
        <div>
            <hr/>
            <h2>Poredak</h2>
            <table>
                <tr>
                    <th>#</th>
                    <th>Klub</th>
                    <th>Bodovi</th>
                    <th>Golovi</th>
                </tr>
                {sviKlubovi.map((el, i) => {
                return(
                    <tr>
                        <td>{i+1}.</td>
                        <td>{el.ime}</td>
                        <td>{el.bodovi}</td>
                        <td>{el.golovi}</td>
                    </tr>
                )
                })}
            </table>
        </div>
    );
}