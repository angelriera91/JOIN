const cors = require('cors');
const mysql = require('mysql');
const http = require("http");
const host = 'localhost';
const port = 3000;
const bodyParser = require("body-parser");
const express = require("express");
const { response } = require("express");
const app = express();
const connection = mysql.createConnection({
    host: host,
    user: 'root',
    password: null,
    database: 'join'
})

connection.connect(function(error){
    if (error) {
        console.log(error);
    } else {
        console.log("conexion correcta");
    }
});

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

app.get("/event/bycreator"/* /event/bycreator/:id */, function(request,response) {
    var f = new Date();

    var fecha = f.getFullYear() + '-' + (f.getMonth() + 1) + '-' + f.getDate();

    var params = [request.body.id_creador,fecha]

    console.log(fecha);

    let sql = 'SELECT * FROM eventos WHERE id_creador = ? AND fecha >= "?"';
    
    connection.query(sql,function(err,result){
        if (err) {
            console.log(err);
        } else {
            response.send(result);
            console.log(result);    
        }
    })

});

app.get("/user/favorito"/* /user/favorito/:id */,function(request,response) {

    var params = [request.body.id_usuario]

    let sql = 'SELECT us.* FROM usuarios AS u INNER JOIN usuario_usuario AS uu ON u.id_usuario = uu.id_usuario INNER JOIN usuarios AS us ON uu.id_seguidor = us.id_usuario WHERE uu.id_usuario = ? ORDER BY us.id_usuario'
    
    console.log(sql);
    
    connection.query(sql,function(err,result){
        if (err) {
            console.log(err);
        } else {
            console.log(result);
            response.send(result);
        }
    })

});

app.get("/event/pasados"/* /event/pasados/:id */, function(request,response) {
    var f = new Date();

    var fecha = f.getFullYear() + '-' + (f.getMonth() + 1) + '-' + f.getDate();

    var params = [request.body.id_usuario,fecha]

    console.log(fecha);

    let sql = 'SELECT e.* FROM usuarios AS u INNER JOIN usuario_eventos AS ue ON u.id_usuario = ue.id_usuario INNER JOIN eventos AS e ON ue.id_evento = e.id_event WHERE ue.id_usuario = ? AND e.fecha <= "?" ORDER BY e.fecha DESC';
    
    console.log(sql);

    connection.query(sql,function(err,result){
        if (err) {
            console.log(err);
        } else {
            response.send(result);
            console.log(result);
        }
    })

});

app.get("/event/asistir"/* /event/asistir/:id */, function(request,response) {
    var f = new Date();

    var fecha = f.getFullYear() + '-' + (f.getMonth() + 1) + '-' + f.getDate();

    var params = [request.body.id_usuario,fecha]

    console.log(fecha);

    let sql = 'SELECT e.* FROM usuarios AS u INNER JOIN usuario_eventos AS ue ON u.id_usuario = ue.id_usuario INNER JOIN eventos AS e ON ue.id_evento = e.id_event WHERE ue.id_usuario = ? AND e.fecha >= "?" ORDER BY e.fecha ASC';
    
    console.log(sql);

    connection.query(sql,params,function(err,result){
        if (err) {
            console.log(err);
        } else {
            response.send(result);
            console.log(result);
        }
    })

});



app.listen(port);