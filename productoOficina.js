const express = require('express');
const router = express.Router();
const connection = require('./conexion');

router.get('/producto-oficina', (req, res) => {
    connection.query('SELECT * FROM ProductoOficina', (error, results) => {
        if (error) {
            console.error('Error al obtener las relaciones entre producto y oficina:', error);
            res.status(500).json({ error: 'Error al obtener las relaciones entre producto y oficina' });
            return;
        }
        res.json(results);
    });
});

router.get('/producto-oficina/producto/:id', (req, res) => {
    const idProducto = req.params.id;
    connection.query('SELECT * FROM ProductoOficina WHERE idProducto = ?', idProducto, (error, results) => {
        if (error) {
            console.error('Error al obtener las relaciones entre producto y oficina por el ID del producto:', error);
            res.status(500).json({ error: 'Error al obtener las relaciones entre producto y oficina por el ID del producto' });
            return;
        }
        res.json(results);
    });
});

router.get('/producto-oficina/oficina/:id', (req, res) => {
    const idOficina = req.params.id;
    connection.query('SELECT * FROM ProductoOficina WHERE idOficina = ?', idOficina, (error, results) => {
        if (error) {
            console.error('Error al obtener las relaciones entre producto y oficina por el ID de la oficina:', error);
            res.status(500).json({ error: 'Error al obtener las relaciones entre producto y oficina por el ID de la oficina' });
            return;
        }
        res.json(results);
    });
});

router.put('/producto-oficina/:idProducto/:idOficina', (req, res) => {
    const idProducto = req.params.idProducto;
    const idOficina = req.params.idOficina;
    const estado = req.body;
  
    const actualizacionQuery = 'UPDATE ProductoOficina SET estado = ? WHERE idProducto = ? AND idOficina = ?';
  
    connection.query(actualizacionQuery, [estado, idProducto, idOficina], (error, results) => {
        if (error) {
            console.error('Error al actualizar el producto de una oficina:', error);
            res.status(500).json({ error: 'Error al actualizar el producto de una oficina' });
            return;
        }
        if (results.affectedRows === 0) {
            res.status(404).json({ error: 'Producto / Oficina no encontrado' });
            return;
        }
        res.status(200).json({ message: 'Se ha actualizado el estado del producto de una oficina' });
    });
});

router.delete('/producto-oficina/:idProducto/:idOficina', (req, res) => {
    const idProducto = req.params.idProducto;
    const idOficina = req.params.idOficina;
  
    connection.query('DELETE FROM ProductoOficina WHERE idProducto = ? AND idOficina = ?', [idProducto, idOficina], (error, results) => {
        if (error) {
            console.error('Error al eliminar la relación entre producto y oficina:', error);
            res.status(500).json({ error: 'Error al eliminar la relación entre producto y oficina' });
            return;
        }
        if (results.affectedRows === 0) {
            res.status(404).json({ error: 'No se encontró la relación para eliminar' });
            return;
        }
        res.status(200).json({ message: 'Relación entre producto y oficina eliminada correctamente' });
    });
});

module.exports = router;
