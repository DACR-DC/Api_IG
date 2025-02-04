const Priv = require('../models/privilegioModel');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

exports.create = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { nombre } = req.body;

    try {
        Priv.create(nombre, (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Error al crear el privilegio', error: err });
            }
            res.status(201).json({ id: result.insertId, nombre});
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al procesar el privilegio', error });
    }
};

exports.obtenerPrivilegios = (req, res) => {
    Priv.getall((err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error al obtener los privilegios', error: err });
        }
        res.json(result);
    });
};

exports.obtenerPrivporId = (req, res) => {
    const id = req.params.id;

    Priv.getPrivbyID(id, (err, result) => {
        if (err) return res.status(500).json({ message: 'Error al obtener el privilegio', error: err });
        if (!result) return res.status(404).json({ message: 'privilegio no encontrado' });
        res.json(result);
    });
};

exports.deletePriv = (req, res) => {
    const id = req.params.id;

    Priv.delete(id, (err) => {
        if (err) return res.status(500).json({ message: 'Error al eliminar el privilegio', error: err });
        res.json({ message: 'Privilegio eliminado con éxito' });
    });
};

