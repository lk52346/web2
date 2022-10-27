import * as React from "react";
export default function Rezultati ({utakmice, isAdmin}){
    return (
      <div>
        {utakmice.map(el => {
          return(
          <form action="/azurirajrezultat" method="post" >
            <input type="hidden" name="id" value={el.id}></input>
            <span>
                {el.domaci} {isAdmin ? <input name="goldomaci" size="1" value={el.goldomaci}></input> : el.goldomaci == null ? '-' : el.goldomaci}
            </span>
            <span>
                |
            </span>
            <span>
            {isAdmin ? <input name="golgosti" size="1" value={el.golgosti}></input> : el.golgosti == null ? '-' : el.golgosti} {el.gosti}
            </span>
            {isAdmin && <input type="submit" value="Spremi"></input>}
          </form>
          )
        })}
      </div>
    );
}