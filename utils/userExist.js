import DB from "../model/db/db.js";

export default class UserExist {
  static async emailExist(email) {
    try {

      const db = await DB.db();

      const userExist = await db.get(`SELECT * FROM USER WHERE EMAIL = ?`, [email]);


      if (userExist) {
        throw new Error("The email already exists in our database.");
      }
      
 


    } catch (error) {
      console.error("Error in emailExist:", error.message);
      throw error; 
    }
  }
}
