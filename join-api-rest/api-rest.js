// conexcion con BBDD
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

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
//fin conexion




//registro usuario - MG
app.post("/register", function(request, response){
    let user = "INSERT INTO usuarios (nickname, nombre, apellidos, ciudad, correo, password) VALUES (?,?,?,?,?,?);"
    let array = [request.body.nickname, request.body.nombre, request.body.apellido, request.body.ciudad, request.body.correo, request.body.password, request.body.descripcion]
    connection.query(user, array, function(err,result){
        if(err){
            console.log(err);
            response.send(err);
        }
        else{
            console.log("Accion realizada correctamente");
            console.log(result);
            response.send(result);
        }
    })
});

//validacion de usuario para login - MG
app.post("/login", function(request, response){
    // let user = "SELECT * FROM usuarios WHERE correo = ? and password = ?"
    let user = "SELECT u.*, (e.total_valoracion/e.numero_valoracion) as media FROM usuarios AS u LEFT JOIN usuario_usuario AS uu ON u.id_usuario = uu.id_usuario LEFT JOIN eventos AS e ON uu.id_usuario = e.id_creador WHERE correo = ? and password = ? GROUP BY uu.id_usuario";
    let array = [request.body.correo, request.body.password]
    console.log(request.body)
    connection.query(user, array, function(err,result){
        if(err)
            console.log(err)
        else{
            console.log("Accion realizada correctamente");
            console.log(result)
            response.send(result)
        }
    })
});


//traer el id para guardar en favoritos - MG
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



//traer los eventos segun la categoria - MG
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


// evento por creador -JP
app.get("/eventos/creados/:id_creador"/* /event/bycreator/:id */, function(request,response) {
    
    var params = [request.params.id_creador]

    let sql = 'SELECT * FROM eventos WHERE id_creador = ? ' + 
                'AND CURRENT_DATE <= fecha ';

    connection.query(sql,params,function(err,result){
        if (err) {
            response.send(err);
            console.log(err);
        } else {
            response.send(result);
            console.log(result);
        }
    })

});

// usuarios favoritos -JP
app.get("/user/favoritos/:id_usuario"/* /user/favorito/:id */,function(request,response) {

    var params = [request.params.id_usuario]
    let sql = 'SELECT us.* FROM usuarios AS u INNER JOIN usuario_usuario AS uu ON u.id_usuario = uu.id_usuario INNER JOIN usuarios AS us ON uu.id_seguidor = us.id_usuario WHERE uu.id_usuario = ? ORDER BY us.id_usuario'
    
    connection.query(sql,params,function(err,result){
        if (err) {
            response.send(err);
            console.log(err);
        } else {
            console.log(result);
            response.send(result);
        }
    })

});



// eventos pasados -JP
app.get("/eventos/terminados/:id_usuario"/* /event/pasados/:id */, function(request,response) {
    var params = [request.params.id_usuario,request.params.id_usuario];

    let sql = 'SELECT e.* FROM usuarios AS u INNER JOIN usuario_eventos AS ue ON u.id_usuario = ue.id_usuario INNER JOIN eventos AS e ON ue.id_evento = e.id_event WHERE (e.id_creador = ? ' + 
                'OR ue.id_usuario = ?) AND e.fecha <= CURRENT_DATE ';

    console.log(sql);

    connection.query(sql,params,function(err,result){
        if (err) {
            response.send(err);
            console.log(err);
        } else {
            response.send(result);
            console.log(result);
        }
    })

});



// asistir a los eventos -JP
app.get("/eventos/asistir/:id_usuario"/* /event/asistir/:id */, function(request,response) {
    var f = new Date();
    var fecha = f.getFullYear() + "-" + (f.getMonth() + 1) + "-" + f.getDate();

    var params = [request.params.id_usuario,fecha];
    

    let sql = 'SELECT e.* FROM usuarios AS u INNER JOIN usuario_eventos AS ue ON u.id_usuario = ue.id_usuario INNER JOIN eventos AS e ON ue.id_evento = e.id_event WHERE ue.id_usuario = ? ' + 
                'AND e.fecha >= CURRENT_DATE';

    connection.query(sql,params,function(err,result){
        if (err) {
            response.send(err);
            console.log(err);
        } else {
            response.send(result);
            console.log(result);
        }
    })

});

//recoger favoritos
app.get("/user/totFavs/:id_usuario"/* /event/asistir/:id */, function(request,response) {

    var params = [request.params.id_usuario]

    let sql = 'SELECT COUNT(`id_usuario`) AS favoritos FROM `usuario_usuario` WHERE id_usuario = ? GROUP BY id_usuario';

    connection.query(sql,params,function(err,result){
        if (err) {
            console.log(err);
            response.send(err);
        } else {
            response.send(result);
            console.log(result);
        }
    })

});

