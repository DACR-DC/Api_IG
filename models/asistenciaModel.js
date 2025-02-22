const db = require('../config/db');

const asistencia = {

  obtener_asistencias: (callback) => {
    db.query('SELECT * FROM asistencias', callback);
  },

  crear_asistencia: (asistencia, callback) => {
    db.query('INSERT INTO asistencia SET ?', asistencia, callback);
  },

  borrar_asistencia: (id) => {
    db.query('DELETE * FROM asistencias WHERE id = ?', [id]);
  },

  obtener_asistencia_ID: (id) => {
    db.query('SELECT * FROM asistencias WHERE id = ?', [id]);
  },

  actualizar_asistencia: (id, asistencia) => {
    db.query('UPDATE asistencias SET ? WHERE id = ?', [asistencia, id]);
  },


}

module.exports = asistencia
