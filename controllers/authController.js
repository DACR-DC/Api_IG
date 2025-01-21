const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const Privilegio = require('../models/privilegioModel');
const db = require('../config/db');

const JWT_SECRET = "secretodelaiglesia";

exports.login = async (req, res) => {
    try {
        const { correo, password } = req.body;

        db.query('SELECT * FROM users WHERE correo = ?', [correo], (err, result) => {
            if (err) return res.status(500).send('Error del servidor');
            if (result.length === 0) return res.status(401).send('Correo o contraseña incorrecta');

            const usuario = result[0];
            const passwordValida = bcrypt.compareSync(password, usuario.contrasena);
            if (!passwordValida) return res.status(401).send('Correo o contraseña incorrecta');

            const token = jwt.sign({ id: usuario.id }, JWT_SECRET, { expiresIn: '1h' });

            db.query(
                'INSERT INTO session_tokens (id_user, token, expires_at) VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 1 HOUR))',
                [usuario.id, token],
                (err) => {
                    if (err) return res.status(500).send('Error al guardar el token');
                    res.json({ token });
                }
            );
        });
    } catch (error) {
        res.status(500).send('Error interno del servidor');
    }
};

exports.logout = (req, res) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) return res.status(401).send('Acceso denegado. No hay token.');

    db.query('DELETE FROM session_tokens WHERE token = ?', [token], (err) => {
        if (err) return res.status(500).send('Error al cerrar sesión');
        res.send('Sesión cerrada exitosamente');
    });
};

exports.me = (req, res) => {
    const userId = req.usuario.id;
    
    db.query('SELECT * FROM users WHERE id = ?', [userId], (err, result) => {
        if (err) return res.status(500).send('Error del servidor');
        
        const usuario = result[0];

        Privilegio.getRole(userId, (err, privilegios) => {
            if (err) return res.status(500).send('Error al obtener privilegios');
            
            res.json({
                usuario,
                privilegios: privilegios.length > 0 ? privilegios[0].rol_user : null
            });
        });
    });
};

exports.verificarToken = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) return res.status(401).send('Acceso denegado. No hay token.');

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).send('Token inválido');

        req.usuario = decoded;
        next();
    });
};
