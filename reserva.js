const express = require('express');
const router = express.Router();
const connection = require('./conexion');

router.get('/reserva', (req, res) => {
    connection.query('SELECT * FROM Reserva', (error, results) => {
        if (error) {
            console.error('Error al obtener las reservas:', error);
            res.status(500).json({ error: 'Error al obtener las reservas' });
            return;
        }
        res.json(results);
    });
});

router.get('/reserva/:id', (req, res) => {
    const idReserva = req.params.id;

    connection.query('SELECT * FROM Reserva WHERE idReserva = ?', idReserva, (error, results) => {
        if (error) {
            console.error('Error al obtener la reserva:', error);
            res.status(500).json({ error: 'Error al obtener la reserva' });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ error: 'Reserva no encontrada' });
            return;
        }
        res.json(results[0]);
    });
});

router.put('/reserva/:id', (req, res) => {
    const idReserva = req.params.id;
    const estadoDeLaReserva = req.body;

    connection.query('UPDATE Reserva SET estadoDeLaReserva = ? WHERE idReserva = ?', [estadoDeLaReserva, idReserva], (error, results) => {
        if (error) {
            console.error('Error al actualizar la reserva:', error);
            res.status(500).json({ error: 'Error al actualizar la reserva' });
            return;
        }
        res.json({ message: 'Reserva actualizada correctamente' });
    });
});

module.exports = router;
