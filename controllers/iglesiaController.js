const Iglesia = require('../models/iglesiaModel');

const controladorIglesias = {
  obtenerTodasIglesias: async (req, res) => {
    Iglesia.obtenerTodasIglesias((err, result) => {
      if (err) {
          return res.status(500).json({ message: 'Error al obtener las iglesias', error: err });
      }
      res.json(result);
  });
  },

  obtenerIglesiaPorId: async (req, res) => {
    const { id } = req.params;
    try {
      const iglesia =  Iglesia.obtenerIglesiaPorId(id);
      if (!iglesia) return res.status(404).json({ mensaje: 'Iglesia no encontrada' });
      res.json(iglesia);
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al obtener la iglesia', error });
    }
  },

  crearIglesia: async (req, res) => {
    const { nombre, distrito, id_mision } = req.body;
    try {
      const nuevaIglesia = { nombre, distrito, id_mision };
       Iglesia.crearIglesia(nuevaIglesia);
      res.status(201).json({ mensaje: 'Iglesia creada exitosamente' });
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al crear la iglesia', error });
    }
  },

  actualizarIglesia: async (req, res) => {
    const { id } = req.params;
    const { nombre, distrito, id_mision } = req.body;
    try {
      const iglesiaActualizada = { nombre, distrito, id_mision };
      Iglesia.actualizarIglesia(id, iglesiaActualizada);
      res.json({ mensaje: 'Iglesia actualizada exitosamente' });
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al actualizar la iglesia', error });
    }
  },

  eliminarIglesia: async (req, res) => {
    const { id } = req.params;
    try {
       Iglesia.eliminarIglesia(id);
      res.json({ mensaje: 'Iglesia eliminada exitosamente' });
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al eliminar la iglesia', error });
    }
  }
};

module.exports = controladorIglesias;
