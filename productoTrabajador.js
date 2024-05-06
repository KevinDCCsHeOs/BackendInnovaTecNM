const express = require('express');
const router = express.Router();
const connection = require('./conexion');

router.get('/productostrabajador/:idTrabajador', (req, res) => {
    const idTrabajador = req.params.idTrabajador;
    connection.query('SELECT * FROM ProductoTrabajador WHERE idTrabajador = ?', idTrabajador, (error, results) => {
        if (error) {
            console.error('Error al obtener productos del trabajador:', error);
            res.status(500).json({ error: 'Error al obtener productos del trabajador' });
            return;
        }
        res.json(results);
    });
});

router.put('/productostrabajador/:idProducto/:idTrabajdador', (req, res) => {
    const idProducto = req.params.idProducto;
    const idTrabajador  = req.params.idTrabajdador;
    const { estado } = req.body;
  
    const actualizacionQuery = 'UPDATE ProductoTrabajador SET estado = ? WHERE idProducto = ? AND idTrabajador = ?';
  
    connection.query(actualizacionQuery, [estado, idProducto, idTrabajador], (error, results) => {
        if (error) {
            console.error('Error al actualizar el producto del trabajador:', error);
            res.status(500).json({ error: 'Error al actualizar el producto del trabajador' });
            return;
        }
        if (results.affectedRows === 0) {
            res.status(404).json({ error: 'Producto / Trabajador no encontrado' });
            return;
        }
        res.status(200).json({ message: 'Se ha actualizado el estado del producto del trajador' });
    });
});

router.delete('/productostrabajador/:idProducto/:idTrabajador', (req, res) => {
    const idProducto = req.params.idProducto;
    const idTrabajador = req.params.idTrabajador;
  
    connection.query('DELETE FROM ProductoTrabajador WHERE idProducto = ? AND idTrabajador = ?', [idProducto, idTrabajador], (error, results) => {
        if (error) {
            console.error('Error al eliminar producto del trabajador:', error);
            res.status(500).json({ error: 'Error al eliminar producto del trabajador' });
            return;
        }
        if (results.affectedRows === 0) {
            res.status(404).json({ error: 'No se encontró el producto asociado al trabajador' });
            return;
        }
        res.status(200).json({ message: 'Producto eliminado del trabajador correctamente' });
    });
});

module.exports = router;
