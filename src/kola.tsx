import * as React from "react";
import Rezultati from "./score";
import Komentari from "./komentari";
export default function Kola ({svaKola, isAdmin, username}){
    return (
      <div>
        {svaKola.map(el => {
          return(
          <div>
            <hr></hr>
            <h3>{el.ime}</h3>
            <Rezultati utakmice={el.utakmice} isAdmin={isAdmin} />
            {isAdmin &&
            <form action="/dodajrezultat" method="post" style={{display:'flex'}}>
              <input type="hidden" name="kolo" value={el.id}></input>
              <input size="15" placeholder="Domaći klub" name="imedomaci"></input>
              <input size="1" placeholder="0" name="goldomaci"></input>
              <input size="1" placeholder="0" name="golgosti"></input>
              <input size="15" placeholder="Klub gostiju" name="imegosti"></input>
              <input type="submit" value="Dodaj"></input>
            </form>
            }
            <Komentari sviKomentari={el.komentari} isAdmin={isAdmin} username={username}></Komentari>
          </div>
          
          )
        })}
      </div>
    );
}