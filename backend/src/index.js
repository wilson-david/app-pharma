const express = require('express');
const userRoutes = require('./router/user.routes');

const app = express();
const PORT = 3000;

// Configurar middleware
app.use(express.json());

// Configurar rutas
app.use('/user', userRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor Express iniciado en http://localhost:${PORT}`);
});

