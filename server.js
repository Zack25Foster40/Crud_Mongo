const express = require('express');
const mongoose = require('mongoose');

// Inicializar la app (debe ir antes de app.use)
const app = express();

// Usar express.json() para procesar datos en formato JSON
app.use(express.json());

// Conexión a MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/bdm', {

})
.then(() => console.log('Conectado a MongoDB'))
.catch(err => console.error('Error al conectar a MongoDB', err));

// Importar rutas
const cantanteRoutes = require('./routes/cantantes');
const cancionRoutes = require('./routes/canciones');
const generoRoutes = require('./routes/generos');

// Registrar rutas
app.use('/api/cantantes', cantanteRoutes);
app.use('/api/canciones', cancionRoutes);
app.use('/api/generos', generoRoutes);

// Ruta base
app.get('/', (req, res) => {
    res.send('API de Canciones');
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;  // Usar el puerto desde variables de entorno si está disponible
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
