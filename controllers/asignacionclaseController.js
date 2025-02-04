const AsignacionClase = require('../models/asignacionclaseModel');

const controladorAsignacionClase = {
    obtenerTodasAsignacionesClase: async (req, res) => {
        AsignacionClase.obtener_asignacion_clase((err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Error al obtener las asignaciones de clase', error: err });
            }
            res.json(result);
        });
    },

    obtenerAsignacionClasePorId: async (req, res) => {
        const id = req.params.id;

        AsignacionClase.obtener_asignacion_clase_ID(id, (err, result) => {
            if (err) return res.status(500).json({ message: 'Error al obtener la asignación de clase', error: err });
            if (!result || result.length === 0) return res.status(404).json({ message: 'Asignación de clase no encontrada' });
            res.json(result);
        });
    },

    crearAsignacionClase: async (req, res) => {
        const { id_maestro, id_clase } = req.body;
        const nuevaasignacion = { id_maestro, id_clase };

        AsignacionClase.crear_asignacion_clase(nuevaasignacion, (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Error al crear la asignacion', error: err });
            }
            res.status(201).json({ mensaje: 'asignacioncreada exitosamente', asistenciaCreada: result });
        });
    },

    actualizarAsignacionClase: async (req, res) => {
        const { id } = req.params;
        const { id_maestro, id_clase } = req.body;
        const asignacionClaseActualizada = { id_maestro, id_clase };

        AsignacionClase.actualizar_asignacion_clase(id, asignacionClaseActualizada, (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Error al actualizar la asignación de clase', error: err });
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Asignación de clase no encontrada para actualizar' });
            }
            res.json({ mensaje: 'Asignación de clase actualizada exitosamente' });
        });
    },

    eliminarAsignacionClase: async (req, res) => {
        const { id } = req.params;

        AsignacionClase.borrar_asignacion_clase(id, (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Error al eliminar la asignación de clase', error: err });
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Asignación de clase no encontrada para eliminar' });
            }
            res.json({ mensaje: 'Asignación de clase eliminada exitosamente' });
        });
    }
};

module.exports = controladorAsignacionClase;