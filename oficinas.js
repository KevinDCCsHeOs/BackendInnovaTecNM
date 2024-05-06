const express = require('express');
const router = express.Router();
const connection = require('./conexion');

router.get('/oficinas', (req, res) => {
    connection.query('SELECT * FROM Oficinas', (error, results) => {
        if (error) {
            console.error('Error al obtener las oficinas:', error);
            res.status(500).json({ error: 'Error al obtener las oficinas' });
            return;
        }
        res.json(results);
    });
});

router.get('/oficinas/:id', (req, res) => {
    const idOficina = req.params.id;
    connection.query('SELECT * FROM Oficinas WHERE idOficina = ?', idOficina, (error, results) => {
        if (error) {
            console.error('Error al obtener la oficina:', error);
            res.status(500).json({ error: 'Error al obtener la oficina' });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ error: 'Oficina no encontrada' });
            return;
        }
        res.json(results[0]);
    });
});

router.post('/oficinas', (req, res) => {
    const { nombre, codigoPostal, ciudad, colonia, calle, telefono } = req.body;
  
    const insertQuery = 'INSERT INTO Oficinas (nombre, codigoPostal, ciudad, colonia, calle, telefono) VALUES (?, ?, ?, ?, ?, ?)';
  
    connection.query(insertQuery, [nombre, codigoPostal, ciudad, colonia, calle, telefono], (error, results) => {
        if (error) {
            console.error('Error al agregar la oficina:', error);
            res.status(500).json({ error: 'Error al agregar la oficina' });
            return;
        }
        res.status(201).json({ id: results.insertId, message: 'Oficina agregada correctamente' });
    });
});

router.put('/oficinas/:id', (req, res) => {
    const idOficina = req.params.id;
    const telefono = req.body;
  
    const actualizacionQuery = 'UPDATE Oficinas SET telefono = ? WHERE idOficina = ?';
  
    connection.query(actualizacionQuery, [telefono, idOficina], (error, results) => {
        if (error) {
            console.error('Error al actualizar la oficina:', error);
            res.status(500).json({ error: 'Error al actualizar la oficina' });
            return;
        }
        if (results.affectedRows === 0) {
            res.status(404).json({ error: 'No se encontró la oficina para actualizar' });
            return;
        }
        res.status(200).json({ message: 'Oficina actualizada correctamente' });
    });
});

router.delete('/oficinas/:id', (req, res) => {
    const idOficina = req.params.id;
  
    connection.query('DELETE FROM Oficinas WHERE idOficina = ?', idOficina, (error, results) => {
        if (error) {
            console.error('Error al eliminar la oficina:', error);
            res.status(500).json({ error: 'Error al eliminar la oficina' });
            return;
        }
        if (results.affectedRows === 0) {
            res.status(404).json({ error: 'No se encontró la oficina para eliminar' });
            return;
        }
        res.status(200).json({ message: 'Oficina eliminada correctamente' });
    });
});

module.exports = router;
