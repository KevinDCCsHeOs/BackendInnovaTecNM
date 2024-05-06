const express = require('express');
const router = express.Router();
const connection = require('./conexion');

router.get('/administrador-oficina', (req, res) => {
    connection.query('SELECT * FROM AdministradorOficina', (error, results) => {
        if (error) {
            console.error('Error al obtener las relaciones administrador-oficina:', error);
            res.status(500).json({ error: 'Error al obtener las relaciones administrador-oficina' });
            return;
        }
        res.json(results);
    });
});

router.delete('/administrador-oficina/:idAdministrador/:idOficina', (req, res) => {
    const idAdministrador = req.params.idAdministrador;
    const idOficina = req.params.idOficina;

    connection.query('DELETE FROM AdministradorOficina WHERE idAdministrador = ? AND idOficina = ?', [idAdministrador, idOficina], (error, results) => {
        if (error) {
            console.error('Error al eliminar la relación administrador-oficina:', error);
            res.status(500).json({ error: 'Error al eliminar la relación administrador-oficina' });
            return;
        }
        res.json({ message: 'Relación administrador-oficina eliminada correctamente' });
    });
});

module.exports = router;
