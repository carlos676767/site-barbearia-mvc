import { Sequelize } from "sequelize";

export default class Database {
  static sequelizeConfig() {
    const sequelize = new Sequelize({
      dialect: "sqlite",
      storage: `C://Users//Administrator//Desktop//site barbearia//model//db//db.js`,
      logging: false,
    });

    return sequelize;
  }

  
  static async main() {
    try {
      await this.sequelizeConfig().authenticate();
      console.log("Connection has been established successfully.");
    } catch (error) {
      console.log(error);
      throw new Error("Error ConnectDb");
    }
  }
}
