import * as React from "react";
export default function Rezultati ({utakmice, isAdmin}){
    return (
      <div>
        {utakmice.map((el, i) => {
          return(
          <form action="/azurirajrezultat" method="post" key={i}>
            <input type="hidden" name="id" defaultValue={el.id}></input>
            <span>
                {el.domaci} {isAdmin ? <input name="goldomaci" size="1" defaultValue={el.goldomaci}></input> : el.goldomaci == null ? '-' : el.goldomaci}
            </span>
            <span>
                |
            </span>
            <span>
            {isAdmin ? <input name="golgosti" size="1" defaultValue={el.golgosti}></input> : el.golgosti == null ? '-' : el.golgosti} {el.gosti}
            </span>
            {isAdmin && <input type="submit" defaultValue="Spremi"></input>}
          </form>
          )
        })}
      </div>
    );
}