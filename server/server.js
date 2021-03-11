const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
require('./config/config');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());
app.use(cors());
    
app.use(require('./routes/index'));

app.listen(process.env.PORT, () => {
    console.log(`Conectado al puerto ${process.env.PORT}`);
});

mongoose.connect('mongodb://localhost:27017/PPI', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}, (err, res) => {
    if (err) throw err;
    console.log('Conectado a la base de datos');
});