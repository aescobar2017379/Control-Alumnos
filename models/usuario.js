const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usuarioSchema = new Schema({
  nombre: {
    type: String,
    required: true
  },
  correoElectronico: {
    type: String,
    required: true,
    unique: true
  },
  contrasenia: {
    type: String,
    required: true
  },
  rol: {
    type: String,
    enum: ['ROLE_ALUMNO', 'ROLE_MAESTRO'],
    required: true
  }
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;
