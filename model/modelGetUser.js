import Sql from "./db/db.js";

export default class GetUserModel {
  static async getUser() {
    const db = await Sql.db();
    try {
      const getUser = await db.all(`SELECT * FROM USER ORDER BY NOME ASC`);
      if (getUser.length === 0) {
        throw new Error("There are no users registered in the system");
      }

      return getUser.map((char) => ({
        nome: char.NOME,
        email: char.EMAIL,
        userId: char.ID
      }));


    } catch (error) {
      throw new Error(error);
    }finally{
      await db.close()
    }
  }
}
