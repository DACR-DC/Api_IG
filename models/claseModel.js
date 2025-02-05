const db = require('../config/db');

const Clase = {
  obtenerTodasclases: (callback) => {
     db.query('SELECT * FROM clase',callback);
  },

  obtenerclasePorId: (id,callback) => {
  db.query('SELECT * FROM clase WHERE id = ?', [id],callback);
  },

  crearclase: (clase, callback) => { 
   db.query('INSERT INTO clase SET ?', clase, (err, result) => { 
       if (err) {
           return callback(err, null); 
       }
       const id_clase = result.insertId; 
       return callback(null, id_clase); 
   });
},
  actualizarclase: (id, clase) => {
   db.query('UPDATE clase SET ? WHERE id = ?', [clase, id]);
  },

  eliminarclase: (id) => {
     db.query('DELETE FROM clase WHERE id = ?', [id]);
  }
};

module.exports = Clase;
