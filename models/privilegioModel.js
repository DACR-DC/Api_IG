const db = require('../config/db');

const Privilegio = {
    create: (id, nombre, callback) => {
        db.query('INSERT INTO privilegios (id, nombre) VALUES (?, ?)', [id, nombre], callback);
    },

    getPrivbyID: (id, callback) => {
        db.query('SELECT  nombre FROM privilegios WHERE id = ?', [id], callback);
    },
    getall: ( callback) => {
       
        db.query('SELECT * FROM privilegios', callback);
    },
    delete:(id) => {
        db.query('DELETE FROM privilegios WHERE id = ?', [id]);
     }
};

module.exports = Privilegio;
