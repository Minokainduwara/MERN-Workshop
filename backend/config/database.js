import { Sequelize } from "sequelize";

const sequelize = new Sequelize("mern_workshop", "root", "newpassword", {
  host: "localhost",
  dialect: 'mariadb',
  logging: false, // disable SQL logs in console
});

export default sequelize;