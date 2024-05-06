const express = require('express');
const router = express.Router();
const connection = require('./conexion');

router.get('/Maquinaria/', (req, res) => {
    connection.query('SELECT * FROM Maquinaria', (error, results) => {
        if (error) {
            console.error('Error al obtener maquinarias:', error);
            res.status(500).json({ error: 'Error al obtener maquinarias' });
            return;
        }
        res.json(results);
    });
});

router.get('/Maquinaria/:id', (req, res) => {
    const idMaquinaria = req.params.id;
    connection.query('SELECT * FROM Maquinaria WHERE idMaquinaria = ?', idMaquinaria, (error, results) => {
        if (error) {
            console.error('Error al obtener maquinaria:', error);
            res.status(500).json({ error: 'Error al obtener maquinaria' });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ error: 'Maquinaria no encontrada' });
            return;
        }
        res.json(results[0]);
    });
});

router.put('/Maquinaria/:id', (req, res) => {
    const idMaquinaria = req.params.id;
    const { tipo, descripcion } = req.body;
  
    const actualizacionQuery = 'UPDATE Maquinaria SET tipo = ?, descripcion = ? WHERE idMaquinaria = ?';
  
    connection.query(actualizacionQuery, [tipo, descripcion, idMaquinaria], (error, results) => {
        if (error) {
            console.error('Error al actualizar la maquinaria:', error);
            res.status(500).json({ error: 'Error al actualizar la maquinaria' });
            return;
        }
        if (results.affectedRows === 0) {
            res.status(404).json({ error: 'Maquinaria no encontrada' });
            return;
        }
        res.status(200).json({ message: 'Maquinaria actualizada correctamente' });
    });
});

router.delete('/Maquinaria/:id', (req, res) => {
    const idMaquinaria = req.params.id;
  
    connection.query('DELETE FROM Maquinaria WHERE idMaquinaria = ?', idMaquinaria, (error, results) => {
        if (error) {
            console.error('Error al eliminar la maquinaria:', error);
            res.status(500).json({ error: 'Error al eliminar la maquinaria' });
            return;
        }
        if (results.affectedRows === 0) {
            res.status(404).json({ error: 'Maquinaria no encontrada' });
            return;
        }
        res.status(200).json({ message: 'Maquinaria eliminada correctamente' });
    });
});

module.exports = router;
