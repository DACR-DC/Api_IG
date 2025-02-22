const AsignacionClase = require('../models/asignacionclaseModel');


const controladorAsignacionClase = {
  create: async (req, res) => {
    const asignacionClase = req.body;
    try {
      AsignacionClase.crear_asignacion_clase(asignacionClase, (error, result) => {
        if (error) {
          res.status(500).json({ error: error.message });
        } else {
          res.status(201).json(result);
        }
      });
    } catch (error) {
      res.json({ error: error.message });
    }
  },
  getAllAsignacionClase: async (req, res) => {
    try {
      AsignacionClase.obtener_asignacion_clase((error, result) => {
        if (error) {
          res.status(500).json({ error: error.message });
        } else {
          res.status(200).json(result);
        }
      });
    } catch (error) {
      res.json({ error: error.message });
    }
  },
  getAsignacionClasePorId: async (req, res) => {
    const id = req.params.id;
    try {
      AsignacionClase.obtener_asignacion_clase_ID(id, (error, result) => {
        if (error) {
          res.status(500).json({ error: error.message });
        } else {
          res.status(200).json(result[0]);
        }
      });
    } catch (error) {
      res.json({ error: error.message });
    }
  },
  getAsignacionClasePorUsuario: async (req, res) => {
    const id = req.params.id;
    try {
      AsignacionClase.obtener_asignacion_clase_usuario(id, (error, result) => {
        if (error) {
          res.status(500).json({ error: error.message });
        } else {
          res.status(200).json(result[0]);
        }
      });
    } catch (error) {
      res.json({ error: error.message });
    }
  },
  deleteAsignacionClase: async (req, res) => {
    const id = req.params.id;
    try {
      AsignacionClase.borrar_asignacion_clase(id, (error, result) => {
        if (error) {
          res.status(500).json({ error: error.message });
        } else {
          res.status(200).json(result);
        }
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

}

module.exports = controladorAsignacionClase;
