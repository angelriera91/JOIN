
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

// Modificar usuario
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

// Seguir favorito
app.post("/usuario/favoritos",
        function(request, response)
        {
            console.log(request.body);
            let sql = "INSERT INTO usuario_usuario (id_usuario, id_seguidor) " + 
                    "VALUES ('" + request.body.id_usuario + "', '" +
                                request.body.id_seguidor + "')";
            console.log(sql)
            connection.query(sql, function (err, result)
            {
                if (err)
                    console.log(err);
                else
            {
                if (result.insertId)
                    response.send(String(result.insertId));
                else
                    response.send("-1");
            }
        })
    }
);

// Dejar de seguir favorito
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

// Puntuar evento
app.put("/evento/puntuacion",
        function(request, response)
        {
            let sql = "UPDATE eventos SET numero_valoracion = '" + request.body.numero_valoracion +
                        "WHERE id_evento = " + request.body.id_evento;
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

// Borrar cuenta
app.delete("/usuario",
    function(request, response)
    {
        const id = request.query.id;
        let sql = "DELETE FROM usuarios WHERE id_usuario = '" + id_usuario + "'";
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