require("dotenv").config()

const express = require("express");
const mongoose = require('mongoose');

const app = express()

mongoose.connect(process.env.URL_DATABASE)
const db = mongoose.connection

db.on('error',(error)=> console.error(error))
db.once('open',() => console.log('Connected to Database'))

app.use(express.json())

const personneRoute = require("./routes/Personnes");
app.use('/api/personnes',personneRoute)
app.listen(3000,()=> console.log('Server Started'));

