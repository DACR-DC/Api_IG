const AccionMisionera = require("../models/accion_misioneraModel");

const controladorAccionMisionera = {
  obtenerTodasAccionesMisioneras: async (req, res) => {
    AccionMisionera.obtener_accionMisionera((err, result) => {
      if (err) {
        return res
          .status(500)
          .json({
            message: "Error al obtener las acciones misioneras",
            error: err,
          });
      }
      res.json(result);
    });
  },

  obtenerAccionMisioneraPorId: async (req, res) => {
    const id = req.params.id;

    AccionMisionera.obtener_accionMisionera_ID(id, (err, result) => {
      if (err)
        return res
          .status(500)
          .json({
            message: "Error al obtener la acción misionera",
            error: err,
          });
      if (!result || result.length === 0)
        return res
          .status(404)
          .json({ message: "Acción misionera no encontrada" });
      res.json(result);
    });
  },

  crearAccionMisionera: async (req, res) => {
    const {
      id_informe,
      visitas_misioneras,
      contactos_misioneros,
      estudios_biblicos,
      miembros_rescate,
      miembros_involucrados_recoleccion,
      oracion_intercesora,
      bautismos,
      involucrados_benevolencia,
      numero_visitas,
      cuantos_estudiaron,
    } = req.body;

    const nuevaAccionMisionera = {
      id_informe,
      visitas_misioneras,
      contactos_misioneros,
      estudios_biblicos,
      miembros_rescate,
      miembros_involucrados_recoleccion,
      oracion_intercesora,
      bautismos,
      involucrados_benevolencia,
      numero_visitas,
      cuantos_estudiaron,
    };

    AccionMisionera.crear_accionMisionera(
      nuevaAccionMisionera,
      (err, result) => {
        if (err) {
          return res
            .status(500)
            .json({
              message: "Error al crear la acción misionera",
              error: err,
            });
        }
        res
          .status(201)
          .json({
            mensaje: "Acción misionera creada exitosamente",
            accionMisioneraId: result,
          }); 
      }
    );
  },

  actualizarAccionMisionera: async (req, res) => {
    const { id } = req.params;
    const {
      id_informe,
      visitas_misioneras,
      contactos_misioneros,
      estudios_biblicos,
      miembros_rescate,
      miembros_involucrados_recoleccion,
      oracion_intercesora,
      bautismos,
      involucrados_benevolencia,
      numero_visitas,
      cuantos_estudiaron,
    } = req.body;

    const accionMisioneraActualizada = {
      id_informe,
      visitas_misioneras,
      contactos_misioneros,
      estudios_biblicos,
      miembros_rescate,
      miembros_involucrados_recoleccion,
      oracion_intercesora,
      bautismos,
      involucrados_benevolencia,
      numero_visitas,
      cuantos_estudiaron,
    };

    AccionMisionera.actualizar_accionMisionera(
      id,
      accionMisioneraActualizada,
      (err, result) => {
        if (err) {
          return res
            .status(500)
            .json({
              message: "Error al actualizar la acción misionera",
              error: err,
            });
        }
        if (result.affectedRows === 0) {
          return res
            .status(404)
            .json({
              message: "Acción misionera no encontrada para actualizar",
            });
        }
        res.json({ mensaje: "Acción misionera actualizada exitosamente" });
      }
    );
  },

  eliminarAccionMisionera: async (req, res) => {
    const { id } = req.params;

    AccionMisionera.borrar_accionMisionera(id, (err, result) => {
      if (err) {
        return res
          .status(500)
          .json({
            message: "Error al eliminar la acción misionera",
            error: err,
          });
      }
      if (result.affectedRows === 0) {
        return res
          .status(404)
          .json({ message: "Acción misionera no encontrada para eliminar" });
      }
      res.json({ mensaje: "Acción misionera eliminada exitosamente" });
    });
  },
};

module.exports = controladorAccionMisionera;
