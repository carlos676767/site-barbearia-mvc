import Sql from "./db/db.js";

export default class ModelDataValides {
  static async modelDataValides(date, hour) {
    const db = await Sql.db();
    try {
      const [hours, minutes] = hour.split(":").map(Number);
      
      const min = 9
      const max = 19

      if (hours < min || hours > max || (hours === max && minutes > 0)) {
        throw new Error("Please select a time between 09:00 and 19:00.");
      }

      const query = `SELECT * FROM AGENDAMENTOS WHERE DATA_AGENDAMENTO = ? OR  HOURS_AGENDAMENTO = ?`;
      const getData = await db.get(query, [date, hours]);

      if (getData) {
        throw new Error( "the day and time have already been chosen, try another one." );
      }

      if (date.length < 0 || hour.length < 0) {
        throw new Error("please enter positive values ​​for time and date");
      }

    } catch (error) {
      throw new Error(error);
    }
  }
}
