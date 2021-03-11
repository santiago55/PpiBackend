const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
let Schema = mongoose.Schema;

let CategoriaSchema = new Schema({
    categoria: {
        type: String,
        unique: true,
        required: [true, 'La categoria es obligatoria']
    },
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' }
});

CategoriaSchema.plugin(uniqueValidator, { message: '{PATH} ya existe' });
module.exports = mongoose.model('categorias', CategoriaSchema);