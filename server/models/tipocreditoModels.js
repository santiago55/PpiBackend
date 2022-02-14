const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
let Schema = mongoose.Schema;

let tipoCreditoSchema = new Schema({
    nombre:{
        type: String,
        required:[true,'El tipo es requerido']
    }
});

tipoCreditoSchema.plugin(uniqueValidator, { message: '{PATH} ya existe' });
module.exports = mongoose.model('tipocreditos', tipoCreditoSchema);