const express = require('express');
const app = express();

app.use(require('./usuario'));
app.use(require('./login'));
app.use(require('./categoria'));
app.use(require('./tipo'));
app.use(require('./ingresos'));
app.use(require('./egresos'));
app.use(require('./ahorro'));
app.use(require('./tipocredito'));
app.use(require('./credito'));
app.use(require('./detallecredito'));
app.use(require('./categoriaIng'));

module.exports = app;