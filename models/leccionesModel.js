const db = require('../config/db');

const Leccion = {
  obtenerTodasLecciones: (callback) => {
   db.query('SELECT * FROM lecciones',callback);
  },

  obtenerLeccionPorId: (id,callback) => {
     db.query('SELECT * FROM lecciones WHERE id = ?', [id],callback);
  },

  crearLeccion: (leccion) => {
     db.query('INSERT INTO lecciones SET ?', leccion);
  },

  actualizarLeccion: (id, leccion) => {
    db.query('UPDATE lecciones SET ? WHERE id = ?', [leccion, id]);
  },

  eliminarLeccion: (id) => {
    db.query('DELETE FROM lecciones WHERE id = ?', [id]);
  }
};

module.exports = Leccion;
