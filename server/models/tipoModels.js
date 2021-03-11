const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
let Schema = mongoose.Schema;

let tipoSchema = new Schema({
    tipo:{
        type: String,
        required:[true,'El tipo es requerido']
    }
});

tipoSchema.plugin(uniqueValidator, { message: '{PATH} ya existe' });
module.exports = mongoose.model('tipos', tipoSchema);