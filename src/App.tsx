import * as React from "react";
require('dotenv').config()
import Kola from './kola'
import * as data from './data'
import Tablica from "./tablica";
var fs = require('fs');
var https = require('https');

var ReactDOMServer = require('react-dom/server')

const express = require('express')
const app = express()

const externalUrl = process.env.RENDER_EXTERNAL_URL;
const port = externalUrl && process.env.PORT ? parseInt(process.env.PORT) : 4080;

const bodyParser = require('body-parser')

const { auth, requiresAuth } = require('express-openid-connect');

const admins = ["bomecmsnagbujctppr@tmmwj.net"]

  

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: externalUrl && `http://localhost:${port}`,
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

app.use(express.static(__dirname + '/public'));


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
        <link rel="stylesheet" type="text/css" href="/styles.css" />
        <div id="root" class="glavno">
            <h1 class="naslov">Velika Liga</h1>
            <div class="dobrodosli">
              <div>Dobrodošli${isLoggedIn ? ", " + username : ""}!</div>
              <div>
                <form action="${isLoggedIn ? "/logout" : "/login"}">
                  <input type="submit" value="${isLoggedIn ? "Logout" : "Login"}" />
                </form>
              </div>
            </div>
            <div>${ReactDOMServer.renderToString(<Kola svaKola={svaKola} isAdmin={isAdmin} username={username}/>)}</div>
            <div>${ReactDOMServer.renderToString(<Tablica sviKlubovi={sviKlubovi}/>)}</div>
        </div>
        `
      )
})

app.listen(port, ()=>{
  console.log("Server pokrenut!")
})

// if (externalUrl) {
//   const hostname = '127.0.0.1';
//   app.listen(port, hostname, () => {
//   console.log(`Server locally running at http://${hostname}:${port}/ and from
//   outside on ${externalUrl}`);
//   });
// }
// else {
//   https.createServer({
//   key: fs.readFileSync('server.key'),
//   cert: fs.readFileSync('server.cert')
//   }, app)
//   .listen(port, function () {
//   console.log(`Server running at https://localhost:${port}/`);
//   });
// }