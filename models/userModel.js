const db = require('../config/db');
const bcrypt = require('bcryptjs');
const User = {

    getall: ( callback) => {
       
        db.query('SELECT * FROM users', callback);
    },
    create: (usuario, correo, contrasena,id_privilegios, callback) => {
        const hashedPassword = bcrypt.hashSync(contrasena, 10);
        db.query('INSERT INTO users (usuario, correo, contrasena,id_privilegios) VALUES (?, ?, ?, ?)', [usuario, correo, hashedPassword,id_privilegios], callback);
    },

    findByEmail: (correo, callback) => {
        db.query('SELECT * FROM users WHERE correo = ?', [correo], callback);
    },

    findById: (id, callback) => {
        db.query('SELECT * FROM users WHERE id = ?', [id], callback);
    },

    getPrivileges: (id, callback) => {
        db.query('SELECT nombre FROM privilegios WHERE id = ?', [id], callback);
    },

    delete:(id) => {
        db.query('DELETE FROM users WHERE id = ?', [id]);
     }
};

module.exports = User;
