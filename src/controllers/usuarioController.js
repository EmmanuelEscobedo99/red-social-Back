const Usuario = require("../models/Usuario");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY;

// Obtener todos los usuarios
exports.obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.json({ ok: true, usuarios });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
};

// Crear un nuevo usuario (registro)
exports.crearUsuario = async (req, res) => {
  try {
    const { nombre, correo, password, rol } = req.body;

    // Verificar si el email ya existe
    const existente = await Usuario.findOne({ where: { correo } });
    if (existente) {
      return res.status(400).json({ ok: false, error: "El correo ya está registrado" });
    }

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    const nuevo = await Usuario.create({
      nombre,
      correo,
      password: hashedPassword,
      rol: rol || "usuario",
    });

    res.json({ ok: true, user: nuevo });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
};

// Login
exports.loginUsuario = async (req, res) => {
  try {
    const { correo, password } = req.body;

    // Buscar usuario por email
    const usuario = await Usuario.findOne({ where: { correo } });
    if (!usuario) {
      return res.status(404).json({ ok: false, error: "Usuario no encontrado" });
    }

    // Verificar contraseña
    const passwordCorrecta = await bcrypt.compare(password, usuario.password);
    if (!passwordCorrecta) {
      return res.status(401).json({ ok: false, error: "Contraseña incorrecta" });
    }

    // Generar JWT
    const token = jwt.sign(
      { id: usuario.id, email: usuario.correo, rol: usuario.rol },
      SECRET_KEY,
      { expiresIn: "8h" }
    );

    res.json({ ok: true, user: usuario, token });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
};
