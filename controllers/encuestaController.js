const encuesta = require("../models/encuesta_Model");

const controladorEncuesta = {
  obtenerTodasEncuestas: async (req, res) => {
    encuesta.obtenerTodasencuestas((err, result) => {
      if (err) {
        return res.status(500).json({ mensaje: "Error al obtener las encuestas", error: err });
      }
      res.json(result);
    });
  },

  obtenerEncuestaPorId: async (req, res) => {
    const id = req.params.id;
    encuesta.obtenerencuestaPorId(id, (err, result) => {
      if (err) return res.status(500).json({ mensaje: "Error al obtener la encuesta", error: err });
      if (!result) return res.status(404).json({ mensaje: "Encuesta no encontrada" });
      res.json(result);
    });
  },

  crearEncuesta: async (req, res) => {
    const { id_usuario, id_clase, fecha, comentario, pregunta_1, pregunta_2, pregunta_3, pregunta_4, pregunta_5, pregunta_6, pregunta_7, pregunta_8, pregunta_9 } = req.body;
    
    if (!id_usuario || !id_clase || !fecha || !pregunta_1 || !pregunta_2 || !pregunta_3 || !pregunta_4 || !pregunta_5 || !pregunta_6 || !pregunta_7 || !pregunta_8 || !pregunta_9) {
      return res.status(400).json({ mensaje: "Todos los campos son obligatorios" });
    }

    const nuevaEncuesta = { id_usuario, id_clase, fecha, comentario, pregunta_1, pregunta_2, pregunta_3, pregunta_4, pregunta_5, pregunta_6, pregunta_7, pregunta_8, pregunta_9 };

    encuesta.crearencuesta(nuevaEncuesta, (err, id_encuesta) => {
      if (err) {
        return res.status(500).json({ mensaje: "Error al crear la encuesta", error: err });
      }
      res.status(201).json({ mensaje: "Encuesta creada exitosamente", id_encuesta });
    });
  },

  actualizarEncuesta: async (req, res) => {
    const { id } = req.params;
    const { id_usuario, id_clase, fecha, comentario, pregunta_1, pregunta_2, pregunta_3, pregunta_4, pregunta_5, pregunta_6, pregunta_7, pregunta_8, pregunta_9 } = req.body;

    if (!id_usuario || !id_clase || !fecha || !pregunta_1 || !pregunta_2 || !pregunta_3 || !pregunta_4 || !pregunta_5 || !pregunta_6 || !pregunta_7 || !pregunta_8 || !pregunta_9) {
      return res.status(400).json({ mensaje: "Todos los campos son obligatorios" });
    }

    try {
      const encuestaActualizada = { id_usuario, id_clase, fecha, comentario, pregunta_1, pregunta_2, pregunta_3, pregunta_4, pregunta_5, pregunta_6, pregunta_7, pregunta_8, pregunta_9 };
      encuesta.actualizarencuesta(id, encuestaActualizada);
      res.json({ mensaje: "Encuesta actualizada exitosamente" });
    } catch (error) {
      res.status(500).json({ mensaje: "Error al actualizar la encuesta", error });
    }
  },

  eliminarEncuesta: async (req, res) => {
    const { id } = req.params;
    try {
      encuesta.eliminarencuesta(id);
      res.json({ mensaje: "Encuesta eliminada exitosamente" });
    } catch (error) {
      res.status(500).json({ mensaje: "Error al eliminar la encuesta", error });
    }
  },
};

module.exports = controladorEncuesta;
