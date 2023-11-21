const usuario = require('../models/userSchema')
let username = ''
const cookieParser = require('cookie-parser');

//TOKENS
const jwt = require('jsonwebtoken')

exports.painel = (req, res) =>{
    const cookie = req.cookies.authToken
    if(!cookie){
       return res.status(401).send('Você precisa fazer login para acessar está pagina')
    }

    jwt.verify(cookie, 'qualquercoisa', (err, decoded) =>{
        if(err){
            return res.status(401).send("Token Invalido")
        }

        res.render('painel', {user: username})
    })

}

exports.home = (req, res) =>{
    const cookie = req.cookies.authToken;
    console.log(cookie)

    if(!cookie){
        res.render('home', {user: null})
    }else{
        res.render('home', {user: username})
    }
}

exports.logout = (req, res) =>{
    res.clearCookie('authToken')
    console.log('cookies deletados')
    res.redirect('/')
}

exports.login = (req, res) =>{
    res.render('login', {errors: null})
}

exports.logar = async (req, res) =>{
    const logar = new usuario(req.body)
    let result = await logar.login()
    if(!result){
        console.log(result)
        res.render('login', {errors: logar.errors})
        return
    }
    // GERANDO O TOKEN E SALVANDO NO COOKIE
    const userID = logar.user
    const token = jwt.sign({ userID }, 'qualquercoisa', {expiresIn: '1h'} )
    res.cookie('authToken', token, { httpOnly: true, sameSite: 'none', path: '/'})

    //LOGIN COM SUCESSO
    console.log(result)
    console.log("Login Efetuado!")

    //PASSANDO O NOME DE USUARIO LOGADO
    username = logar.username

    //REDIRECIONANDO
    res.redirect("/")
}
