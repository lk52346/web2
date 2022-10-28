import * as React from "react";
import Rezultati from "./score";
export default function Komentari ({sviKomentari, isAdmin, username, kolo}){
    return (
      <div style={{marginLeft:100, marginBot:30}}>
        <h2>Komentari</h2>
        {sviKomentari.map((el, i) => {
          const datum = `${el.vrijeme.getDate()}.${el.vrijeme.getMonth()+1}.${el.vrijeme.getFullYear()} ${el.vrijeme.getHours()}:${el.vrijeme.getMinutes()}`
          return(
          <div key={i}>
            <hr></hr>
            <div style={{display:"flex"}}>
                <h3>{el.komentator}</h3>
                {(username==el.komentator || isAdmin) &&
                <form action="/obrisikomentar" method="post">
                    <input type="hidden" name="id" defaultValue={el.id}></input>
                    <input type="submit" defaultValue="Obriši komentar"></input>
                </form>}
            </div>
            <p>{datum}</p>
            {username==el.komentator ?
            <form action="/azurirajkomentar" method="post">
              <input type="hidden" name="id" defaultValue={el.id}></input>
              <textarea name="tekst" defaultValue={el.tekst} width="100"></textarea>
              <input type="submit" defaultValue="Uredi komentar"></input>
            </form> : <p>{el.tekst}</p>}
            <hr></hr>
          </div>
          )
        })}
        {username &&
        <form action="/dodajkomentar" method="post">
          <input type="hidden" name="kolo" defaultValue={kolo}></input>
          <input name="tekst"></input>
          <input type="submit" defaultValue="Komentiraj"></input>
        </form>}
      </div>
    );
}