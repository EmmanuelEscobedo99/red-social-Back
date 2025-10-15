const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Usuario = require("./Usuario");

const Publicacion = sequelize.define(
  "Publicacion",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    contenido: {
      type: DataTypes.STRING, 
      allowNull: false,
    },
    imagen: {
      type: DataTypes.BLOB("long"),
      allowNull: true,
    },
    usuarioId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "usuarios", 
        key: "id",
      },
    },
  },
  {
    tableName: "publicaciones_usuario",
    timestamps: true, 
    createdAt: "fecha_creacion",
    updatedAt: "fecha_actualizacion",
  }
);

// 🔗 Relación 1:N (Un usuario puede tener muchas publicaciones)
Usuario.hasMany(Publicacion, {
  foreignKey: "usuarioId",
  as: "publicaciones",
});

Publicacion.belongsTo(Usuario, {
  foreignKey: "usuarioId",
  as: "usuario",
});

module.exports = Publicacion;
