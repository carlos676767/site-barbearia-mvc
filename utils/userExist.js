import Usuario from "../model/db/model/userModel";

export default class UserExist {
  static async emailExist(email) {
    try {
      const userExist = await Usuario.findOne({
        where: email,
      });

      if (userExist) {
        throw new Error("the email already exists in our database");
      }
    } catch (error) {
        throw new Error(error); 
    }
  }
}
