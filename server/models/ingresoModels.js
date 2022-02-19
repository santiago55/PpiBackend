const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
let Schema = mongoose.Schema;

let ingresoSchema = Schema({
    descripcion: {
        type: String
    },
    valor: {
        type: Number,
        required: [true, 'El precio es requerido']
    },
    tipo: {
        type: String
    },
    categoria: {
        type: String

    },
    date: {
        type: Date,
        required: [true, 'la fecha es necesaria']
    },
    usuario: {
        type: Schema.Types.ObjectId, ref: 'Usuario'
    }
});

ingresoSchema.plugin(uniqueValidator, { message: '{PATH} ya existe' });
module.exports = mongoose.model('ingresos', ingresoSchema);