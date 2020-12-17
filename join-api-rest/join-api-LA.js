
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

// Modificar usuario (funciona)
app.put("/usuario",
        function(request, response)
        {
            let sql = "UPDATE usuarios SET nombre = '" + request.body.nombre +
                        "', apellidos = '" + request.body.apellidos +
                        "', ciudad = '" + request.body.ciudad +
                        "', nickname = '" + request.body.nickname +
                        "', correo = '" + request.body.correo +
                        "', password = '" + request.body.password +
                        "', imagen = '" + request.body.imagen +
                        "', descripcion = '" + request.body.descripcion + "'" +
                        "WHERE id_usuario = " + request.body.id_usuario;
            console.log(sql);
            connection.query(sql, function (err, result)
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

// Seguir favorito (funciona, ya tiene ?)
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

// Dejar de seguir favorito (funciona)
app.delete("/usuario/favoritos",
    function(request, response)
    {
        const id = request.query.id;
        let sql = "DELETE FROM usuario_usuario WHERE id_usuario = '" + id_usuario + "'";
        console.log(sql);
            connection.query(sql, function (err, result)
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

// Puntuar evento (funciona, ya tiene ?)
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

// Borrar cuenta (funciona)
app.delete("/usuario",
    function(request, response)
    {
        let sql = "DELETE FROM usuarios WHERE id_usuario = " + request.body.id_usuario;
        console.log(sql);
            connection.query(sql, function (err, result)
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





app.listen(3000);