const db = require('../config/db');

const Clase = {
  obtenerTodasclases: (callback) => {
     db.query('SELECT * FROM clase',callback);
  },

  obtenerclasePorId: (id,callback) => {
  db.query('SELECT * FROM clase WHERE id = ?', [id],callback);
  },

  crearclase: (clase) => {
     db.query('INSERT INTO clase SET ?', clase);
  },

  actualizarclase: (id, clase) => {
   db.query('UPDATE clase SET ? WHERE id = ?', [clase, id]);
  },

  eliminarclase: (id) => {
     db.query('DELETE FROM clase WHERE id = ?', [id]);
  }
};

module.exports = Clase;
