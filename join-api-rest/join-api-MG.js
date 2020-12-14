const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let mysql = require("mysql");
let connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: null,
    database: "join"
});
connection.connect(function(error){
    if(error){
        console.log(error);
    }
    else{
        console.log("Conexion correcta");
    }
});



//registro usuario
app.post("/user/register", function(request, response){
    let user = "INSERT INTO usuarios (nickname, nombre, apellidos, ciudad, correo, contraseña) VALUES (?,?,?,?,?,?);"
    let array = [request.body.nickname, request.body.nombre, request.body.apellidos, request.body.ciudad, request.body.correo, request.body.contraseña, request.body.descripcion]
    connection.query(user, array, function(err,result){
        if(err)
            console.log(err)
        else{
            console.log("Accion realizada correctamente");
            console.log(result)
        }
        response.send(result)
    })
});

//validacion de usuario para login
app.get("/user/login/email", function(request, response){
    let user = "SELECT * FROM usuarios WHERE correo = ? and password = ?"
    let array = [request.body.correo, request.body.password]
    connection.query(user, array, function(err,result){
        if(err)
            console.log(err)
        else{
            console.log("Accion realizada correctamente");
            console.log(result)
        }
        response.send(result)
    })
});


//traer el id para guardar en favoritos
app.get("/user/login/id_usuario", function(request, response){
    let user = "SELECT * FROM usuarios WHERE id_usuario = ?"
    let array = [request.body.id_usuario]
    connection.query(user, array, function(err,result){
        if(err)
            console.log(err)
        else{
            console.log("Accion realizada correctamente");
            console.log(result)
        }
        response.send(result)
    })
});



//traer los eventos segun la categoria
app.get("/eventos/categoria", function(request, response){
    let user = "SELECT * FROM eventos WHERE categoria = ?"
    let array = [request.body.categoria]
    connection.query(user, array, function(err,result){
        if(err)
            console.log(err)
        else{
            console.log("Accion realizada correctamente");
            console.log(result)
        }
        response.send(result)
    })
});




app.listen(3000);