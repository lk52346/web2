import * as React from "react";
import Rezultati from "./score";
export default function Komentari ({sviKomentari, isAdmin, username}){
    return (
      <div style={{marginLeft:100, marginBot:30}}>
        <h2>Komentari</h2>
        {sviKomentari.map(el => {
          return(
          <div>
            <hr></hr>
            <div style={{display:"flex"}}>
                <h3>{el.komentator}</h3>
                {(username==el.komentator || isAdmin) &&
                <form action="/obrisikomentar" method="post">
                    <input type="hidden" name="id" value={el.id}></input>
                    <input type="submit" value="Obriši komentar"></input>
                </form>}
            </div>
            <p>{el.vrijeme.toString()}</p>
            {username==el.komentator ? <textarea name="tekst" value={el.tekst}></textarea> : <p>{el.tekst}</p>}
            <hr></hr>
          </div>
          )
        })}
      </div>
    );
}