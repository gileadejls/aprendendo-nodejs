require('dotenv').config()


//LIBS NECESSARIAS
const express = require('express')
const cookieParser = require('cookie-parser')
const app = express()
const path = require('path')
const router = require('./router')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')


//CONECTANDO AO BANCO DE DADOS
mongoose.connect(process.env.CONNECTIONSTRING).then(()=>{
    console.log("O banco de dados Foi Conectado com Sucesso!")
    app.emit('ready')
})

//SETANDO O EJS
app.set('views', path.resolve(__dirname, 'src', 'views'))
app.set('view engine', 'ejs')

//MIDDLEWARES
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')));
app.use(router)
app.use(cookieParser())


//MIDDLEWARE --> VARIAVEIS
app.use((req, res, next)=>{
    res.locals.user = null
    res.locals.cookies = null
    next()
})

app.on('ready', ()=>{
    app.listen(80, ()=>{
        console.log("Servidor executando --> http://localhost:3000")
    })
})