// Recoger Media eventos user   By JP
app.get("/user/mediaEvents/:id_creador"/* /event/asistir/:id */, function(request,response) {

    var params = [request.params.id_creador]

    let sql = 'SELECT (total_valoracion/numero_valoracion) AS media FROM eventos WHERE id_creador = ? GROUP BY id_creador';

    connection.query(sql,params,function(err,result){
        if (err) {
            console.log(err);
            response.send(err);
        } else {
            response.send(result);
            console.log(result);
        }
    })

});



// Modificar usuario - LA
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

// Seguir favorito - LA
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

// Dejar de seguir favorito - LA
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

// Puntuar evento -LA
app.put("/evento/puntuacion",function(request, response){

    let id_evento = request.body.id_evento
    let puntuacion = [request.body.puntuacion]

let put_evento = 'UPDATE usuario_eventos SET puntuacion = ? WHERE id_evento ="' + id_evento + '"'

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

// Borrar cuenta -LA
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


// CREATE EVENT //

app.post("/create/event", function (request, response) {

    let evento =
        [request.body.titulo, request.body.lugar, request.body.fecha, request.body.hora, request.body.descripcion, request.body.categoria, request.body.imagen, 
         request.body.id_creador, request.body.max_assist
        ]

    let post_event = 'INSERT INTO eventos (titulo, lugar, fecha, hora, descripcion, categoria, imagen, id_creador, max_assist) VALUES (?,?,?,?,?,?,?,?,?) '
    
    connection.query(post_event, evento, function (err, result) {

        if (err) {
            console.log(err)
        }
        else {
            console.log("evento insertado")
            console.log(result)
            }
        response.send(result)
    })

});

app.get("/get/lastevent/:id_creador", function (request, response){

let id_creador = request.params.id_creador

let last_event = ' SELECT id_event FROM eventos WHERE id_creador = ? ORDER BY id_event DESC LIMIT 1 '

connection.query(last_event, id_creador, function (err, result) {

    if (err) {
        console.log(err)
    }

    else {
        console.log("ultimo evento recuperado")
        console.log(result)
    }

    response.send(result)
})

})

// ASSIST EVENTO //

app.post("/create/assist", function (request, response) {

    let user_Event = [request.body.id_evento, request.body.id_usuario]

    let post_event = 'INSERT INTO usuario_eventos (id_evento, id_usuario) VALUES (?,?)'

    connection.query(post_event, user_Event, function (err, result) {

        if (err) {
            console.log(err)
        }

        else {
            console.log("asistencia confirmada")
            console.log(result)
        }

        response.send(result)
    })

})

// GET- EVENT - MAIN //

app.get("/eventos/", function (request, response) {
    let evento = "SELECT e.id_event, e.titulo, e.lugar, e.fecha, e.hora, e.descripcion, e.categoria, e.imagen, u.nickname, COUNT(ue.id_usuario) as total_asist, e.max_assist FROM eventos e LEFT JOIN usuario_eventos ue ON ue.id_evento = e.id_event LEFT JOIN usuarios u ON U.id_usuario = e.id_creador GROUP BY e.id_event"
    
    
    connection.query(evento, function (err, result) {
        if (err)
            console.log(err)
        else {
            console.log("select correctamente");
            console.log(result)
        }
        response.send(result)
    })
});

// EDITAR EVENTO //

app.put("/put/event", function (request, response) {

    let event_id = request.body.event_id
    let evento =
        [request.body.title, request.body.lugar, request.body.fecha, request.body.hora, request.body.descripcion, request.body.categoria, request.body.imagen,
            event_id]

    let put_event = 'UPDATE eventos SET titulo = ?, lugar = ?, fecha = ?, hora = ?, descripcion = ?, categoria = ?, imagen = ?  where id_event = ? '

    connection.query(put_event, evento, function (err, result) {

        if (err) {
            console.log(err)
        }
        else {
            console.log("modificado correctamente")
            console.log(result)
        }
        response.send(result)
    })

})

// ELIMINAR EVENTO //

app.delete("/delete/event", function (request, response) {

    let event_id = request.body.event_id

    let delete_event = 'DELETE FROM eventos where id_event = ? '

    connection.query(delete_event, event_id, function (err, result) {

        if (err) {
            console.log(err)
        }
        else {
            console.log("eliminado correctamente")
            console.log(result)
        }
        response.send(result)
    })

})

app.listen(3000);