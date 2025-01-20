const Leccion = require('../models/leccionesModel');

const controladorLecciones = {
  obtenerTodasLecciones: async (req, res) => {
    try {
      const lecciones = await Leccion.obtenerTodasLecciones();
      res.json(lecciones);
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al obtener las lecciones', error });
    }
  },

  obtenerLeccionPorId: async (req, res) => {
    const { id } = req.params;
    try {
      const leccion = await Leccion.obtenerLeccionPorId(id);
      if (!leccion) return res.status(404).json({ mensaje: 'Lección no encontrada' });
      res.json(leccion);
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al obtener la lección', error });
    }
  },

  crearLeccion: async (req, res) => {
    const { id_clase, titulo, contenido, fecha } = req.body;
    try {
      const nuevaLeccion = { id_clase, titulo, contenido, fecha };
      await Leccion.crearLeccion(nuevaLeccion);
      res.status(201).json({ mensaje: 'Lección creada exitosamente' });
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al crear la lección', error });
    }
  },

  actualizarLeccion: async (req, res) => {
    const { id } = req.params;
    const { id_clase, titulo, contenido, fecha } = req.body;
    try {
      const leccionActualizada = { id_clase, titulo, contenido, fecha };
      await Leccion.actualizarLeccion(id, leccionActualizada);
      res.json({ mensaje: 'Lección actualizada exitosamente' });
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al actualizar la lección', error });
    }
  },

  eliminarLeccion: async (req, res) => {
    const { id } = req.params;
    try {
      await Leccion.eliminarLeccion(id);
      res.json({ mensaje: 'Lección eliminada exitosamente' });
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al eliminar la lección', error });
    }
  }
};

module.exports = controladorLecciones;
