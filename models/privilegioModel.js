const db = require('../config/db');

const Privilegio = {
    create: (id, nombre, callback) => {
        db.query('INSERT INTO privilegios (id, nombre) VALUES (?, ?)', [id, nombre], callback);
    },

    getRole: (id, callback) => {
        db.query('SELECT  nombre FROM privilegios WHERE id = ?', [id], callback);
    }
};

module.exports = Privilegio;
