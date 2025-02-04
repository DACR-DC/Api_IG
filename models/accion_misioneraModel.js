const db = require('../config/db');

const accionMisionera={

    obtener_accionMisionera:(callback)=>{
      db.query('SELECT * FROM accion_misionera', callback);
    },

    crear_accionMisionera:(accionMisionera)=>{
        db.query('INSERT INTO accion_misionera SET ?', accionMisionera);
    },

    borrar_accionMisionera:(id)=>{
        db.query('DELETE * FROM accion_misionera WHERE id = ?', [id]);
    },

    obtener_accionMisionera_ID:(id)=>{
        db.query('SELECT * FROM accion_misionera WHERE id = ?',[id]);
    },

    actualizar_accionMisionera:(id, accionMisionera) => {
        db.query('UPDATE accion_misionera SET ? WHERE id = ?', [accionMisionera, id]);
       },


}

module.exports=accionMisionera