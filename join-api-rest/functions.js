let mysql = require("mysql")

let connection = mysql.createConnection({
                
                host : "localhost",
                user: "root",
                password: "",
                database:"join"

                });

                
connection.connect();








connection.end()

function selectok (err, result){

    if(err){
        console.log(err)
    }
    else{
        console.log("consulta ok")
        console.log(result)

    }
}