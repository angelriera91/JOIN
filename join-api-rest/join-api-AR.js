const express = require("express")
const bodyParser = require("body-parser")
let mysql = require("mysql");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


let connection = mysql.createConnection({

    host: "localhost",
    user: "root",
    password: "",
    database: "join"

});
connection.connect(function (err) {

    if (err) {
        console.log(err)
    }
    else {

        console.log("conectado")

    }
});


// CREATE EVENT //

app.post("/create/event", function (request, response) {

    let evento =
        [request.body.title, request.body.lugar, request.body.fecha, request.body.hora, request.body.descripcion, request.body.categoria, request.body.imagen, request.body.id_creador
        ]

    let post_event = 'INSERT INTO eventos (titulo,lugar,fecha,hora,descripcion,categoria,imagen,id_creador) VALUES (?,?,?,?,?,?,?,?)'

    connection.query(post_event, evento, function (err, result) {

        if (err) {
            console.log(err)
        }
        else {
            console.log("insertado correctamente")
            console.log(result)
        }
        response.send(result)
    })

})

// ASSIST EVENTO //

app.post("/create/assist", function (request, response) {



    let user_Event = [request.body.event_id, request.body.user_id]

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
    let evento = "SELECT e.id_event, e.titulo, e.lugar, e.fecha, e.hora, e.descripcion, n.nickname FROM eventos e LEFT JOIN usuario_eventos ue ON ue.id_evento = e.id_event LEFT JOIN usuarios u ON u.id_usuario = ue.id_usuario LEFT JOIN (SELECT u.nickname, u.id_usuario from eventos e INNER JOIN usuarios u ON u.id_usuario = e.id_creador) as n ON n.id_usuario = e.id_creador GROUP BY e.id_event"

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