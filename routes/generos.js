const express = require('express');
const router = express.Router();
const Genero = require('../models/Genero');  // Importamos el modelo de Genero

// 1. Almacenamiento (Crear)
router.post('/', async (req, res) => {
    try {
        // Verificar que los campos necesarios estén presentes
        const { isbn, genero, año, origen } = req.body;
        if (!isbn || !genero || !año || !origen) {
            return res.status(400).json({ message: 'isbn, genero, año y origen son necesarios' });
        }

        // Crear un nuevo género
        const nuevoGenero = new Genero(req.body);
        await nuevoGenero.save();
        res.status(201).json(nuevoGenero);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 2. Lectura (Leer) - Obtener todos los géneros activos
router.get('/', async (req, res) => {
    try {
        const generos = await Genero.find({ estado: 1 });  // Solo géneros activos
        res.json(generos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 3. Actualización (Actualizar)
router.put('/:id', async (req, res) => {
    try {
        const generoActualizado = await Genero.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!generoActualizado) {
            return res.status(404).json({ message: 'Género no encontrado' });
        }

        res.json(generoActualizado);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 4. Eliminación lógica (Eliminar) - Actualiza el estado a 0
router.delete('/:id', async (req, res) => {
    try {
        const generoId = req.params.id;

        // Verificar si el género existe antes de intentar actualizar
        const genero = await Genero.findById(generoId);
        if (!genero) {
            return res.status(404).json({ message: 'Género no encontrado' });
        }

        // Realizar la eliminación lógica
        const generoActualizado = await Genero.findByIdAndUpdate(generoId, { estado: 0 }, { new: true });

        res.json({ message: 'Género eliminado lógicamente', genero: generoActualizado });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 5. Obtener un género por ID
router.get('/:id', async (req, res) => {
    try {
        const genero = await Genero.findById(req.params.id);
        if (!genero) {
            return res.status(404).json({ message: 'Género no encontrado' });
        }
        res.json(genero);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
