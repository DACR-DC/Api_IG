const encuesta = require("../models/encuestaModel");

const controladorencuesta = {
  obtenerTodasencuestas: async (req, res) => {
    encuesta.obtenerTodasencuestas((err, result) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error al obtener las encuestas", error: err });
      }
      res.json(result);
    });
  },

  obtenerencuestaPorId: async (req, res) => {
    const id = req.params.id;

    encuesta.obtenerencuestaPorId(id, (err, result) => {
      if (err)
        return res
          .status(500)
          .json({ message: "Error al obtener la encuesta", error: err });
      if (!result)
        return res.status(404).json({ message: "encuesta no encontrada" });
      res.json(result);
    });
  },

  crearencuesta: async (req, res) => {
    const { id_iglesia, nombre } = req.body;
    const nuevaencuesta = { id_iglesia, nombre };

    encuesta.crearencuesta(nuevaencuesta, (err, id_encuesta) => {
        if (err) {
            return res.status(500).json({ mensaje: "Error al crear la encuesta", error: err });
        }
        res.status(201).json({ mensaje: "encuesta creada exitosamente", id_encuesta }); 
    });
},

  actualizarencuesta: async (req, res) => {
    const { id } = req.params;
    const { id_iglesia, nombre } = req.body;
    try {
      const encuestaActualizada = { id_iglesia, nombre };
      encuesta.actualizarencuesta(id, encuestaActualizada);
      res.json({ mensaje: "encuesta actualizada exitosamente" });
    } catch (error) {
      res.status(500).json({ mensaje: "Error al actualizar la encuesta", error });
    }
  },

  eliminarencuesta: async (req, res) => {
    const { id } = req.params;
    try {
      encuesta.eliminarencuesta(id);
      res.json({ mensaje: "encuesta eliminada exitosamente" });
    } catch (error) {
      res.status(500).json({ mensaje: "Error al eliminar la encuesta", error });
    }
  },
};

module.exports = controladorencuesta;
