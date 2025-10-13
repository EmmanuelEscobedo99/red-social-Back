const ConfiguracionUsuario = require("../models/ConfiguracionUsuario");
const Usuario = require("../models/Usuario");

// Crear o actualizar configuración de usuario

exports.crearConfiguracionUsuario = async (req, res) => {
  try {
    const { usuarioId, nombreUsuario } = req.body;
    const fotoPerfil = req.file ? req.file.buffer : null; // <- multer pone el archivo aquí

    if (!usuarioId) {
      return res.status(400).json({ ok: false, error: "usuarioId es obligatorio" });
    }

    // Verificar si el usuario existe
    const usuario = await Usuario.findByPk(usuarioId);
    if (!usuario) {
      return res.status(404).json({ ok: false, error: "Usuario no encontrado" });
    }

    // Buscar si ya existe configuración
    let config = await ConfiguracionUsuario.findOne({ where: { usuarioId } });

    if (config) {
      config.nombreUsuario = nombreUsuario || config.nombreUsuario;
      if (fotoPerfil) config.fotoPerfil = fotoPerfil;
      await config.save();
    } else {
      config = await ConfiguracionUsuario.create({
        usuarioId,
        nombreUsuario,
        fotoPerfil
      });
    }

    res.json({ ok: true, configuracion: config });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
};

// Obtener configuración de un usuario
exports.obtenerConfiguracionUsuario = async (req, res) => {
  try {
    const { usuarioId } = req.body;

    if (!usuarioId) {
      return res.status(400).json({ ok: false, error: "usuarioId es obligatorio" });
    }

    const config = await ConfiguracionUsuario.findOne({ where: { usuarioId } });

    if (!config) {
      return res.status(404).json({ ok: false, error: "Configuración no encontrada" });
    }

    // Convertir la foto de perfil a Base64 si existe
    const configData = config.toJSON();
    if (configData.fotoPerfil) {
      configData.fotoPerfil = Buffer.from(configData.fotoPerfil).toString("base64");
    }

    res.json({ ok: true, configuracion: configData });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
};

