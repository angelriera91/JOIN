
let express = require("express");
let bodyParser = require ('body-parser');
let app = express();
let cors = require('cors');
app.use(cors());
let mysql = require("mysql");
let connection = mysql.createConnection(
    {
    host: "localhost", 
    user: "root",
    password: null,
    database: "join"
    
    });

    connection.connect(function(error) {
        if (error) {
            console.log(error);
        }else{
            console.log('Conexión correcta');
        }
    });

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Modificar usuario (listo con ?)
app.put("/usuario",
        function(request, response)
        {
            let usuario = [request.body.nombre, request.body.apellidos, request.body.ciudad, request.body.nickname, request.body.correo, request.body.password,
                           request.body.imagen, request.body.descripcion, request.body.id_usuario]
            let sql = "UPDATE usuarios SET nombre = ? , apellidos = ?, ciudad = ?, nickname = ?, correo = ?, password = ?, imagen = ?, descripcion = ? WHERE id_usuario = ? "
            console.log(sql);
            connection.query(sql, usuario, function (err, result)
            {
                if (err)
                    console.log(err);
                else
            {
                response.send(result);
            }
        })
    }
);

// Seguir favorito (listo con ?)
app.post("/usuario/favorito",function(request, response){

    let usuario =
    [request.body.id_usuario, request.body.id_seguidor]

let post_usuario = 'INSERT INTO usuario_usuario (id_usuario, id_seguidor) VALUES (?,?)'

connection.query(post_usuario, usuario, function (err, result){

    if(err){
        console.log(err)
    }
    else{
        console.log("insertado correctamente")
        console.log(result)
    }
    response.send(result)
    })

});

// Dejar de seguir favorito (listo con ?)
app.delete("/usuario/favorito",function(request, response){

    let usuario = [request.body.id_usuario]
    
let delete_favorito = 'DELETE FROM usuario_usuario WHERE id_usuario =?'

connection.query(delete_favorito, usuario, function (err, result){

    if(err){
        console.log(err)
    }
    else{
        console.log("Eliminado correctamente")
        console.log(result)
    }
    response.send(result)
    })

});

// Puntuar evento (listo con ?)
app.put("/evento/puntuacion",function(request, response){

    let evento_id = request.body.id_evento
    let puntuacion = [request.body.puntuacion]

let put_evento = 'UPDATE usuario_eventos SET puntuacion = ? WHERE id_evento ="' + evento_id + '"'

connection.query(put_evento, puntuacion, function (err, result){

    if(err){
        console.log(err)
    }
    else{
        console.log("Puntuación añadida")
        console.log(result)
    }
    response.send(result)
    })

});

// Borrar cuenta (listo con ?)
app.delete("/usuario",function(request, response){

    let id_usuario = request.body.id_usuario
    
let delete_usuario = 'DELETE FROM usuarios WHERE id_usuario ="' + id_usuario + '"'

connection.query(delete_usuario, function (err, result){

    if(err){
        console.log(err)
    }
    else{
        console.log("Eliminado correctamente")
        console.log(result)
    }
    response.send(result)
    })

});





app.listen(3000);