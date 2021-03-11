const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
let Schema = mongoose.Schema;

let egresoSchema = new Schema({
    descripcion: {
        type: String,
        unique: true,
        required: [true, 'La descripcion es requerido']
    },
    valor: {
        type: Number,
        required: [true, 'El precio es requerido']
    },
    date: {
        type: Date,
        required: [true, 'la fecha es necesaria']
    },
    categoria: {
        type: String
    },
    tipo: {
        type: String
    },
    usuario: {
        type: Schema.Types.ObjectId, ref: 'Usuario'
    }
});

egresoSchema.plugin(uniqueValidator, { message: '{PATH} ya existe' });
module.exports = mongoose.model('egresos', egresoSchema);