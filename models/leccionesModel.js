const db = require('../config/db');

const Leccion = {
  obtenerTodasLecciones: () => {
    return db.query('SELECT * FROM lecciones');
  },

  obtenerLeccionPorId: (id) => {
    return db.query('SELECT * FROM lecciones WHERE id = ?', [id]);
  },

  crearLeccion: (leccion) => {
    return db.query('INSERT INTO lecciones SET ?', leccion);
  },

  actualizarLeccion: (id, leccion) => {
    return db.query('UPDATE lecciones SET ? WHERE id = ?', [leccion, id]);
  },

  eliminarLeccion: (id) => {
    return db.query('DELETE FROM lecciones WHERE id = ?', [id]);
  }
};

module.exports = Leccion;
