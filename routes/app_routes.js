const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const controladorIglesias = require('../controllers/iglesiaController');
const controladorLecciones = require('../controllers/leccionesController');
const controladorMisiones = require('../controllers/misionController');
const controladorClase = require('../controllers/claseController');
const controladorPriv = require('../controllers/privilegioController');
const controladorAsistencia = require('../controllers/asistenciaController');
const controladorInforme = require('../controllers/informeController');
const controladorAsignacionClase = require('../controllers/asignacionclaseController');
const controladorAccionMisionera = require('../controllers/accion_misioneraController');
const controladorEncuesta = require('../controllers/encuestaController');
const { body, validationResult } = require('express-validator');

router.post('/login', [
  body('usuario').notEmpty().withMessage('El campo usuario es obligatorio'),
  body('correo').notEmpty().withMessage('El correo del usuario es obligatorio'),
  body('contrasena').notEmpty().withMessage('El campo contraseña es obligatorio'),
], authController.login);

router.post('/logout', authController.logout);
router.post('/me', authController.me);


//USUARIOSs
router.get('/usuarios', userController.obtenerUsuarios);
router.post('/usuarios', [
  body('usuario').notEmpty().withMessage('El nombre de usuario es obligatorio'),
  body('correo').notEmpty().withMessage('El correo del usuario es obligatorio'),
  body('contrasena').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
  body('id_privilegios').notEmpty().withMessage('Ingrese un numero de privilegio valido'),
], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}, userController.create);

router.get('/usuarios/:id', userController.getUserById);
router.put('/usuarios/:id', [
  body('usuario').optional().notEmpty().withMessage('El nombre de usuario no puede estar vacío'),
  body('contrasena').optional().isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}, userController.updateUser);

router.delete('/usuarios/:id', userController.deleteUser);

//IGLESIAS
router.get('/iglesia', controladorIglesias.obtenerTodasIglesias);
router.get('/iglesia/:id', controladorIglesias.obtenerIglesiaPorId);

router.post('/iglesia', [
  body('nombre').notEmpty().withMessage('El nombre de la iglesia es obligatorio'),
  body('distrito').notEmpty().withMessage('El nombre del distrito es obligatorio'),
  body('id_mision').isInt().withMessage('El id de la misión debe ser un número entero'),
], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}, controladorIglesias.crearIglesia);

router.put('/iglesia/:id', [
  body('nombre').optional().notEmpty().withMessage('El nombre de la iglesia no puede estar vacío'),
  body('distrito').notEmpty().withMessage('El nombre del distrito es obligatorio'),
  body('id_mision').optional().isInt().withMessage('El id de la misión debe ser un número entero'),
], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}, controladorIglesias.actualizarIglesia);

router.delete('/iglesia/:id', controladorIglesias.eliminarIglesia);

//LECCIONES
router.get('/leccion', controladorLecciones.obtenerTodasLecciones);
router.get('/leccion/:id', controladorLecciones.obtenerLeccionPorId);

router.post('/leccion', [
  body('id_clase').isInt().withMessage('El ID de la clase debe ser un número entero'),
  body('titulo').notEmpty().withMessage('El título de la lección es obligatorio'),
  body('contenido').notEmpty().withMessage('El contenido de la lección es obligatorio'),
  body('fecha').isDate().withMessage('La fecha debe ser una fecha válida')

], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}, controladorLecciones.crearLeccion);


router.put('/leccion/:id', [
  body('id_clase').optional().isInt().withMessage('El ID de la clase debe ser un número entero'),
  body('titulo').optional().notEmpty().withMessage('El título no puede estar vacío'),
  body('contenido').optional().notEmpty().withMessage('El contenido no puede estar vacío'),
  body('fecha').optional().isDate().withMessage('La fecha debe ser una fecha válida')
], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}, controladorLecciones.actualizarLeccion);
router.delete('/leccion/:id', controladorLecciones.eliminarLeccion);

