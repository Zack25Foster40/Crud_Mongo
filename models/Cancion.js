const mongoose = require('mongoose');

const CancionSchema = new mongoose.Schema({
    genero: String,
    año_escritura: Number,
    tema: String,
    estado: { type: Number, default: 1 }, // Estado lógico: 1 (activo), 0 (inactivo)
});

// Índices para mejorar búsquedas
CancionSchema.index({ genero: 1 });
CancionSchema.index({ estado: 1 });

module.exports = mongoose.model('Cancion', CancionSchema);
