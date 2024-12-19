const express = require('express');
const router = express.Router();
const Cantante = require('../models/Cantante'); // Importar el modelo de Cantante

// 1. Crear un nuevo cantante (POST)
router.post('/', async (req, res) => {
    try {
        const cantante = new Cantante(req.body); // Crear una instancia del cantante con los datos enviados
        await cantante.save(); // Guardar en la base de datos
        res.status(201).json(cantante); // Responder con el cantante creado
    } catch (error) {
        res.status(500).json({ message: error.message }); // Responder en caso de error
    }
});

// 2. Obtener todos los cantantes activos (GET)
router.get('/', async (req, res) => {
    try {
        const cantantes = await Cantante.find({ estado: 1 }); // Buscar solo cantantes activos
        res.json(cantantes); // Responder con la lista de cantantes activos
    } catch (error) {
        res.status(500).json({ message: error.message }); // Responder en caso de error
    }
});

// 3. Obtener un cantante específico por id_cantante (GET)
router.get('/:id', async (req, res) => {
    try {
        const cantante = await Cantante.findOne({ id_cantante: req.params.id, estado: 1 }); // Buscar por id_cantante y estado activo
        if (!cantante) {
            return res.status(404).json({ message: 'Cantante no encontrado' }); // Si no se encuentra
        }
        res.json(cantante); // Responder con el cantante encontrado
    } catch (error) {
        res.status(500).json({ message: error.message }); // Responder en caso de error
    }
});

// 4. Actualizar un cantante por id_cantante (PUT)
router.put('/:id', async (req, res) => {
    try {
        const cantante = await Cantante.findOneAndUpdate(
            { id_cantante: req.params.id }, // Buscar por id_cantante (independientemente del estado)
            req.body,                      // Los datos para actualizar
            { new: true }                  // Devuelve el cantante actualizado
        );
        if (!cantante) {
            return res.status(404).json({ message: 'Cantante no encontrado' }); // Si no se encuentra
        }
        res.json(cantante); // Responder con el cantante actualizado
    } catch (error) {
        res.status(500).json({ message: error.message }); // Responder en caso de error
    }
});

// 5. Eliminación lógica de un cantante (DELETE)
router.delete('/:id', async (req, res) => {
    try {
        const cantante = await Cantante.findOneAndUpdate(
            { id_cantante: req.params.id, estado: 1 }, // Buscar por id_cantante y estado activo
            { estado: 0 },                            // Actualizar el estado a 0 (inactivo)
            { new: true }                             // Devolver el registro actualizado
        );
        if (!cantante) {
            return res.status(404).json({ message: 'Cantante no encontrado o ya eliminado' }); // Si no se encuentra
        }
        res.json({ message: 'Cantante eliminado lógicamente', cantante }); // Responder con el mensaje de éxito
    } catch (error) {
        res.status(500).json({ message: error.message }); // Responder en caso de error
    }
});

// Exportar las rutas
module.exports = router;
