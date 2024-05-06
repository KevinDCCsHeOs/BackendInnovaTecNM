const express = require('express');
const router = express.Router();
const connection = require('./conexion');

router.get('/administradores', (req, res) => {
    connection.query('SELECT * FROM Administradores', (error, results) => {
        if (error) {
            console.error('Error al obtener administradores:', error);
            res.status(500).json({ error: 'Error al obtener administradores' });
            return;
        }
        res.json(results);
    });
});

router.get('/administradores/:id', (req, res) => {
    const idAdministrador = req.params.id;
    connection.query('SELECT * FROM Administradores WHERE idAdministrador = ?', idAdministrador, (error, results) => {
        if (error) {
            console.error('Error al obtener administrador por ID:', error);
            res.status(500).json({ error: 'Error al obtener administrador por ID' });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ error: 'Administrador no encontrado' });
            return;
        }
        res.json(results[0]);
    });
});

router.post('/administradores/login', (req, res) => {
    const { nombreDeUsuarioAd, contraseña } = req.body;
    connection.query('SELECT * FROM Administradores WHERE nombreDeUsuarioAd = ? AND contraseña = ?', [nombreDeUsuarioAd, contraseña], (error, results) => {
        if (error) {
            console.error('Error al buscar administrador por usuario y contraseña:', error);
            res.status(500).json({ error: 'Error al buscar administrador por usuario y contraseña' });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ error: 'Administrador no encontrado' });
            return;
        }
        res.json(results[0]);
    });
});

router.get('/administradores/correo/:correoElectronico', (req, res) => {
    const correoElectronico = req.params.correoElectronico;
    connection.query('SELECT * FROM Administradores WHERE correoElectronico = ?', correoElectronico, (error, results) => {
        if (error) {
            console.error('Error al obtener administrador por correo electrónico:', error);
            res.status(500).json({ error: 'Error al obtener administrador por correo electrónico' });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ error: 'Administrador no encontrado' });
            return;
        }
        res.json(results[0]);
    });
});

router.put('/administradores/:id', (req, res) => {
    const idAdministrador = req.params.id;
    const {nombreDeUsuarioAd, telefono, contraseña, estadodeLaCuenta} = req.body;

    connection.query('UPDATE Administradores SET nombreDeUsuarioAd = ?, telefono = ?, contraseña = ?, estadodeLaCuenta = ? WHERE idAdministrador = ?', 
                        [nombreDeUsuarioAd, telefono, contraseña, estadodeLaCuenta, idAdministrador], (error, results) => {
        if (error) {
            console.error('Error al actualizar administrador:', error);
            res.status(500).json({ error: 'Error al actualizar administrador' });
            return;
        }
        res.json({ message: 'Administrador actualizado correctamente' });
    });
});

module.exports = router;
