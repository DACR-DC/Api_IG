const User = require('../models/userModel');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

exports.create = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { usuario, correo, contrasena} = req.body;

    User.create(usuario, correo, contrasena,  (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(201).json({ id: result.insertId, usuario, correo });
    });
};

exports.obtenerUsuarios = (req, res) => {
    User.getall((err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(result);
    });
};

exports.getUserById = (req, res) => {
    const id = req.params.id;

    User.findById(id, (err, result) => {
        if (err) return res.status(500).json({ message: 'Error al obtener el usuario' });
        if (!result) return res.status(404).json({ message: 'Usuario no encontrado' });
        res.json(result);
    });
};

exports.updateUser = (req, res) => {
    const id = req.params.id;
    const { usuario, correo, contrasena } = req.body;

    if (!usuario || !correo || !contrasena) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    const hashedcontrasena = bcrypt.hashSync(contrasena, 10);

    User.update(id, usuario, correo, hashedcontrasena, (err) => {
        if (err) return res.status(500).json({ message: 'Error al actualizar el usuario' });
        res.json({ message: 'Usuario actualizado con éxito' });
    });
};

exports.deleteUser = (req, res) => {
    const id = req.params.id;

    User.delete(id, (err) => {
        if (err) return res.status(500).json({ message: 'Error al eliminar el usuario' });
        res.json({ message: 'Usuario eliminado con éxito' });
    });
};
