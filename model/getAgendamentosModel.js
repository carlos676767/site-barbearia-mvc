import Sql from "./db/db.js";

export default class GetHistoryAgendamento {
  static async getHistory() {
    const db = await Sql.db();
    try {
      const query = `
      SELECT 
    AGENDAMENTOS.HOURS_AGENDAMENTO AS horario, 
    USER.NOME AS user_name, 
    CABELOS.NOME_IMAGE AS cabelo_nome
FROM 
    AGENDAMENTOS
JOIN 
    USER 
    ON AGENDAMENTOS.IDUSER = USER.ID
JOIN 
    CABELOS 
    ON CABELOS.ID = AGENDAMENTOS.ID_CABELO
`;
      const getHistory = await db.all(query);

      if (getHistory.length == 0) {
        throw new Error("there is no booking history");
      }

      return getHistory
    } catch (error) {
        throw new Error(error);
    }
  }
}
