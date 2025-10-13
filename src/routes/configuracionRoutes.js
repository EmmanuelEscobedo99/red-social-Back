const express = require("express");
const router = express.Router();
const configuracionController = require("../controllers/configuracionController");
const upload = require("../middlewares/upload");

// Ruta para crear/actualizar configuración de usuario
router.post(
  "/createConfiguracionUsuario",
  upload.single("fotoPerfil"), // <- aquí se procesa el archivo
  configuracionController.crearConfiguracionUsuario
);
router.post("/getConfiguracionUsuario", configuracionController.obtenerConfiguracionUsuario);

module.exports = router;
