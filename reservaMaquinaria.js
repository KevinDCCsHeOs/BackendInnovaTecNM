const express = require('express');
const router = express.Router();
const connection = require('./conexion');

router.get('/reserva-maquinaria', (req, res) => {
    connection.query('SELECT * FROM ReservaMaquinaria', (error, results) => {
        if (error) {
            console.error('Error al obtener las reservas de maquinaria:', error);
            res.status(500).json({ error: 'Error al obtener las reservas de maquinaria' });
            return;
        }
        res.json(results);
    });
});

module.exports = router;
