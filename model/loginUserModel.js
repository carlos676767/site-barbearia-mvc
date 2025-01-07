import JwtAsign from "../utils/auth/jwtAssign.js";
import UserExist from "../utils/userExist.js";
import Sql from "./db/db.js";


export default class login extends UserExist {
  static async login(userEmail, pass) {
    const connect = await Sql.db()
    try {
      const userGet = await connect.get(`SELECT * FROM USER WHERE EMAIL = ?`, [
        userEmail
      ])

      
      const { SENHA, EMAIL } = userGet;
      
      if (SENHA != pass) {
        throw new Error("pass invalid");
      }
      
      return JwtAsign.jwt({ EMAIL })
    } catch (error) {
      throw new Error(error);
    }
  }
}
