const Informe = require("../models/informeModel");

const controladorInforme = {
  obtenerTodosInformes: async (req, res) => {
    Informe.obtener_informes((err, result) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error al obtener los informes", error: err });
      }
      res.json(result);
    });
  },

  obtenerInformePorId: async (req, res) => {
    const id = req.params.id;
    Informe.obtener_informe_ID(id, (err, result) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error al obtener el informe", error: err });
      }
      if (!result || result.length === 0) {
        return res.status(404).json({ message: "Informe no encontrado" });
      }
      res.json(result);
    });
  },

  crearInforme: async (req, res) => {
    const { fecha, titulo, comentario, id_profesor, id_clase } = req.body;
    const nuevoInforme = { fecha, titulo, comentario, id_profesor, id_clase };

    Informe.crear_informe(nuevoInforme, (err, result) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .json({ message: "Error al crear el informe", error: err });
      }
      res
        .status(201)
        .json({
          mensaje: "Informe creado exitosamente",
          informeCreado: result,
        });
    });
  },

  actualizarInforme: async (req, res) => {
    const { id } = req.params;
    const { fecha, titulo, comentario, id_profesor, id_clase } = req.body;
    const informeActualizado = {
      fecha,
      titulo,
      comentario,
      id_profesor,
      id_clase,
    };

    Informe.actualizar_informe(id, informeActualizado, (err, result) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error al actualizar el informe", error: err });
      }
      if (result.affectedRows === 0) {
        return res
          .status(404)
          .json({ message: "Informe no encontrado para actualizar" });
      }
      res.json({ mensaje: "Informe actualizado exitosamente" });
    });
  },

  eliminarInforme: async (req, res) => {
    const { id } = req.params;
    Informe.borrar_informe(id, (err, result) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error al eliminar el informe", error: err });
      }
      if (result.affectedRows === 0) {
        return res
          .status(404)
          .json({ message: "Informe no encontrado para eliminar" });
      }
      res.json({ mensaje: "Informe eliminado exitosamente" });
    });
  },
};

module.exports = controladorInforme;
