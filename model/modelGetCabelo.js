import Sql from "./db/db.js";

export default class GetCabeloUser {
  static async getCabelo(ID) {
    const cabelo = await Sql.db();
    try {
      const getCabelo = await cabelo.get(`SELECT * FROM CABELOS WHERE ID = ?`, [
        ID
      ]);
      const { PRECO , NOME_IMAGE,ID} = getCabelo;
      return {PRECO, NOME_IMAGE, ID};
    } finally {
      await cabelo.close();
    }
  }
}
