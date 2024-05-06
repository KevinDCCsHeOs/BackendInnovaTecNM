const express = require('express');
const router = express.Router();
const connection = require('./conexion');

//Metodos para buscar, actualizar y eliminar usuarios, el metodo para agregar un usuario esta en el achivo servicios.js

router.get('/usuario', (req, res) => {
    connection.query('SELECT * FROM Usuario;', (error, results) => {
        if (error) {
            console.error('Error al obtener usuarios:', error);
            res.status(500).json({ error: 'Error al obtener usuarios' });
            return;
        }
        res.json(results);
    });
});

router.get('/usuario/:correoElectronico', (req, res) => {
    const correoElectronico = req.params.correoElectronico;
    connection.query('SELECT * FROM Usuario WHERE correoElectronico = ?', correoElectronico, (error, results) => {
    if (error) {
        console.error('Error al obtener usuario:', error);
        res.status(500).json({ error: 'Error al obtener usuario' });
        return;
    }
    if (results.length === 0) {
        res.status(404).json({ error: 'Usuario no encontrado' });
        return;
    }
    res.json(results[0]);
    });
});

router.post('/usuario/login', (req, res) => {
    const { correoElectronico, contraseña } = req.body;

    if (!correoElectronico || !contraseña) {
        return res.status(400).json({ error: 'El correo electrónico y la contraseña son requeridos' });
    }

    connection.query('SELECT * FROM Usuario WHERE correoElectronico = ? AND contraseña = ?', [correoElectronico, contraseña], (error, results) => {
        if (error) {
            console.error('Error al buscar usuario:', error);
            res.status(500).json({ error: 'Error al buscar usuario' });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ error: 'Usuario no encontrado' });
            return;
        }
        res.json(results[0]);
    });
});

router.put('/usuario/:correoElectronico', (req, res) => {
    const correoElectronico = req.params.correoElectronico;
    const nuevosDatosUsuario = req.body;

    if (!correoElectronico) {
        return res.status(400).json({ error: 'Se requiere proporcionar el correo electrónico del usuario' });
    }

    connection.query('UPDATE Usuario SET ? WHERE correoElectronico = ?', [nuevosDatosUsuario, correoElectronico], (error, results) => {
        if (error) {
            console.error('Error al actualizar usuario:', error);
            res.status(500).json({ error: 'Error al actualizar usuario' });
            return;
        }
        res.json({ message: 'Usuario actualizado correctamente' });
    });
});

router.delete('/usuario/:correoElectronico', (req, res) => {
    const correoElectronico = req.params.correoElectronico;

    if (!correoElectronico) {
        return res.status(400).json({ error: 'Se requiere proporcionar el correo electrónico del usuario' });
    }

    connection.query('DELETE FROM Usuario WHERE correoElectronico = ?', correoElectronico, (error, results) => {
        if (error) {
            console.error('Error al eliminar cuenta de usuario:', error);
            res.status(500).json({ error: 'Error al eliminar cuenta de usuario' });
            return;
        }
        res.json({ message: 'Cuenta de usuario eliminada correctamente' });
    });
});

module.exports = router;
