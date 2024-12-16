
import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const Usuario = sequelize.sequelizeConfig().define("Usuario",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "usuarios",
    timestamps: true,
  }
);


(async() => {
    (await sequelize.sequelizeConfig()).sync({force:  true})
})()

export default Usuario
