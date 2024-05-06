const express = require('express');
const router = express.Router();
const connection = require('./conexion');

router.get('/Productos/', (req, res) => {
    connection.query('SELECT * FROM Productos', (error, results) => {
        if (error) {
            console.error('Error al obtener productos:', error);
            res.status(500).json({ error: 'Error al obtener productos' });
            return;
        }
        res.json(results);
    });
});

router.get('/Productos/:id', (req, res) => {
    const idProducto = req.params.id;
    connection.query('SELECT * FROM Productos WHERE idProducto = ?', idProducto, (error, results) => {
        if (error) {
            console.error('Error al obtener producto:', error);
            res.status(500).json({ error: 'Error al obtener producto' });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ error: 'Producto no encontrado' });
            return;
        }
        res.json(results[0]);
    });
});

router.put('/Productos/:id', (req, res) => {
    const idProducto = req.params.id;
    const { nombre, descripcion } = req.body;
  
    const actualizacionQuery = 'UPDATE Productos SET nombre = ?, descripcion = ? WHERE idProducto = ?';
  
    connection.query(actualizacionQuery, [nombre, descripcion, idProducto], (error, results) => {
        if (error) {
            console.error('Error al actualizar el producto:', error);
            res.status(500).json({ error: 'Error al actualizar el producto' });
            return;
        }
        if (results.affectedRows === 0) {
            res.status(404).json({ error: 'Producto no encontrado' });
            return;
        }
        res.status(200).json({ message: 'Producto actualizado correctamente' });
    });
});

router.delete('/Productos/:id', (req, res) => {
    const idProducto = req.params.id;
  
    connection.query('DELETE FROM Productos WHERE idProducto = ?', idProducto, (error, results) => {
        if (error) {
            console.error('Error al eliminar el producto:', error);
            res.status(500).json({ error: 'Error al eliminar el producto' });
            return;
        }
        if (results.affectedRows === 0) {
            res.status(404).json({ error: 'Producto no encontrado' });
            return;
        }
        res.status(200).json({ message: 'Producto eliminado correctamente' });
    });
});

module.exports = router;
