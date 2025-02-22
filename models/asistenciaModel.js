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

  obtener_asistencia_por_clase: (id_clase, callback) => {
    const query = 'SELECT * FROM asistencia WHERE id_clase = ? and status=1';
    db.query(query, [id_clase], callback);
  },

  actualizar_estado: (id_clase, callback) => {
    const query = 'UPDATE asistencia SET status=0 WHERE id_clase = ?';
    db.query(query, [id_clase], callback);
  },


  // ===================== ESTUDIANTE =====================
  crear_asistencia_estudiante: (asistencia, callback) => {
    db.query('INSERT INTO asistencia_estudiante SET ?', [asistencia], callback);
  },

  get_asistencias: (id_asistencia, callback) => {
    db.query('SELECT * FROM asistencia_estudiante where id_asistencia=?', [id_asistencia], callback);
  },
  actualizar_asistencia_estudiante: (id, status, callback) => {
    const query = 'UPDATE asistencia_estudiante SET status = ? WHERE id = ?';
    db.query(query, [status, id], callback);
  },
}

module.exports = asistencia
