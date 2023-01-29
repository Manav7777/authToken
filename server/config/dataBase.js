var mysql = require('mysql2');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "authuserjwt"
});

con.connect(function(err) {
  if (err){
    console.log('connection Error',err)
  }else{
    console.log("Connected!");
  }
});
module.exports = con;