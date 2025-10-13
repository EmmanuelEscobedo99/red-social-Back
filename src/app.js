const express = require("express");
const sequelize = require("./config/database");
const usuarioRoutes = require("./routes/usuarioRoutes");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());

// Configurar CORS
app.use(cors({
  origin: "http://localhost:5173", 
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true, 
}));

// Rutas
app.use("/api/usuarios", usuarioRoutes);

// Sincronizar base de datos
sequelize.sync()
  .then(() => console.log("✅ Base de datos sincronizada"))
  .catch(err => console.error("❌ Error al sincronizar DB:", err));

// Iniciar servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
