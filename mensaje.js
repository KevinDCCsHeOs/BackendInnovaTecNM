const express = require('express');
const router = express.Router();
const connection = require('./conexion');

router.get('/Mensaje/', (req, res) => {
    connection.query('SELECT * FROM Mensaje', (error, results) => {
        if (error) {
            console.error('Error al obtener mensajes:', error);
            res.status(500).json({ error: 'Error al obtener mensajes' });
            return;
        }
        res.json(results);
    });
});

router.get('/Mensaje/:id', (req, res) => {
    const idMensaje = req.params.id;
    connection.query('SELECT * FROM Mensaje WHERE idMensaje = ?', idMensaje, (error, results) => {
        if (error) {
            console.error('Error al obtener mensaje:', error);
            res.status(500).json({ error: 'Error al obtener mensaje' });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ error: 'Mensaje no encontrado' });
            return;
        }
        res.json(results[0]);
    });
});

router.delete('/Mensaje/:id', (req, res) => {
    const idMensaje = req.params.id;
  
    connection.query('DELETE FROM Mensaje WHERE idMensaje = ?', idMensaje, (error, results) => {
        if (error) {
            console.error('Error al eliminar el mensaje:', error);
            res.status(500).json({ error: 'Error al eliminar el mensaje' });
            return;
        }
        if (results.affectedRows === 0) {
            res.status(404).json({ error: 'Mensaje no encontrado' });
            return;
        }
        res.status(200).json({ message: 'Mensaje eliminado correctamente' });
    });
});

module.exports = router;
