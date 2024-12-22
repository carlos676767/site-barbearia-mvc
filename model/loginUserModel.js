import JwtAsign from "../utils/auth/jwtAssign.js";
import UserExist from "../utils/userExist.js";


export default class login extends UserExist {
  static async login(email, pass) {
    try {
      const userGet = await UserExist.emailExist(email);

      if (!userGet) {
        throw new Error("Email not exist.");
      }


      const { senha, ID } = userGet;

      if (senha != pass) {
        throw new Error("pass invalid");
      }

      return JwtAsign.jwt({id: ID})
    } catch (error) {
      throw new Error(error);
    }
  }
}
