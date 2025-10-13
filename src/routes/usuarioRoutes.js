const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuarioController");

router.get("/getUser", usuarioController.obtenerUsuarios);
router.post("/createUser", usuarioController.crearUsuario);
router.post("/login", usuarioController.loginUsuario);

module.exports = router;
