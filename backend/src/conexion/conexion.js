const { Pool } = require('pg');

const pool = new Pool({
    user: 'pharmauser',
    host: 'dpg-counbgvsc6pc73anii20-a.oregon-postgres.render.com',
    password: 'K8U4wWiBUMWl1YhRJJ1OLG4CRDHucTjy',
    database: 'pharmadb_lbjg',
    port: '5432',
    ssl: {
        rejectUnauthorized: false // Aquí deshabilitamos la verificación del certificado para simplificar, pero en producción deberías configurarla adecuadamente
    }
});

module.exports = pool;