//Mision
router.get('/mision', controladorMisiones.obtenerTodasMisiones);
router.get('/mision/:id', controladorMisiones.obtenerMisionesPorId);

router.post('/mision', [
  body('nombre').notEmpty().withMessage('El nombre de la mision es obligatorio')
], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}, controladorMisiones.crearMision);


router.put('/mision/:id', [
  body('nombre').notEmpty().withMessage('El nombre de la mision es obligatorio')
], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}, controladorMisiones.actualizarMision);
router.delete('/mision/:id', controladorMisiones.eliminarMision);

//Clase
router.get('/clase', controladorClase.obtenerTodasclases);
router.get('/clase/:id', controladorClase.obtenerclasePorId);

router.post('/clase', [
  body('id_iglesia').notEmpty().withMessage('El id_iglesia es obligatorio'),
  body('nombre').notEmpty().withMessage('El nombre de la clase es obligatorio')
], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}, controladorClase.crearclase);


router.put('/clase/:id', [
  body('id_iglesia').notEmpty().withMessage('El id_iglesia es obligatorio'),
  body('nombre').notEmpty().withMessage('El nombre de la clase es obligatorio')
], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}, controladorClase.actualizarclase);
router.delete('/clase/:id', controladorClase.eliminarclase);

//Privilegios
router.get('/privilegio', controladorPriv.obtenerPrivilegios);
router.get('/privilegio/:id', controladorPriv.obtenerPrivporId);
router.delete('/privilegio/:id', controladorPriv.deletePriv);
router.post('/privilegio', [
  body('nombre').notEmpty().withMessage('El nombre del privilegio es obligatorio')
], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}, controladorPriv.create);

//ASISTENCIA
router.get('/asistencia', controladorAsistencia.obtenerTodasasistencia);
router.get('/asistencia/:id', controladorAsistencia.obtenerasistenciaPorId);

router.post('/asistencia', [
  body('id_clase').notEmpty().withMessage('El id de la clase es obligatorio '),
  body('id_estudiante').notEmpty().withMessage('El id del estudiante es obligatorio'),
  body('fecha').isISO8601().notEmpty().withMessage('Fecha obligatoria'),
  body('estado').notEmpty().withMessage('Estado obligatorio ')
], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}, controladorAsistencia.crearasistencia);


router.put('/asistencia/:id', [
  body('id_clase').notEmpty().withMessage('El id de la clase es oblgatorio'),
  body('id_estudiante').notEmpty().withMessage('El id del estudiante es obligatorio'),
  body('fecha').isISO8601().withMessage('La fecha debe tener un formato válido'),
  body('estado').notEmpty().withMessage('El estado es obligatorio')
], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}, controladorAsistencia.actualizarasistencia);

router.delete('/asistencia/:id', controladorAsistencia.eliminarasistencia);


// INFORMES 
router.get('/informes', controladorInforme.obtenerTodosInformes);
router.get('/informes/:id', controladorInforme.obtenerInformePorId);
router.post('/informes', [
  body('fecha').notEmpty().withMessage('La fecha es obligatoria'),
  body('titulo').notEmpty().withMessage('El título es obligatorio'),
  body('comentario').notEmpty().withMessage('El comentario es obligatorio'),
  body('id_profesor').notEmpty().withMessage('El ID del profesor es obligatorio'),
  body('id_clase').notEmpty().withMessage('El ID de la clase es obligatorio'), // Nueva validación
], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}, controladorInforme.crearInforme);
router.put('/informes/:id', [
  body('fecha').optional().notEmpty().withMessage('La fecha no puede estar vacía'),
  body('titulo').optional().notEmpty().withMessage('El título no puede estar vacío'),
  body('comentario').optional().notEmpty().withMessage('El comentario no puede estar vacío'),
  body('id_profesor').optional().notEmpty().withMessage('El ID del profesor no puede estar vacío'),
  body('id_clase').optional().notEmpty().withMessage('El ID de la clase no puede estar vacío'), // Nueva validación
], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}, controladorInforme.actualizarInforme);
router.delete('/informes/:id', controladorInforme.eliminarInforme);

