const db = require('../config/db');

const encuesta = {
  obtenerTodasencuestas: (callback) => {
     db.query('SELECT * FROM encuestas',callback);
  },

  obtenerencuestaPorId: (id,callback) => {
  db.query('SELECT * FROM encuestas WHERE id = ?', [id],callback);
  },

  crearencuesta: (encuesta, callback) => { 
   db.query('INSERT INTO encuestas SET ?', encuesta, (err, result) => { 
       if (err) {
           return callback(err, null); 
       }
       const id_encuesta = result.insertId; 
       return callback(null, id_encuesta); 
   });
},
  actualizarencuesta: (id, encuesta) => {
   db.query('UPDATE encuestas SET ? WHERE id = ?', [encuesta, id]);
  },

  eliminarencuesta: (id) => {
     db.query('DELETE FROM encuestas WHERE id = ?', [id]);
  }
};

module.exports = encuesta;
