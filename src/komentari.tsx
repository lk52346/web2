import * as React from "react";
import Rezultati from "./score";
export default function Komentari ({sviKomentari, isAdmin, username, kolo}){
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
            {username==el.komentator ?
            <form action="/azurirajkomentar" method="post">
              <input type="hidden" name="id" value={el.id}></input>
              <textarea name="tekst" value={el.tekst} width="100"></textarea>
              <input type="submit" value="Uredi komentar"></input>
            </form> : <p>{el.tekst}</p>}
            <hr></hr>
          </div>
          )
        })}
        <form action="/dodajkomentar" method="post">
          <input type="hidden" name="kolo" value={kolo}></input>
          <input name="tekst"></input>
          <input type="submit" value="Komentiraj"></input>
        </form>
      </div>
    );
}