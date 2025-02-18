const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

const JWT_SECRET = "secretodelaiglesia";

exports.login = async (req, res) => {
  console.log("Body recibido:", req.body);
  const { usuario, contrasena } = req.body;

  if (!usuario || !contrasena) {
    return res
      .status(400)
      .json({ message: "Usuario y contraseña son requeridos" });
  }

  try {
    const [result] = await db
      .promise()
      .query("SELECT * FROM users WHERE usuario = ?", [usuario]);
    console.log("Resultado de la consulta", result);

    if (result.length === 0) {
      return res
        .status(401)
        .json({ message: "Usuario o contraseña incorrectos" });
    }

    const usuarioDB = result[0];


    const passwordValida = bcrypt.compareSync(contrasena, usuarioDB.contrasena);


    if (!passwordValida) {
      return res
        .status(401)
        .json({ message: "Usuario o contraseña incorrectos" });
    }

    const [existingToken] = await db
      .promise()
      .query(
        "SELECT token FROM token_sesion WHERE id_user = ? AND expires_at > NOW()",
        [usuarioDB.id]
      );

    if (existingToken.length > 0) {
      console.log("returning existing user");
      return res.json({
        message: "Sesión ya iniciada",
        token: existingToken[0].token,
        user: { ...usuarioDB, contrasena: null },
      });
    }

    const token = jwt.sign({ id: usuarioDB.id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    await db
      .promise()
      .query(
        "INSERT INTO token_sesion (id_user, token, expires_at) VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 1 HOUR))",
        [usuarioDB.id, token]
      );

    res.json({ message: "Inicio de sesión exitoso", token, user: usuarioDB });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

exports.logout = async (req, res) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  console.log("Token recibido:", token);

  if (!token)
    return res.status(401).json({ message: "Acceso denegado. No hay token." });

  try {
    const [result] = await db
      .promise()
      .query("SELECT * FROM token_sesion WHERE token = ?", [token]);

    console.log("Resultado en la base de datos:", result);

    if (result.length === 0) {
      return res.status(401).json({ message: "Token inválido o ya expirado" });
    }

    await db
      .promise()
      .query("DELETE FROM token_sesion WHERE token = ?", [token]);

    res.json({ message: "Sesión cerrada exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al cerrar sesión" });
  }
};

exports.me = async (req, res) => {
  const userId = req.usuario.id;

  try {
    const [result] = await db
      .promise()
      .query("SELECT * FROM users WHERE id = ?", [userId]);

    if (result.length === 0)
      return res.status(404).json({ message: "Usuario no encontrado" });

    const usuario = result[0];

    const [privilegios] = await db
      .promise()
      .query("SELECT nombre FROM privilegios WHERE id = ?", [
        usuario.id_privilegios,
      ]);

    res.json({
      usuario: {
        id: usuario.id,
        usuario: usuario.usuario,
        email: usuario.email,
        id_privilegios: usuario.id_privilegios,
      },
      privilegios: privilegios.length > 0 ? privilegios[0].nombre : null,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error del servidor" });
  }
};

exports.verificarToken = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token)
    return res.status(401).json({ message: "Acceso denegado. No hay token." });

  jwt.verify(token, JWT_SECRET, async (err, decoded) => {
    if (err)
      return res.status(401).json({ message: "Token inválido o expirado" });

    try {
      const [result] = await db
        .promise()
        .query("SELECT * FROM token_sesion WHERE token = ?", [token]);

      if (result.length === 0)
        return res
          .status(401)
          .json({ message: "Token inválido o sesión cerrada" });

      req.usuario = decoded;
      next();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  });
};
