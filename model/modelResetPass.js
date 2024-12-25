import Sql from "./db/db.js";

export default class ModelReset {
  static async resetPassModel(email, senha, novaSenha) {
    const connect = await Sql.db()
    try {

      if (senha !== novaSenha) {
        throw new Error("the passwords are not the same, try again.");
      }

      await connect.exec(`BEGIN TRANSACTION`)

      const query = `UPDATE USER SET SENHA = ? WHERE EMAIL = ?`
      await connect.run(query, [novaSenha , email]);
      await connect.exec(`COMMIT`)
    } catch (error) {
        await connect.exec(`ROLLBACK`)
        throw new Error(`Erro ao trocar senha, tente novamente, ${error.message}`);
    }
  }
}
