const db = require('../config/db');

const User = {

    getall: ( callback) => {
        db.query('SELECT * FROM users', callback);
    },
    create: (usuario, correo, contrasena, callback) => {
        db.query('INSERT INTO users (usuario, correo, contrasena) VALUES (?, ?, ?)', [usuario, correo, contrasena], callback);
    },

    findByEmail: (correo, callback) => {
        db.query('SELECT * FROM users WHERE correo = ?', [correo], callback);
    },

    findById: (id, callback) => {
        db.query('SELECT * FROM users WHERE id = ?', [id], callback);
    },

    getPrivileges: (id, callback) => {
        db.query('SELECT rol_user FROM privilegios WHERE id_user = ?', [id], callback);
    }
};

module.exports = User;
