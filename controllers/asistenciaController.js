const asistencia = require('../models/asistenciaModel');

const controladorasistencia = {

  create: async (req, res) => {
    // check id_clase and fecha
    if (!req.body.id_clase || !req.body.fecha) {
      return res.status(400).json({ message: 'id_clase and fecha are required' });
    }

    asistencia.crear_asistencia(req.body, (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Error creating asistencia', error: err });
      }
      res.status(201).json({ message: 'Asistencia created', asistencia: result });
    });
  },

  obtenerTodasasistencia: async (req, res) => {
    asistencia.obtener_asistencias((err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Error al obtener las asistencias', error: err });
      }
      res.json(result);
    });
  },

  obtenerasistenciaPorId: async (req, res) => {
    const id = req.params.id;

    asistencia.obtener_asistencia_ID(id, (err, result) => {
      if (err) return res.status(500).json({ message: 'Error al obtener la asistencia', error: err });
      if (!result || result.length === 0) return res.status(404).json({ message: 'Asistencia no encontrada' });
      res.json(result);
    });
  },

  crearasistencia: async (req, res) => {
    const { id_clase, id_estudiante, fecha, estado } = req.body;
    const nuevaasistencia = { id_clase, id_estudiante, fecha, estado };

    asistencia.crear_asistencia(nuevaasistencia, (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Error al crear la asistencia', error: err });
      }
      res.status(201).json({ mensaje: 'Asistencia creada exitosamente', asistenciaCreada: result });
    });
  },

  actualizarasistencia: async (req, res) => {
    const { id } = req.params;
    const { id_clase, id_estudiante, fecha, estado } = req.body;
    const asistenciaActualizada = { id_clase, id_estudiante, fecha, estado };

    asistencia.actualizar_asistencia(id, asistenciaActualizada, (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Error al actualizar la asistencia', error: err });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Asistencia no encontrada para actualizar' });
      }
      res.json({ mensaje: 'Asistencia actualizada exitosamente' });
    });
  },

  eliminarasistencia: async (req, res) => {
    const { id } = req.params;

    asistencia.borrar_asistencia(id, (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Error al eliminar la asistencia', error: err });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Asistencia no encontrada para eliminar' });
      }
      res.json({ mensaje: 'Asistencia eliminada exitosamente' });
    });
  },

  // =========================  new routes =========================
  getAsistenciaPorClase: async (req, res) => {
    if (!req.params.id_clase) {
      return res.status(400).json({ message: 'id_clase is required' });
    }

    asistencia.obtener_asistencia_por_clase(req.params.id_clase, (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Error al obtener la asistencia por clase', error: err });
      }
      res.json(result);
    });
  },

  updateStatus: async (req, res) => {
    if (!req.body.id_clase) {
      return res.status(400).json({ message: 'id_clase are required' });
    }
    asistencia.actualizar_estado(req.body.id_clase, (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Error updating asistencia', error: err });
      }
      res.json({ message: 'Asistencia status updated', asistencia: result });
    });
  }
};









module.exports = controladorasistencia;
