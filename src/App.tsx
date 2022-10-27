import * as React from "react";
require('dotenv').config()
import Rezultati from './score'
import Kola from './kola'
import * as data from './data'
import Tablica from "./tablica";

var ReactDOMServer = require('react-dom/server')

const express = require('express')
const app = express()

const externalUrl = process.env.RENDER_EXTERNAL_URL;
const port = externalUrl && process.env.PORT ? parseInt(process.env.PORT) : 4080;

const bodyParser = require('body-parser')

const { auth, requiresAuth } = require('express-openid-connect');

const admins = ["luka.kusec@hotmail.com", "bomecmsnagbujctppr@tmmwj.net"]


const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: 'http://localhost:4080',
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: 'https://dev-32t7tjpqcg4madc1.us.auth0.com'
};

app.use(auth(config));


app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)


app.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

app.post('/dodajrezultat', requiresAuth(), async (req, res) =>{
  if(admins.includes(req.oidc.user.email)){
    await data.postRezultat(req.body);
    res.redirect('/');
  } else {
    res.send("NOT AUTHORIZED");
  }
})

app.post('/azurirajrezultat', requiresAuth(), async(req, res) =>{
  if(admins.includes(req.oidc.user.email)){
    await data.azurirajRezultat(req.body);
    res.redirect('/');
  } else {
    res.send("NOT AUTHORIZED");
  }
})

app.post('/azurirajkomentar', requiresAuth(), async(req, res) =>{
  var komentar = await data.getKomentar(req.body.id)
  if(req.oidc.user.email==komentar.komentator){
    await data.azurirajKomentar(req.body);
    res.redirect('/');
  }else {
    res.send("NOT AUTHORIZED");
  }
})

app.post('/dodajkomentar', requiresAuth(), async(req, res) =>{
  var komentar = req.body;
  komentar.komentator = req.oidc.user.email;
  const date = new Date();
  komentar.vrijeme = date.toTimeString();
  await data.postKomentar(komentar)
  res.redirect('/');
})

app.post('/obrisikomentar', requiresAuth(), async(req, res) =>{
  var komentar = await data.getKomentar(req.body.id);
  if(admins.includes(req.oidc.user.email) || (komentar && komentar.komentator==req.oidc.user.email)){
    await data.deleteKomentar(req.body.id);
    res.redirect('/');
  } else {
    res.send("NOT AUTHORIZED");
  }
})

app.get('/', async (req, res) => {
    var svaKola = await data.getAllKola()
    for(var el of svaKola){
        el.utakmice = await data.getUtakmiceByKolo(el.id)
        el.komentari = await data.getKomentariKola(el.id)
    }
    var sviKlubovi = await data.getKluboviSaGolovima();

    let username : string | undefined;
    var isLoggedIn = req.oidc.isAuthenticated()
    if (isLoggedIn) {
      username = req.oidc.user?.name ?? req.oidc.user?.sub;
    }

    var isAdmin = isLoggedIn && (admins.includes(req.oidc.user.email))

    res.send(
        `
        <div id="root">
            <h1>Velika Liga</h1>
            <div>
              <span>Dobrodošli${isLoggedIn ? ", " + username : ""}!</span>
              <span>
                <form action="${isLoggedIn ? "/logout" : "/login"}">
                  <input type="submit" value="${isLoggedIn ? "Logout" : "Login"}" />
                </form>
              </span>
            </div>
            <div>${ReactDOMServer.renderToString(<Kola svaKola={svaKola} isAdmin={isAdmin} username={username}/>)}</div>
            <div>${ReactDOMServer.renderToString(<Tablica sviKlubovi={sviKlubovi}/>)}</div>
        </div>
        `
      )
})

app.listen(port, () => {
    console.log(`Aplikacija pokrenuta uspješno!`)
})