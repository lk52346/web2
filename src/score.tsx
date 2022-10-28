import * as React from "react";
export default function Rezultati ({utakmice, isAdmin}){
    return (
      <div className="sviRezultati">
        {utakmice.map((el, i) => {
          return(
          <form action="/azurirajrezultat" method="post" key={i} className="rezultat">
            
            <span style={{justifySelf:"end"}} className="rezultatDio">
                <div>
                {el.domaci}
                </div>
                <div className="gol">
                 {isAdmin ? <input name="goldomaci" size="1" defaultValue={el.goldomaci} style={{textAlign:"end"}}></input> : el.goldomaci == null ? '-' : el.goldomaci} 
                </div>
            </span>
            <span  className="rezultatDio">
                <div className="gol">
                  {isAdmin ? <input name="golgosti" size="1" defaultValue={el.golgosti}></input> : el.golgosti == null ? '-' : el.golgosti} 
                </div>
                <div>
                  {el.gosti}
                </div>
            </span>
            <input type="hidden" name="id" defaultValue={el.id}></input>
            {isAdmin && <input type="submit" defaultValue="Spremi" className="spremiBtn"></input>}
          </form>
          )
        })}
      </div>
    );
}