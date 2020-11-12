const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3200;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.json({ limit: '100mb' }))
app.use(bodyParser.urlencoded({ extended: true, limit: '100mb' }));
app.use(cors());

// MySql
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'martin@M070208',
    database: 'wolfcity'
});

// Route
app.get('/', (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
});

app.post('/wolfs', (req, res) => {
    const sql = 'INSERT INTO WOLFS SET ?';

    const customerObj = {
        nombre: req.body.nombre,
        apellio: req.body.apellido,
        telefono: req.body.telefono,
        correo: req.body.correo,
        fecha: req.body.fecha,
        metodopago: req.body.metodopago,
        hectarea: req.body.hectarea
    };

    connection.query(sql, customerObj, error => {
        if (error) throw error;
        res.send('created!');
    });
});



connection.connect(error => {
    if (error) throw error;
    console.log('Database server running!');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
