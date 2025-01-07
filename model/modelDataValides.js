import ValideHoursService from "../utils/ValideHoursService.js";
import Sql from "./db/db.js";




export default class ModelDataValides  {
  static async modelDataValides(date, hours) {
    const db = await Sql.db();
    try {
    
      const query = `SELECT * FROM AGENDAMENTOS WHERE DATA_AGENDAMENTO = ? OR  HOURS_AGENDAMENTO = ?`;
      const getData = await db.get(query, [date, hours]);

      
      if (getData) {
        throw new Error( "the day and time have already been chosen, try another one." );
      }

      
    } catch (error) {
      throw new Error(error);
    }
  }
}

