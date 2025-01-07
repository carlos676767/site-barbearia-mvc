import Sql from "./db/db.js";

export default class ModelGetHistory {
  static async getHistory(emailUser) {
    const db = await Sql.db();
    try {
      const getUser = await db.get(`SELECT * FROM USER WHERE EMAIL = ?`, [
        emailUser,
      ]);

      const { ID } = getUser;

      const query = `  SELECT 
                    CABELOS.PRECO AS preco,
                    CABELOS.NOME_IMAGE AS nome_cabelo,
                    HISTORICOPAGAMENTO.DATA_TRANSACAO AS data
                FROM 
                    HISTORICOPAGAMENTO
                JOIN 
                    CABELOS 
                ON 
                    CABELOS.ID = HISTORICOPAGAMENTO.ID_CABELO
                WHERE 
                    HISTORICOPAGAMENTO.ID_USER = ?
                ORDER BY 
                    CABELOS.NOME_IMAGE ASC;
            `;

      const getHistory = await db.all(query, [ID]);

      if (getHistory.length === 0) {
        throw new Error("Nenhum historico encontrado para este usuario.");
      }

      return getHistory.map(char => ({
        preco: char.preco,
        nome_cabelo: char.nome_cabelo,
        data: char.data.split(` `)[0]
      }))
      
    } catch (error) {
      throw error;
    } finally {
      await db.close();
    }
  }
}
