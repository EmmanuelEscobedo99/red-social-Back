const express = require("express");
const router = express.Router();
const publicacionController = require("../controllers/publicacionController");
const upload = require("../middlewares/upload");

router.post("/crearPublicacion", upload.single("imagen"), publicacionController.crearPublicacion);
router.get("/getPublicaciones", publicacionController.obtenerPublicaciones);
router.post("/getPublicacion", publicacionController.obtenerPublicacionesPorUsuario);
router.delete("/borrarPublicacion", publicacionController.eliminarPublicacion);

module.exports = router;
