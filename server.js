const express = require('express');
const mysql = require('mysql');
const http_port = 10126;
const app = express();

app.listen(http_port, () => console.log("Admin page is available at localhost:" + http_port));

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "sophie_test",
  multipleStatements: true
});

db.connect((err) => {
  if (err) {
    console.log("Couldn't connect to database");
    console.log(err.message);
  } else {
    console.log("Database connected.");
  }
});


app.get('/', (req, res) => {

  var sql = `SELECT * FROM champions WHERE releasedate > '2012-01-01';`
  
  db.query(sql, (err, dbres) => {
    if (err) {
      console.log(err.message);
      res.send("hiba tortent: " + err.message)
      res.send();

    } else {
      console.log("Response:");

      console.log(dbres);
      res.send(dbres[0].champname + ' kiadas napja: ' + dbres[0].releasedate);
    }
  })
})

app.get('/roles', (req, res) => {

  var sql = 'select * from champions;'

  db.query(sql, (err, dbres) => {
    if (err) {
      console.log(err.message);
      res.send("hiba tortent: " + err.message)
      res.send();

    } else {
      console.log("Response:");
      console.log(dbres);
      var valasz = " ";
      for (var i = 0; i < dbres.length; i++) {
        valasz += dbres[i].champname + " " + dbres[i].champrole + " ";
      }
      res.send(valasz);
    }
  })

})

app.get('/list', (req, res) => {

  res.sendFile(__dirname + '/index.html');

})



app.get('/get/list', (req, res) => {

  var sql = `select * from champions;`
  db.query(sql, (err, dbres) => {

    if (err) {
      console.log(err.message);
      res.send("hiba tortent: " + err.message)
      res.send();

    } else {
      console.log("Response:");
      console.log(dbres);
      res.send(dbres);
    }

  })

})

app.get('/get/all', (req, res) => {

 res.send('click here');

})