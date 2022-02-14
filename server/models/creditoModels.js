const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
let Schema = mongoose.Schema;

let creditoSchema = Schema({
    descripcion: {
        type: String,
        required: [true, 'La descripcion es requerido']
    },
    valor: {
        type: Number,
        required: [true, 'El precio es requerido']
    },
    nroCuotas: {
        type: Number,
        required: [true, 'El numero de cuotas es requerido']
    },
    tipoCredito: {
        type: String
    },
    fechaRegistro: {
        type: Date,
        required: [true, 'la fecha es necesaria']
    },
    fechaCorte: {
        type: Date,
        required: [true, 'la fecha es necesaria']
    },
    porcentaje: {
        type: Number,
        required: [true, 'El numero de cuotas es requerido']
    },
    usuario: {
        type: Schema.Types.ObjectId, ref: 'Usuario'
    }
});

creditoSchema.plugin(uniqueValidator, { message: '{PATH} ya existe' });
module.exports = mongoose.model('creditos', creditoSchema);