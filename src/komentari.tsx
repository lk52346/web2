import * as React from "react";
import Rezultati from "./score";
export default function Komentari ({sviKomentari, isAdmin, username, kolo}){
    return (
      <details style={{marginLeft:100, marginBot:30}}>
        <summary>Komentari</summary>
        {sviKomentari.map((el, i) => {
          const datum = `${el.vrijeme.getDate()}.${el.vrijeme.getMonth()+1}.${el.vrijeme.getFullYear()} ${el.vrijeme.getHours().toString().padStart(2, '0')}:${el.vrijeme.getMinutes().toString().padStart(2, '0')}`
          return(
          <div key={i}>
            <hr></hr>
            <div style={{display:"flex"}}>
                <div className="komentator">{el.komentator}</div>
                {(username==el.komentator || isAdmin) &&
                <form action="/obrisikomentar" method="post" style={{margin:"5px"}}>
                    <input type="hidden" name="id" defaultValue={el.id}></input>
                    <input type="submit" defaultValue="X" className="obrisiBtn"></input>
                </form>}
            </div>
            <p>{datum}</p>
            {username==el.komentator ?
            <form action="/azurirajkomentar" method="post" style={{marginLeft:"10px"}}>
              <input type="hidden" name="id" defaultValue={el.id}></input>
              <textarea name="tekst" className="komentar" defaultValue={el.tekst} width="100"></textarea>
              <input type="submit" defaultValue="Uredi komentar"></input>
            </form> : <p style={{marginLeft:"10px"}}>{el.tekst}</p>}
          </div>
          )
        })}
        {username &&
        <div style={{marginTop: "25px"}}>
          <div style={{fontSize:"25px", margin:"10px"}}>Dodaj komentar</div>
          <form action="/dodajkomentar" method="post">
            <input type="hidden" name="kolo" defaultValue={kolo}></input>
            <textarea className="komentar" name="tekst"></textarea>
            <input type="submit" defaultValue="Komentiraj"></input>
          </form>
        </div>
        }
      </details>
    );
}