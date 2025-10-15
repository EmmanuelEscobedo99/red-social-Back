const Publicacion = require("../models/PublicacionesUsuario");
const Usuario = require("../models/Usuario");

/**
 *  Crear una nueva publicación
 */
exports.crearPublicacion = async (req, res) => {
  try {
    const { contenido, usuarioId } = req.body;

    if (!contenido || !usuarioId) {
      return res.status(400).json({ ok: false, msg: "Faltan campos obligatorios." });
    }

    let imagenBase64 = null;
    if (req.file) {
      // req.file.buffer existe si usas multer con storage 'memoryStorage'
      imagenBase64 = req.file.buffer.toString("base64");
    }

    const nuevaPublicacion = await Publicacion.create({
      contenido,
      imagen: imagenBase64,
      usuarioId,
    });

    res.status(201).json({ ok: true, publicacion: nuevaPublicacion });
  } catch (error) {
    console.error("Error al crear publicación:", error);
    res.status(500).json({ ok: false, msg: "Error al crear la publicación." });
  }
};


/**
 *  Obtener todas las publicaciones (últimas primero)
 */
exports.obtenerPublicaciones = async (req, res) => {
  try {
    const publicaciones = await Publicacion.findAll({
      include: [
        {
          model: Usuario,
          as: "usuario",
          attributes: ["id", "nombre", "correo"],
        },
      ],
      order: [["fecha_creacion", "DESC"]],
    });

    // Convertir imágenes a base64 para el frontend
    const publicacionesConImagen = publicaciones.map((p) => ({
      ...p.toJSON(),
      imagen: p.imagen ? p.imagen.toString("base64") : null,
    }));

    res.json({ ok: true, publicaciones: publicacionesConImagen });
  } catch (error) {
    console.error("Error al obtener publicaciones:", error);
    res.status(500).json({ ok: false, msg: "Error al obtener las publicaciones." });
  }
};

/**
 *  Obtener publicaciones por usuario
 */
exports.obtenerPublicacionesPorUsuario = async (req, res) => {
  try {
    const { usuarioId } = req.body;

    if (!usuarioId) {
      return res.status(400).json({ ok: false, msg: "Se requiere el usuarioId" });
    }

    const publicaciones = await Publicacion.findAll({
      where: { usuarioId },
      order: [["fecha_creacion", "DESC"]],
    });

    // Convertir imágenes como en foto de perfil
    const publicacionesConImagen = publicaciones.map((p) => {
      const pub = p.toJSON();
      return {
        ...pub,
        imagen: pub.imagen ? `data:image/jpeg;base64,${pub.imagen}` : null, 
      };
    });

    res.json({ ok: true, publicaciones: publicacionesConImagen });
  } catch (error) {
    console.error("Error al obtener publicaciones por usuario:", error);
    res.status(500).json({ ok: false, msg: "Error al obtener publicaciones del usuario." });
  }
};


/**
 *  Eliminar una publicación
 */
exports.eliminarPublicacion = async (req, res) => {
  try {
    const { id } = req.body;

    const publicacion = await Publicacion.findByPk(id);
    if (!publicacion) {
      return res.status(404).json({ ok: false, msg: "Publicación no encontrada." });
    }

    await publicacion.destroy();
    res.json({ ok: true, msg: "Publicación eliminada correctamente." });
  } catch (error) {
    console.error("Error al eliminar publicación:", error);
    res.status(500).json({ ok: false, msg: "Error al eliminar la publicación." });
  }
};
