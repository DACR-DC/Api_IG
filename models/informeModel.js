const db = require('../config/db');

const informe = {
    obtener_informes: (callback) => {
        db.query('SELECT * FROM informe', callback);
    },

    crear_informe: (informe) => {
        db.query('INSERT INTO informe SET ?', informe);
    },

    borrar_informe: (id, callback) => {
        db.query('DELETE FROM informe WHERE id = ?', [id], callback);
    },

    obtener_informe_ID: (id, callback) => {
        db.query('SELECT * FROM informe WHERE id = ?', [id], callback);
    },

    actualizar_informe: (id, informe, callback) => {
        db.query('UPDATE informe SET ? WHERE id = ?', [informe, id], callback);
    }
};

module.exports = informe;
