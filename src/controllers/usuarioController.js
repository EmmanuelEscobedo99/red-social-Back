const Usuario = require("../models/Usuario");

// Obtener todos los usuarios
exports.obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear un nuevo usuario
exports.crearUsuario = async (req, res) => {
  try {
    const nuevo = await Usuario.create(req.body);
    res.json(nuevo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