// ASIGNACION DE CLASE, table is: id, id_usuario, id_clase, es_estudiante(integer)


// create a asignacion_clase
router.post('/asignacion-clase', [
  body('id_usuario').notEmpty().withMessage('El ID del usuario es obligatorio'),
  body('id_clase').notEmpty().withMessage('El ID de la clase es obligatorio')],
  controladorAsignacionClase.create);



// get all asignacion_clase
router.get('/asignacion-clase', controladorAsignacionClase.getAllAsignacionClase);
router.get('/asignacion-clase/:id', controladorAsignacionClase.getAsignacionClasePorId);
router.get('/asignacion-clase/usuario/:id', controladorAsignacionClase.getAsignacionClasePorUsuario);
// delete asignacion_clase by id_usuario
router.delete('/asignacion-clase/:id', controladorAsignacionClase.deleteAsignacionClase);















// ACCION MISIONERA
router.get('/acciones-misioneras', controladorAccionMisionera.obtenerTodasAccionesMisioneras);
router.get('/acciones-misioneras/:id', controladorAccionMisionera.obtenerAccionMisioneraPorId);
router.post('/acciones-misioneras', [
  body('id_informe').notEmpty().withMessage('El ID del informe es obligatorio'),
  body('visitas_misioneras').isInt().withMessage('Las visitas deben ser un número'),
  body('contactos_misioneros').isInt().withMessage('Los contactos deben ser un número'),
  body('estudios_biblicos').isInt().withMessage('Los estudios deben ser un número'),
  body('miembros_rescate').isInt().withMessage('Los miembros rescatados deben ser un número'),
  body('miembros_involucrados_recoleccion').isInt().withMessage('Los miembros involucrados en recolección deben ser un número'),
  body('oracion_intercesora').isInt().withMessage('La oración intercesora debe ser un número'),
  body('bautismos').isInt().withMessage('Los bautismos deben ser un número'),
  body('involucrados_benevolencia').isInt().withMessage('Los involucrados en benevolencia deben ser un número'),
  body('numero_visitas').isInt().withMessage('El número de visitas debe ser un número'),
  body('cuantos_estudiaron').isInt().withMessage('Los que estudiaron deben ser un número'),
], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}, controladorAccionMisionera.crearAccionMisionera);
router.put('/acciones-misioneras/:id', [
  body('id_informe').optional().notEmpty().withMessage('El ID del informe no puede estar vacío'),
  body('visitas_misioneras').optional().isInt().withMessage('Las visitas deben ser un número'),
  body('contactos_misioneros').optional().isInt().withMessage('Los contactos deben ser un número'),
  body('estudios_biblicos').optional().isInt().withMessage('Los estudios deben ser un número'),
  body('miembros_rescate').optional().isInt().withMessage('Los miembros rescatados deben ser un número'),
  body('miembros_involucrados_recoleccion').optional().isInt().withMessage('Los miembros involucrados en recolección deben ser un número'),
  body('oracion_intercesora').optional().isInt().withMessage('La oración intercesora debe ser un número')]);



// new routes for asistencia
router.post('/asistencia-clase', [
  body('id_clase').notEmpty().withMessage('El ID de la clase es obligatorio'),
  body('fecha').notEmpty().withMessage('La fecha es obligatoria'),
], controladorAsistencia.create);
//router.get('/asistencia-clase/:id_clase', controladorAsistencia.getAsistenciaPorClase);
router.put('/asistencia-clase', controladorAsistencia.updateStatus);


router.post('/asistencia-estudiante', [
  body('id_estudiante').notEmpty().withMessage('El ID del estudiante es obligatorio'),
  body('id_asistencia').notEmpty().withMessage('El ID de la asistencia es obligatoria'),
  body('status').notEmpty().withMessage('El Status de la asistencia es obligatoria'),
], controladorAsistencia.create_estudiante);

