const db = require('../config/db');

const Iglesia = {
  obtenerTodasIglesias: () => {
    return db.query('SELECT * FROM iglesias');
  },

  obtenerIglesiaPorId: (id) => {
    return db.query('SELECT * FROM iglesias WHERE id = ?', [id]);
  },

  crearIglesia: (iglesia) => {
    return db.query('INSERT INTO iglesias SET ?', iglesia);
  },

  actualizarIglesia: (id, iglesia) => {
    return db.query('UPDATE iglesias SET ? WHERE id = ?', [iglesia, id]);
  },

  eliminarIglesia: (id) => {
    return db.query('DELETE FROM iglesias WHERE id = ?', [id]);
  }
};

module.exports = Iglesia;
