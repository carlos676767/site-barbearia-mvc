import Sql from "./db/db.js";

export default class ModelDataValides {
  static async modelDataValides(date, hour) {
    const db = await Sql.db();
    try {
      const [hours, minutes] = hour.split(":").map(Number);
      const [year, monthAtual, day] = date.split(`-`)
      const currentMonth = new Date().getMonth() + 1
      const yearFull = new Date().getFullYear()
      const currentDay = new Date().getDate()
      const min = 9
      const max = 19

      if (Number(year) > yearFull || Number(year) < yearFull) {
        throw new Error("Select the current year to schedule.");
      }
       
      if (Number(day) < currentDay) {
        throw new Error("select the current day or the next day"); 
      }
    
      
      if (Number(monthAtual) < currentMonth) {
        throw new Error("Select the current month or the next month");
      }

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
