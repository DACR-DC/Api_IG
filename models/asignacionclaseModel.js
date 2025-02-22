const db = require('../config/db');

const asignacion_clase = {

  obtener_asignacion_clase: (callback) => {
    db.query('select * from vw_asignaciones_clase', callback);
  },

  obtener_asignacion_clase_usuario: (id, callback) => {
    db.query('select * from vw_asignaciones_clase where id_usuario = ?', [id], callback);
  },

  crear_asignacion_clase: (asignacion_clase, callback) => {
    db.query('INSERT INTO asignacion_clase SET ?', [asignacion_clase], callback);
  },

  borrar_asignacion_clase: (id, callback) => {
    db.query('DELETE FROM asignacion_clase WHERE id = ?', [id], callback);
  },

  obtener_asignacion_clase_ID: (id, callback) => {
    db.query('CALL obtener_asignaciones_clases(?)', [id], callback);
  },

  actualizar_asignacion_clase: (id, asignacion_clase) => {
    db.query('UPDATE asignacion_clase SET ? WHERE id = ?', [asignacion_clase, id]);
  },
}

module.exports = asignacion_clase
