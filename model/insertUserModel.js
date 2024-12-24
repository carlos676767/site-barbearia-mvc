import get from "../cache/cache.js";
import JwtAsign from "../utils/auth/jwtAssign.js";
import Sql from "./db/db.js";

export default class InsertUser {
  static async insert(code) {
    const Usuario = await Sql.db();
    try {
      const getCache = get.get(`myUser`);

      await Usuario.exec(`BEGIN TRANSACTION`);

      if (!getCache) {
        throw new Error("Refaca a solicitacao para criar o usuario.");
      }

      const { user, email, senha, codigo } = getCache;
      

      if (Number(code) === Number(codigo)) {
        const query = `INSERT INTO USER(NOME, EMAIL,SENHA) VALUES(?, ?, ?)`;

        await Usuario.run(query, [user, email, senha]);

        await Usuario.exec("COMMIT");

        return JwtAsign.jwt({email});
      }

      throw new Error("The code is invalid, enter another code");
    } catch (error) {
      console.error("Erro ao inserir usuário:", error.message);
      await Usuario.exec(`ROLLBACK`);
      throw new Error(error.message);
    }
  }
}
