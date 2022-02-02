const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
let Schema = mongoose.Schema;

let detalleCreditoSchema = Schema({
    
    nroCuotas: {
        type: Number,
        required: [true, 'El numero de cuotas es requerido']
    },
    valor: {
        type: Number,
        required: [true, 'El precio es requerido']
    },
   
    fechaCuota: {
        type: String,
        required: [true, 'la fecha es necesaria']
    },
    
    descripcion: {
        type: String
    },
    estado: {
        type: String,
        required: [true, 'El estado es requerido']
    },
    idCredito: {
        type: Schema.Types.ObjectId, ref: 'idCredito'
    }
});

detalleCreditoSchema.plugin(uniqueValidator, { message: '{PATH} ya existe' });
module.exports = mongoose.model('detallecreditos', detalleCreditoSchema);