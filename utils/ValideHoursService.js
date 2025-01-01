export default class ValideHoursService {
  static valideHoursService(date, hour) {
    const [hours, minutes] = hour.split(":").map(Number);
    const [year, monthAtual, day] = date.split(`-`).map(Number);
    const currentMonth = new Date().getMonth() + 1;
    const yearFull = new Date().getFullYear();
    const currentDay = new Date().getDate();
    const min = 9;
    const max = 19;
    const negativeNumber  = 0

    if ((year) > yearFull || (year) < yearFull) {
      throw new Error("Select the current year to schedule.");
    }

    if ((day) < currentDay) {
      throw new Error("select the current day or the next day");
    }

    if ((monthAtual) < currentMonth) {
      throw new Error("Select the current month or the next month");
    }

    if (hours < min || hours > max || (hours === max && minutes > 0)) {
      throw new Error("Please select a time between 09:00 and 19:00.");
    }

    if (date.length < negativeNumber || hour.length < negativeNumber) {
      throw new Error("please enter positive values ​​for time and date");
    }
  }
}
