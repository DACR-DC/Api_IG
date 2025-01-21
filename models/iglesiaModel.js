const db = require('../config/db');

const Iglesia = {
  obtenerTodasIglesias: () => {
     db.query('SELECT * FROM iglesias');
  },

  obtenerIglesiaPorId: (id) => {
  db.query('SELECT * FROM iglesias WHERE id = ?', [id]);
  },

  crearIglesia: (iglesia) => {
     db.query('INSERT INTO iglesias SET ?', iglesia);
  },

  actualizarIglesia: (id, iglesia) => {
   db.query('UPDATE iglesias SET ? WHERE id = ?', [iglesia, id]);
  },

  eliminarIglesia: (id) => {
     db.query('DELETE FROM iglesias WHERE id = ?', [id]);
  }
};

module.exports = Iglesia;
