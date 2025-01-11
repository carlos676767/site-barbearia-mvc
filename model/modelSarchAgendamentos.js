import Sql from "./db/db.js";

export default class SearchAgendamentos {
  static async getUserAgendamentosFilter(user) {
    const db = await Sql.db();

    try {
      const query = `
        SELECT 
          AGENDAMENTOS.HOURS_AGENDAMENTO AS horario, 
          USER.NOME AS user_name, 
          CABELOS.NOME_IMAGE AS cabelo_nome,
           AGENDAMENTOS.DATA_AGENDAMENTO AS data
        FROM 
          AGENDAMENTOS
        JOIN 
          USER 
          ON AGENDAMENTOS.IDUSER = USER.ID
        JOIN 
          CABELOS 
          ON CABELOS.ID = AGENDAMENTOS.ID_CABELO 
        WHERE 
          USER.EMAIL = ?
      `;

    
      const getAgedamentos = await db.all(query, [user]); 

      
      if (!getAgedamentos || getAgedamentos.length === 0) {
        throw new Error("Nenhum agendamento encontrado");
      }

      return getAgedamentos; 
    } catch (error) {
      console.error("Erro ao buscar agendamentos:", error.message);
      throw new Error("Erro ao buscar agendamentos");
    } finally {
      db.close();
    }
  }
}
