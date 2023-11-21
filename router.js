const express = require('express')
const routes = express.Router()
const cookieParser = require('cookie-parser')
const {home, logar, login, logout, painel} = require('./src/controllers/globalController')

routes.use(cookieParser())
routes.get('/', home)
routes.get('/login', login)
routes.get('/logout', logout)
routes.get('/painel', painel)
routes.post('/login', logar )

module.exports = routes