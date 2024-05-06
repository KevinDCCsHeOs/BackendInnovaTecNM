const express = require('express');
const router = express.Router();
const connection = require('./conexion');

router.get('/auto', (req, res) => {
    connection.query('SELECT * FROM Auto', (error, results) => {
        if (error) {
            console.error('Error al obtener los autos:', error);
            res.status(500).json({ error: 'Error al obtener los autos' });
            return;
        }
        res.json(results);
    });
});

router.get('/auto/:id', (req, res) => {
    const idAuto = req.params.id;

    connection.query('SELECT * FROM Auto WHERE idAuto = ?', idAuto, (error, results) => {
        if (error) {
            console.error('Error al obtener el auto:', error);
            res.status(500).json({ error: 'Error al obtener el auto' });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ error: 'Auto no encontrado' });
            return;
        }
        res.json(results[0]);
    });
});

router.put('/auto/:id', (req, res) => {
    const idAuto = req.params.id;
    const { modelo, marca, placas, color } = req.body;

    connection.query('UPDATE Auto SET modelo = ?, marca = ?, placas = ?, color = ? WHERE idAuto = ?', [modelo, marca, placas, color, idAuto], (error, results) => {
        if (error) {
            console.error('Error al actualizar el auto:', error);
            res.status(500).json({ error: 'Error al actualizar el auto' });
            return;
        }
        res.json({ message: 'Auto actualizado correctamente' });
    });
});

router.delete('/auto/:id', (req, res) => {
    const idAuto = req.params.id;

    connection.query('DELETE FROM Auto WHERE idAuto = ?', idAuto, (error, results) => {
        if (error) {
            console.error('Error al eliminar el auto:', error);
            res.status(500).json({ error: 'Error al eliminar el auto' });
            return;
        }
        res.json({ message: 'Auto eliminado correctamente' });
    });
});

module.exports = router;
