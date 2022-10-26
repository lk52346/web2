import { Pool } from 'pg'
import dotenv from 'dotenv'

const express = require('express')
const app = express()

dotenv.config()
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: 'rezultatiligedb',
    password: process.env.DB_PASSWORD,
    port: 5432,
    ssl : true
})

app.get('/', (req, res) => {
    res.send('Hello World!')
  })
