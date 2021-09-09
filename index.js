const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
require('./server/config/config');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());
app.use(cors());
app.use(express.static('./public'));
app.use(require('./server/routes/index'));

app.listen(process.env.PORT, () => {
    console.log(`Conectado al puerto ${process.env.PORT}`);
});
//Conexion local
//mongodb://localhost:27017/PPI

mongoose.connect('mongodb+srv://admin:admin@cluster0-gzppv.mongodb.net/FINANZAS', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}, (err, res) => {
    if (err) throw err;
    console.log('Conectado a la base de datos');
});