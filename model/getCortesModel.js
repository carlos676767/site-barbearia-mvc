import Sql from "./db/db.js";

export default class GetCortesModel {
  static async getCorteModel() {
    const cortes = await Sql.db();
    try {
      const getCortes = await cortes.all( `SELECT * FROM CORTES ORDER BY NOME_IMAGE ASC`);

      if (getCortes.length === 0) {
        throw new Error("no cuts available");
      };
      
      return getCortes.map((char) => ({
        cabelo: char.NOME_IMAGE,
        preco: char.NOME_IMAGE,
        url: char.IMAGEM_URL,
        id: char.ID
      }));

    } catch (error) {
      throw new Error(error);
    } finally {
      await cortes.close();
    };
  };
};
