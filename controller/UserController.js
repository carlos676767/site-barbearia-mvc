import CacheSet from "../cache/setCacheRegister.js";
import InsertUser from "../model/insertUserModel.js";
import Email from "../utils/email.js";
import EmailValide from "../utils/emailServiceValide.js";
import JwtAsign from "../utils/auth/jwtAssign.js";
import CodeRandom from "../utils/randomCodigo.js";
import SenhaValide from "../utils/senhaValide.js";
import UserExist from "../utils/userExist.js";
import DecodJsonWebToken from "../utils/auth/jwtDecode.js";
import login from "../model/loginUserModel.js";

export default class UserController {
  static async validateAndStoreUserForActivation(req, res) {
    try {
      const { user, email, senha } = req.body;

      EmailValide.valideEmail(email);
      await UserExist.emailExist(email);
      SenhaValide.validacoesSenha(senha);

      const codeUser = CodeRandom.getCode();
      CacheSet.setUser(user, email, senha, codeUser);

      await Email.sendEmail(
        email,
        "confirme seu email",
        `http://localhost:8080/emailConfirmado.html?=${JwtAsign.jwt({
          userCode: codeUser,
        })}`
      );
      return res.status(200).send({ msg: `please check your email` });
    } catch (error) {
      return res.status(400).send({ err: error.message });
    }
  }

  static async insertUser(req, res) {
    try {
      const { token } = req.body;

      const { userCode } = await DecodJsonWebToken.decod(token);
     

      await InsertUser.insert(userCode);
      return res.status(200).send({ msg: `user successfully registered` });
    } catch (error) {
      return res.status(400).send({ err: error.message });
    }
  }


  static async userLogin(req, res) {
    try {
      const { email, senha } = req.body;
      EmailValide.valideEmail(email);
      SenhaValide.validacoesSenha(senha);
      const token =  await login.login(email, senha)

      return res.status(200).send({ msg: "Login realizado com sucesso.", token });
    } catch (error) {
      return res.status(400).send({ err: error.message });
    }
  }
}