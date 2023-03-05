const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cursoSchema = new Schema({
  nombre: {
    type: String,
    required: true
  },
  descripcion: {
    type: String,
    required: true
  },
  estudiantes: [{
    type: Schema.Types.ObjectId,
    ref: 'Usuario'
  }]
});

const curso = mongoose.model('curso', cursoSchema);

module.exports = curso;
