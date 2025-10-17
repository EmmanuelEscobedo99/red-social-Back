const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuarioController");

router.post("/getUser", usuarioController.obtenerUsuario);
router.post("/getAllUsers", usuarioController.obtenerTodosUsuarios);
router.post("/createUser", usuarioController.crearUsuario);
router.post("/login", usuarioController.loginUsuario);

module.exports = router;
