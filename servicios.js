const express = require('express');
const router = express.Router();
const connection = require('./conexion');

// De igual manera que el archivo de usuarios

router.get('/Servicios/', (req, res) => {
    connection.query('SELECT * FROM Servicio', (error, results) => {
        if (error) {
            console.error('Error al obtener servicios:', error);
            res.status(500).json({ error: 'Error al obtener servicios' });
            return;
        }
        res.json(results);
    });
});

router.get('/Servicios/:tipoDeServicio', (req, res) => {
    const tipoDeServicio = req.params.tipoDeServicio;
    connection.query('SELECT * FROM Servicio WHERE tipoDeServicio = ?', tipoDeServicio, (error, results) => {
        if (error) {
            console.error('Error al obtener servicio:', error);
            res.status(500).json({ error: 'Error al obtener servicio' });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ error: 'Servicio no encontrado' });
            return;
        }
        res.json(results[0]);
    });
});

router.put('/Servicios/:tipoDeServicio', (req, res) => {
    const tipoDeServicio = req.params.tipoDeServicio;
    const nuevosDatosServicio = req.body;

    if (!tipoDeServicio) {
        return res.status(400).json({ error: 'Se requiere proporcionar el tipo de servicio' });
    }

    connection.query('UPDATE Servicio SET ? WHERE tipoDeServicio = ?', [nuevosDatosServicio, tipoDeServicio], (error, results) => {
        if (error) {
            console.error('Error al actualizar servicio:', error);
            res.status(500).json({ error: 'Error al actualizar servicio' });
            return;
        }
        res.json({ message: 'Servicio actualizado correctamente' });
    });
});

router.delete('/Servicios/:tipoDeServicio', (req, res) => {
    const tipoDeServicio = req.params.tipoDeServicio;

    if (!tipoDeServicio) {
        return res.status(400).json({ error: 'Se requiere proporcionar el tipo de servicio' });
    }

    connection.query('DELETE FROM Servicio WHERE tipoDeServicio = ?', tipoDeServicio, (error, results) => {
        if (error) {
            console.error('Error al eliminar servicio:', error);
            res.status(500).json({ error: 'Error al eliminar servicio' });
            return;
        }
        res.json({ message: 'Servicio eliminado correctamente' });
    });
});

module.exports = router;