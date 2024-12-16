import CacheSet from "../cache/setCacheRegister.js";
import EmailValide from "../utils/emailServiceValide.js";
import SenhaValide from "../utils/senhaValide.js";
import UserExist from "../utils/userExist.js";

export default class UserController {
  static async validateAndStoreUserForActivation(req, res) {
    try {
      const { user, email, senha } = req.body;
      await UserExist.emailExist(email);
      EmailValide.valideEmail(email);
      SenhaValide.validacoesSenha(senha);

      CacheSet.setUser(email,user,senha)
      res.status(200).send({})
    } catch (error) {
      res.status(400).send({ err: error.message });
    }
  }
  
  static async insertUser(req, res){
    try {
        const {code} = req.body
        
    } catch (error) {
        
    }
  }
}
