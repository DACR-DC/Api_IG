const db = require('../config/db');

const Leccion = {
  obtenerTodasLecciones: () => {
   db.query('SELECT * FROM lecciones');
  },

  obtenerLeccionPorId: (id) => {
     db.query('SELECT * FROM lecciones WHERE id = ?', [id]);
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
