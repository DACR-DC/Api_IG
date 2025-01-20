const db = require('../config/db');

const Privilegio = {
    create: (id_user, rol_user, callback) => {
        db.query('INSERT INTO privilegios (id_user, rol_user) VALUES (?, ?)', [id_user, rol_user], callback);
    },

    getRole: (id_user, callback) => {
        db.query('SELECT rol_user FROM privilegios WHERE id_user = ?', [id_user], callback);
    }
};

module.exports = Privilegio;
