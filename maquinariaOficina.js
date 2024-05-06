const express = require('express');
const router = express.Router();
const connection = require('./conexion');

router.get('/maquinaria-oficina', (req, res) => {
    connection.query('SELECT * FROM MaquinariaOficina', (error, results) => {
        if (error) {
            console.error('Error al obtener las relaciones entre maquinaria y oficina:', error);
            res.status(500).json({ error: 'Error al obtener las relaciones entre maquinaria y oficina' });
            return;
        }
        res.json(results);
    });
});

router.get('/maquinaria-oficina/maquinaria/:id', (req, res) => {
    const idMaquinaria = req.params.id;
    connection.query('SELECT * FROM MaquinariaOficina WHERE idMaquinaria = ?', idMaquinaria, (error, results) => {
        if (error) {
            console.error('Error al obtener las relaciones entre maquinaria y oficina por el ID de la maquinaria:', error);
            res.status(500).json({ error: 'Error al obtener las relaciones entre maquinaria y oficina por el ID de la maquinaria' });
            return;
        }
        res.json(results);
    });
});

router.get('/maquinaria-oficina/oficina/:id', (req, res) => {
    const idOficina = req.params.id;
    connection.query('SELECT * FROM MaquinariaOficina WHERE idOficina = ?', idOficina, (error, results) => {
        if (error) {
            console.error('Error al obtener las relaciones entre maquinaria y oficina por el ID de la oficina:', error);
            res.status(500).json({ error: 'Error al obtener las relaciones entre maquinaria y oficina por el ID de la oficina' });
            return;
        }
        res.json(results);
    });
});

router.put('/maquinariaoficina/:idMaqinaria/:idOficina', (req, res) => {
    const idMaqinaria = req.params.idMaqinaria;
    const idOficina = req.params.idOficina;
    const { estado } = req.body;
  
    const actualizacionQuery = 'UPDATE MaquinariaOficina SET estado = ? WHERE idMaquinaria = ? AND idOficina = ?';
  
    connection.query(actualizacionQuery, [estado, idMaqinaria, idOficina], (error, results) => {
        if (error) {
            console.error('Error al actualizar la maquinaria de una oficina:', error);
            res.status(500).json({ error: 'Error al actualizar la maquinaria de una oficina' });
            return;
        }
        if (results.affectedRows === 0) {
            res.status(404).json({ error: 'Maquinaria / Oficina no encontrada' });
            return;
        }
        res.status(200).json({ message: 'Se ha actualizado el estado de la maquinaria de una oficina' });
    });
});

router.delete('/maquinaria-oficina/:idMaquinaria/:idOficina', (req, res) => {
    const idMaquinaria = req.params.idMaquinaria;
    const idOficina = req.params.idOficina;
  
    connection.query('DELETE FROM MaquinariaOficina WHERE idMaquinaria = ? AND idOficina = ?', [idMaquinaria, idOficina], (error, results) => {
        if (error) {
            console.error('Error al eliminar la relación entre maquinaria y oficina:', error);
            res.status(500).json({ error: 'Error al eliminar la relación entre maquinaria y oficina' });
            return;
        }
        if (results.affectedRows === 0) {
            res.status(404).json({ error: 'No se encontró la relación para eliminar' });
            return;
        }
        res.status(200).json({ message: 'Relación entre maquinaria y oficina eliminada correctamente' });
    });
});

module.exports = router;