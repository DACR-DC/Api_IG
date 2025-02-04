const db = require('../config/db');

const asignacion_clase={

    obtener_asignacion_clase:(callback)=>{
      db.query('SELECT * FROM asignacion_clase', callback);
    },

    crear_asignacion_clase:(asignacion_clase)=>{
        db.query('INSERT INTO asignacion_clase SET ?', asignacion_clase);
    },

    borrar_asignacion_clase:(id)=>{
        db.query('DELETE * FROM asignacion_clase WHERE id = ?', [id]);
    },

    obtener_asignacion_clase_ID:(id)=>{
        db.query('SELECT * FROM asignacion_clase WHERE id = ?',[id]);
    },

    actualizar_asignacion_clase:(id, asignacion_clase) => {
        db.query('UPDATE asignacion_clase SET ? WHERE id = ?', [asignacion_clase, id]);
       },


}

module.exports=asignacion_clase