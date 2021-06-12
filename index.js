var express = require("express");
var mysql = require("mysql");
var app = express();
var path = require('path')
var bodyParser = require('body-parser')
app.use(bodyParser.json());

var connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'tp_tdm'

});

app.use(express.static(path.join(__dirname, 'images')))
app.get('/getMedecins', function (req, res, next) {
    var query = "select * from medecins"
    connection.query(query, function (error, results) {
        if (error) { next(error) } else {
            res.send((results));
        }
    })
});
app.get('/', (req, res) => {
    res.send("<h1>hello </h1>")
})
app.post('/createMedecin', (req, res) => {
    console.log(req.body)
    var query = `INSERT INTO medecins (nom,prenom,specialite,tel,longtitude,latitude,image) values ('${req.body.nom}','${req.body.prenom}','${req.body.specialite}',${req.body.tel},${req.body.longtitude},${req.body.latitude},'${req.body.image}')`
    connection.query(query, function (error, results) {
        if (error) { res.status(500).send(JSON.stringify({ message: error.message })) } else {
            res.send(JSON.stringify(results));
        }
    })
})
app.post('/createConseil', async (req, res) => {
    let query = `INSERT INTO conseil (id_medecin,id_patient,contenu) VALUES (${req.body.id_medecin},${req.body.id_patient},'${req.body.contenu}') `
    connection.query(query, function (error, results) {
        if (error) { res.status(500).send(JSON.stringify({ message: error.message })) } else {
            res.send(JSON.stringify(results));
        }
    })
})
app.listen(5000, () => {
    console.log('listening on port 5000')
})