router.get('/asistencia-estudiante/:id_clase', controladorAsistencia.get_asistencias);
router.put('/asistencia-estudiante/:id', [
  body('status')
    .notEmpty().withMessage('Status de la asistencia obligatorio')
    .isInt({ min: 0, max: 1 }).withMessage('Status debe ser 1 o 0'),
], controladorAsistencia.actualizar_asistencia_estudiante);

//obtener asistencia segun la clase
router.get('/asistencia-clase/:id', [
  body('id_clase').notEmpty().withMessage('El ID de la clase es obligatorio'),

], controladorAsistencia.obtener_asistencia_claseID);


// obtener asistencia segun clase y fecha
router.get('/asistencia-clase/:id_clase/:fecha', [
  body('id_clase').notEmpty().withMessage('El ID de la clase es obligatorio'),
  body('fecha').notEmpty().withMessage('La fecha es obligatoria'),
], controladorAsistencia.obtener_asistencia_clase_fecha);





//ENCUESTA
router.get('/encuesta', controladorEncuesta.obtenerTodasEncuestas);
router.get('/encuesta/:id', controladorEncuesta.obtenerEncuestaPorId);

router.post('/encuesta', [
  body('id_usuario').notEmpty().withMessage('El id_usuario es obligatorio'),
  body('id_clase').notEmpty().withMessage('El id_clase es obligatorio'),
  body('fecha').notEmpty().withMessage('La fecha es obligatoria'),
  body('comentario').optional(),
  body('pregunta_1').notEmpty().withMessage('La pregunta 1 es obligatoria'),
  body('pregunta_2').notEmpty().withMessage('La pregunta 2 es obligatoria'),
  body('pregunta_3').notEmpty().withMessage('La pregunta 3 es obligatoria'),
  body('pregunta_4').notEmpty().withMessage('La pregunta 4 es obligatoria'),
  body('pregunta_5').notEmpty().withMessage('La pregunta 5 es obligatoria'),
  body('pregunta_6').notEmpty().withMessage('La pregunta 6 es obligatoria'),
  body('pregunta_7').notEmpty().withMessage('La pregunta 7 es obligatoria'),
  body('pregunta_8').notEmpty().withMessage('La pregunta 8 es obligatoria'),
  body('pregunta_9').notEmpty().withMessage('La pregunta 9 es obligatoria')
], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}, controladorEncuesta.crearEncuesta);

router.put('/encuesta/:id', [
  body('id_usuario').notEmpty().withMessage('El id_usuario es obligatorio'),
  body('id_clase').notEmpty().withMessage('El id_clase es obligatorio'),
  body('fecha').notEmpty().withMessage('La fecha es obligatoria'),
  body('comentario').optional(),
  body('pregunta_1').notEmpty().withMessage('La pregunta 1 es obligatoria'),
  body('pregunta_2').notEmpty().withMessage('La pregunta 2 es obligatoria'),
  body('pregunta_3').notEmpty().withMessage('La pregunta 3 es obligatoria'),
  body('pregunta_4').notEmpty().withMessage('La pregunta 4 es obligatoria'),
  body('pregunta_5').notEmpty().withMessage('La pregunta 5 es obligatoria'),
  body('pregunta_6').notEmpty().withMessage('La pregunta 6 es obligatoria'),
  body('pregunta_7').notEmpty().withMessage('La pregunta 7 es obligatoria'),
  body('pregunta_8').notEmpty().withMessage('La pregunta 8 es obligatoria'),
  body('pregunta_9').notEmpty().withMessage('La pregunta 9 es obligatoria')
], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}, controladorEncuesta.actualizarEncuesta);

router.delete('/encuesta/:id', controladorEncuesta.eliminarEncuesta);




// new routes




// Users Asignament




//





module.exports = router;
