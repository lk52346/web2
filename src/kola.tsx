import * as React from "react";
import Rezultati from "./score";
import Komentari from "./komentari";


export default function Kola ({svaKola, isAdmin, username}){
    return (
      <div>
        {svaKola.map((el, i) => {
          return(
          <div className="kolo" key={i}>
            <hr></hr>
            <h3 className="koloNaziv">{el.ime}</h3>
            <Rezultati utakmice={el.utakmice} isAdmin={isAdmin} />
            {isAdmin &&
            <div className="container">
              <form action="/dodajrezultat" method="post" className="dodajRezultat">
                <input type="hidden" name="kolo" defaultValue={el.id}></input>
                <input size="15" placeholder="Domaći klub" name="imedomaci" style={{textAlign:"end"}}></input>
                <input size="1" placeholder="0" name="goldomaci" style={{textAlign:"end"}}></input>
                <input size="1" placeholder="0" name="golgosti"></input>
                <input size="15" placeholder="Klub gostiju" name="imegosti"></input>
                <input type="submit" defaultValue="Dodaj" className="spremiBtn"></input>
              </form>
            </div>
            }
            <Komentari sviKomentari={el.komentari} isAdmin={isAdmin} username={username} kolo={el.id}></Komentari>
          </div>
          
          )
        })}
      </div>
    );
}