import sequelize from "../config/connection.js";
import { DataTypes } from "sequelize";

const Contact = sequelize.define(
  "Contact",
  {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "contact",
    timestamps: false,
  }
);

export default Contact;
