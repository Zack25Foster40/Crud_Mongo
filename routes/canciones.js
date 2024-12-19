const express = require('express');
const router = express.Router();
const Cancion = require('../models/Cancion');

// Crear una nueva canción (POST)
router.post('/', async (req, res) => {
    try {
        const cancion = new Cancion(req.body);
        await cancion.save();
        res.status(201).json(cancion);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Leer todas las canciones activas (GET)
router.get('/', async (req, res) => {
    try {
        const canciones = await Cancion.find({ estado: 1 });
        if (canciones.length === 0) {
            return res.status(404).json({ message: 'No se encontraron canciones activas' });
        }
        res.json(canciones);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Leer una canción por ID (GET)
router.get('/:id', async (req, res) => {
    try {
        const cancion = await Cancion.findById(req.params.id);
        if (!cancion || cancion.estado === 0) {
            return res.status(404).json({ message: 'Canción no encontrada o está inactiva' });
        }
        res.json(cancion);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Actualizar una canción por ID (PUT)
router.put('/:id', async (req, res) => {
    try {
        const cancion = await Cancion.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!cancion) {
            return res.status(404).json({ message: 'Canción no encontrada' });
        }
        res.json(cancion);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Eliminar lógicamente una canción (cambiar estado a 0) (DELETE)
router.delete('/:id', async (req, res) => {
    try {
        const cancion = await Cancion.findByIdAndUpdate(req.params.id, { estado: 0 }, { new: true });
        if (!cancion) {
            return res.status(404).json({ message: 'Canción no encontrada' });
        }
        res.json({ message: 'Canción eliminada lógicamente', cancion });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
