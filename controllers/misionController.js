const Mision = require('../models/misionModel');

const controladorMision = {
  obtenerTodasMisiones: async (req, res) => {
    Mision.obtenerMisiones((err, result) => {
      if (err) {
          return res.status(500).json({ message: 'Error al obtener las misiones', error: err });
      }
      res.json(result);
  });
  },

  obtenerMisionesPorId: async (req, res) => {
    const id = req.params.id;

    Mision.obtenerMisionesID(id, (err, result) => {
        if (err) return res.status(500).json({ message: 'Error al obtener la mision', error: err });
        if (!result) return res.status(404).json({ message: 'mision no encontrada' });
        res.json(result);
    });
  },

  crearMision: async (req, res) => {
    const {nombre} = req.body;
    try {
      const nuevaMision = {nombre};
       Mision.crearMision(nuevaMision);
      res.status(201).json({ mensaje: 'Mision creada exitosamente' });
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al crear la Mision', error });
    }
  },

  actualizarMision: async (req, res) => {
    const { id } = req.params;
    const { nombre } = req.body;
    try {
      const misionActualizada = { nombre};
      Mision.actualizarMision(id, misionActualizada);
      res.json({ mensaje: 'mision actualizada exitosamente' });
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al actualizar la mision', error });
    }
  },

  eliminarMision: async (req, res) => {
    const { id } = req.params;
    try {
      Mision.eliminarMision(id);
      res.json({ mensaje: 'Mision eliminada exitosamente' });
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al eliminar la Mision', error });
    }
  }
};

module.exports = controladorMision;
