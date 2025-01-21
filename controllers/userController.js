const User = require('../models/userModel');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');


exports.create = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { usuario, correo, contrasena } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(contrasena, 10);
        User.create(usuario, correo, hashedPassword, (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Error al crear el usuario', error: err });
            }
            res.status(201).json({ id: result.insertId, usuario, correo });
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al procesar la contraseña', error });
    }
};

exports.obtenerUsuarios = (req, res) => {
    User.getall((err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error al obtener los usuarios', error: err });
        }
        res.json(result);
    });
};

exports.getUserById = (req, res) => {
    const id = req.params.id;

    User.findById(id, (err, result) => {
        if (err) return res.status(500).json({ message: 'Error al obtener el usuario', error: err });
        if (!result) return res.status(404).json({ message: 'Usuario no encontrado' });
        res.json(result);
    });
};

exports.updateUser = async (req, res) => {
    const id = req.params.id;
    const { usuario, correo, contrasena } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const hashedPassword = await bcrypt.hash(contrasena, 10);
        User.update(id, usuario, correo, hashedPassword, (err) => {
            if (err) return res.status(500).json({ message: 'Error al actualizar el usuario', error: err });
            res.json({ message: 'Usuario actualizado con éxito' });
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al procesar la contraseña', error });
    }
};

exports.deleteUser = (req, res) => {
    const id = req.params.id;

    User.delete(id, (err) => {
        if (err) return res.status(500).json({ message: 'Error al eliminar el usuario', error: err });
        res.json({ message: 'Usuario eliminado con éxito' });
    });
};
