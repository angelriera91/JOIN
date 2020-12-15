const express = require("express")
const bodyParser = require("body-parser")
let mysql = require("mysql");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


let connection = mysql.createConnection({
                
                host : "localhost",
                user: "root",
                password: "",
                database:"join"

                });
connection.connect(function (err){

    if(err){
        console.log(err)
    }
    else{
        
         console.log("conectado")
        
    }});


// CREATE EVENT //

app.post("/create/event",function(request, response){

    let evento =
    [request.body.title, request.body.lugar, request.body.fecha, request.body.hora, request.body.descripcion, request.body.categoria, request.body.imagen, request.body.id_creador
    ]

let post_event = 'INSERT INTO eventos (titulo,lugar,fecha,hora,descripcion,categoria,imagen,id_creador) VALUES (?,?,?,?,?,?,?,?)'

connection.query(post_event, evento, function (err, result){

    if(err){
        console.log(err)
    }
    else{
        console.log("insertado correctamente")
        console.log(result)
    }
    response.send(result)
    })

})

// ASSIST EVENTO //

app.post("/create/assist",function(request, response){

    let user = request.body.user_id
    let event = request.body.event_id

let post_event = 'INSERT INTO usuario_eventos (id_evento, id_usuario) VALUES ('+ event +','+ user +')'

connection.query(post_event, function (err, result){

    if(err){
        console.log(err)
    }
    else{
        console.log("asistencia confirmada")
        console.log(result)
    }
    response.send(result)
    })

})

// GET- EVENT - MAIN //

app.get("/eventos/", function(request, response){
    let evento = "SELECT * FROM eventos WHERE fecha > date"
    
    connection.query(evento, function(err,result){
        if(err)
            console.log(err)
        else{
            console.log("select correctamente");
            console.log(result)
        }
        response.send(result)
    })
});

// EDITAR EVENTO //

app.put("/put/event",function(request, response){

    let event_id = request.body.event_id
    let evento =
    [request.body.title, request.body.lugar, request.body.fecha, request.body.hora, request.body.descripcion, request.body.categoria, request.body.imagen, request.body.id_creador
    ]

let put_event = 'UPDATE eventos SET titulo = ?, lugar = ?, fecha = ?, hora = ?, descripcion = ?, categoria = ?, imagen = ?, id_creador = ? where id_event ="' + event_id + '"'

connection.query(put_event, evento, function (err, result){

    if(err){
        console.log(err)
    }
    else{
        console.log("modificado correctamente")
        console.log(result)
    }
    response.send(result)
    })

})

// ELIMINAR EVENTO //

app.delete("/delete/event",function(request, response){

    let event_id = request.body.event_id
    
let delete_event = 'DELETE FROM eventos where id_event ="' + event_id + '"'

connection.query(delete_event, function (err, result){

    if(err){
        console.log(err)
    }
    else{
        console.log("eliminado correctamente")
        console.log(result)
    }
    response.send(result)
    })

})




app.listen(3000);




















