const express = require('express');
const app = express();

app.use(require('./usuario'));
app.use(require('./login'));
app.use(require('./categoria'));
app.use(require('./tipo'));
app.use(require('./ingresos'));
app.use(require('./egresos'));

module.exports = app;