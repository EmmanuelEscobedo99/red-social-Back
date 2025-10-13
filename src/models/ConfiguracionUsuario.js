// models/ConfiguracionUsuario.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Usuario = require("./Usuario");

const ConfiguracionUsuario = sequelize.define(
  "ConfiguracionUsuario",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombreUsuario: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    fotoPerfil: {
      type: DataTypes.BLOB("long"), 
      allowNull: true,
    },
    usuarioId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true, // relación 1 a 1
      references: {
        model: Usuario,
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
  },
  {
    tableName: "configuracion_usuarios",
    timestamps: true,
  }
);

// Relación 1 a 1
Usuario.hasOne(ConfiguracionUsuario, { foreignKey: "usuarioId", as: "configuracion" });
ConfiguracionUsuario.belongsTo(Usuario, { foreignKey: "usuarioId", as: "usuario" });

module.exports = ConfiguracionUsuario;
