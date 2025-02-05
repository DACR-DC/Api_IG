const Clase = require("../models/claseModel");

const controladorClase = {
  obtenerTodasclases: async (req, res) => {
    Clase.obtenerTodasclases((err, result) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error al obtener las clases", error: err });
      }
      res.json(result);
    });
  },

  obtenerclasePorId: async (req, res) => {
    const id = req.params.id;

    Clase.obtenerclasePorId(id, (err, result) => {
      if (err)
        return res
          .status(500)
          .json({ message: "Error al obtener la clase", error: err });
      if (!result)
        return res.status(404).json({ message: "clase no encontrada" });
      res.json(result);
    });
  },

  crearclase: async (req, res) => {
    const { id_iglesia, nombre } = req.body;
    const nuevaclase = { id_iglesia, nombre };

    Clase.crearclase(nuevaclase, (err, id_clase) => {
        if (err) {
            return res.status(500).json({ mensaje: "Error al crear la clase", error: err });
        }
        res.status(201).json({ mensaje: "clase creada exitosamente", id_clase }); 
    });
},

  actualizarclase: async (req, res) => {
    const { id } = req.params;
    const { id_iglesia, nombre } = req.body;
    try {
      const claseActualizada = { id_iglesia, nombre };
      Clase.actualizarclase(id, claseActualizada);
      res.json({ mensaje: "clase actualizada exitosamente" });
    } catch (error) {
      res.status(500).json({ mensaje: "Error al actualizar la clase", error });
    }
  },

  eliminarclase: async (req, res) => {
    const { id } = req.params;
    try {
      Clase.eliminarclase(id);
      res.json({ mensaje: "clase eliminada exitosamente" });
    } catch (error) {
      res.status(500).json({ mensaje: "Error al eliminar la clase", error });
    }
  },
};

module.exports = controladorClase;
