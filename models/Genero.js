const mongoose = require('mongoose');

const GeneroSchema = new  mongoose.Schema({
    isbn: String,
    genero: String,
    año: Number,
    origen: String,
    estado: { type: Number, default: 1 } // Estado lógico: 1 (activo), 0 (inactivo)
});

// Índices para mejorar la búsqueda
GeneroSchema.index({ estado: 1 });
GeneroSchema.index({ origen: 1 });  // Índice para buscar origenes activos o inactivos

// Crear el modelo a partir del esquema
module.exports = mongoose.model('Genero', GeneroSchema);
