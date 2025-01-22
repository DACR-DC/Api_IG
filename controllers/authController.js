const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

const JWT_SECRET = "secretodelaiglesia";

exports.login = async (req, res) => {
    const { usuario, contrasena } = req.body;

    if (!usuario || !contrasena) {
        return res.status(400).send('Usuario, correo y contraseña son requeridos');
    }
    try {
        const [result] = await db.promise().query(
            'SELECT * FROM users WHERE usuario = ? ',
            [usuario, correo]
        );

        console.log("Resultado de la consulta:", result);

        if (result.length === 0) {
            return res.status(401).send('Usuario, correo o contraseña incorrecta');
        }

        const usuarioDB = result[0];

        console.log("Contraseña encriptada en DB:", usuarioDB.contrasena);
        console.log("Contraseña ingresada:", contrasena); 
        const passwordValida = bcrypt.compare(contrasena.trim(), usuarioDB.contrasena);
        console.log("Hash almacenado:", usuarioDB.contrasena);
        console.log("Contraseña válida:", passwordValida);  

        if (!passwordValida) {
            return res.status(401).send('Usuario, correo o contraseña incorrecta');
        }

        const token = jwt.sign({ id: usuarioDB.id }, JWT_SECRET, { expiresIn: '1h' });

        await db.promise().query(
            'INSERT INTO token_sesion (id_user, token, expires_at) VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 1 HOUR))',
            [usuarioDB.id, token]
        );

        res.json({ token, usuarioDB });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error interno del servidor');
    }
};

exports.logout = async (req, res) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) return res.status(401).send('Acceso denegado. No hay token.');

    try {
        await db.promise().query('DELETE FROM token_sesion WHERE token = ?', [token]);
        res.send('Sesión cerrada exitosamente');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al cerrar sesión');
    }
};

exports.me = async (req, res) => {
    const userId = req.usuario.id;

    try {
        const [result] = await db.promise().query('SELECT * FROM users WHERE id = ?', [userId]);

        if (result.length === 0) return res.status(404).send('Usuario no encontrado');

        const usuario = result[0];

        const [privilegios] = await db.promise().query('SELECT rol_user FROM privilegios WHERE id_user = ?', [userId]);

        res.json({
            usuario,
            privilegios: privilegios.length > 0 ? privilegios[0].rol_user : null
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error del servidor');
    }
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
