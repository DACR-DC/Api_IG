const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const controladorIglesias = require('../controllers/iglesiaController');
const controladorLecciones=require('../controllers/leccionesController');
const controladorMisiones = require('../controllers/misionController');
const controladorClase=require('../controllers/claseController');
const { body, validationResult } = require('express-validator');

router.post('/login', [
    body('usuario').notEmpty().withMessage('El campo usuario es obligatorio'),
    body('correo').notEmpty().withMessage('El correo del usuario es obligatorio'),
    body('contrasena').notEmpty().withMessage('El campo contraseña es obligatorio'),
], authController.login);

router.post('/logout', authController.logout);
router.get('/me', authController.me);


//USUARIOSs
router.get('/usuarios', userController.obtenerUsuarios);
router.post('/usuarios', [
    body('usuario').notEmpty().withMessage('El nombre de usuario es obligatorio'),
    body('correo').notEmpty().withMessage('El correo del usuario es obligatorio'),
    body('contrasena').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
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
router.get('/mision/:id',  controladorMisiones.obtenerMisionesPorId);

router.post('/mision', [
    body('nombre').notEmpty().withMessage('El nombre de la mision es obligatorio')
], (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
},  controladorMisiones.crearMision);


router.put('/mision/:id', [
    body('nombre').notEmpty().withMessage('El nombre de la mision es obligatorio')
], (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
},  controladorMisiones.actualizarMision);
router.delete('/mision/:id',  controladorMisiones.eliminarMision);

//Clase
router.get('/clase', controladorClase.obtenerTodasclases);
router.get('/clase/:id',  controladorClase.obtenerclasePorId);

router.post('/clase', [
    body('id_iglesia').notEmpty().withMessage('El id_iglesia es obligatorio'),
    body('nombre').notEmpty().withMessage('El nombre de la clase es obligatorio')
], (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
},  controladorClase.crearclase);


router.put('/clase/:id', [
    body('id_iglesia').notEmpty().withMessage('El id_iglesia es obligatorio'),
    body('nombre').notEmpty().withMessage('El nombre de la clase es obligatorio')
], (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
},  controladorClase.actualizarclase);
router.delete('/clase/:id',  controladorClase.eliminarclase);
module.exports = router;
