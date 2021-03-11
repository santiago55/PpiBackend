const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
let Schema = mongoose.Schema;

let UsuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'el nombre es requerido']
    },
    apellidos: {
        type: String,
        required: [true, 'Los apellidos son necesarios']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El email es necesario']
    },
    userName: {
        type: String,
        unique: true,
        required:[true, 'El username es requerido']
    },
    password:{
        type:String,
        required:[true, 'La contraseña es requerida']
    }
});

UsuarioSchema.plugin(uniqueValidator, { message: '{PATH} ya existe' });
module.exports = mongoose.model('users', UsuarioSchema);
