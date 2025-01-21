const db =require('../config/db')

const mision = {
    crearMision:(mision)=>{
         db.query('INSERT INTO misiones set ?', mision);

    },
    obtenerMisiones:()=>{
         db.query('SELECT * FROM misiones');
    },
    obtenerMisionesID:(id)=>{
         db.query('SELECT * FROM misiones where id =?',[id]);
    },
    actualizarMision: (id, mision) => {
       db.query('UPDATE misiones SET ? WHERE id = ?', [mision, id]);
      },
    
      eliminarMision: (id) => {
         db.query('DELETE FROM misiones WHERE id = ?', [id]);
      }
}

module.exports = mision;