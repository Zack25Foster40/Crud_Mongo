const mongoose = require('mongoose');

// Definir el esquema del Cantante con campos no requeridos
const CantanteSchema = new mongoose.Schema({
    id_cantante: { type: String }, // Ya no es requerido
    nombre_artista: { type: String }, // Ya no es requerido
    estado: { type: Number, default: 1 } // Estado lógico: 1 (activo), 0 (inactivo), sigue con valor por defecto
});

// Crear índices para optimizar las consultas
CantanteSchema.index({ id_cantante: 1 }); // Índice ascendente
CantanteSchema.index({ estado: 1 });

// Exportar el modelo basado en el esquema
module.exports = mongoose.model('Cantante', CantanteSchema);
