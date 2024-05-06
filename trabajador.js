const express = require('express');
const router = express.Router();
const connection = require('./conexion');

router.get('/Trabajador/', (req, res) => {
    connection.query('SELECT * FROM Trabajador', (error, results) => {
        if (error) {
            console.error('Error al obtener trabajadores:', error);
            res.status(500).json({ error: 'Error al obtener trabajadores' });
            return;
        }
        res.json(results);
    });
});

router.get('/Trabajador/:id', (req, res) => {
    const idTrabajador = req.params.id;
    connection.query('SELECT * FROM Trabajador WHERE idTrabajador = ?', idTrabajador, (error, results) => {
        if (error) {
            console.error('Error al obtener trabajador:', error);
            res.status(500).json({ error: 'Error al obtener trabajador' });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ error: 'Trabajador no encontrado' });
            return;
        }
        res.json(results[0]);
    });
});

router.put('/Trabajador/:id', (req, res) => {
    const idTrabajador = req.params.id;
    const { numeroDeCuenta, nombreBanco, codigoPostal, estado, ciudad, calle, numero } = req.body;
  
    const actualizacionQuery = 'UPDATE Trabajador SET numeroDeCuenta = ?, nombreBanco = ?, codigoPostal = ?, estado = ?, ciudad = ?, calle = ?, numero = ? WHERE idTrabajador = ?';
  
    connection.query(actualizacionQuery, [ numeroDeCuenta, nombreBanco, codigoPostal, estado, ciudad, calle, numero, idTrabajador], (error, results) => {
        if (error) {
            console.error('Error al actualizar el trabajador:', error);
            res.status(500).json({ error: 'Error al actualizar el trabajador' });
            return;
        }
        if (results.affectedRows === 0) {
            res.status(404).json({ error: 'Trabajador no encontrado' });
            return;
        }
        res.status(200).json({ message: 'Trabajador actualizado correctamente' });
    });
});

router.delete('/Trabajador/:id', (req, res) => {
    const idTrabajador = req.params.id;
  
    connection.query('DELETE FROM Trabajador WHERE idTrabajador = ?', idTrabajador, (error, results) => {
        if (error) {
            console.error('Error al eliminar el trabajador:', error);
            res.status(500).json({ error: 'Error al eliminar el trabajador' });
            return;
        }
        if (results.affectedRows === 0) {
            res.status(404).json({ error: 'Trabajador no encontrado' });
            return;
        }
        res.status(200).json({ message: 'Trabajador eliminado correctamente' });
    });
});

module.exports = router;
