import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database.js";

class Student extends Model {}

Student.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    grade: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,       // ← this MUST be the Sequelize instance
    modelName: "Student",
    tableName: "students",
    timestamps: false,
  }
);

export default Student;