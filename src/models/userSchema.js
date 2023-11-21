const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    nome: String,
    password: String,
})

const userModel = mongoose.model('usuario', userSchema)


class Usuario {
    constructor(body){
        this.body = body
        this.errors = []
        this.user = null
        this.username = null
    }

    async login(){
       try{
        let findUser = await userModel.find({nome: this.body.name, password: this.body.password})

        if(findUser.length == 0){
            console.log("Usuario ou senha Incorretos")
            this.errors.push("Usuarios Ou Senha Incorreta")
            return
        }

        //PASSANDO O OBJECT 
        this.user = findUser[0]

        //PASSANDO O NOME DO USUARIO
        this.username = findUser[0].nome
        console.log(this.username)

        
        console.log("Logado com Sucesso!")
        console.log(findUser)
        return true
       }catch(e){console.log(e)}
    }
}

module.exports = Usuario