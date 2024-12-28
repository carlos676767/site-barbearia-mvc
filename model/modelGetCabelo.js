import Sql from "./db/db";

export default class GetCabelo {
  static async getCabelo(ID) {
    const cabelo = await Sql.db();
    try {
      const getCabelo = await cabelo.get(`SELECT * FROM CABELOS WHERE ID = ?`, [
        ID
      ]);
      const { PRECO , IMAGEM_URL} = getCabelo;
      return {PRECO, IMAGEM_URL};
    } finally {
      await cabelo.close();
    }
  }
}
