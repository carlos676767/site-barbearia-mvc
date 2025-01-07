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
import ModelReset from "../model/modelResetPass.js";
import GetUserModel from "../model/modelGetUser.js";

export default class UserController {
"use strict"; 
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

      const tokeen = await InsertUser.insert(userCode);

      return res.status(200).send({ msg: `user successfully registered`, tk: tokeen });
    } catch (error) {
      return res.status(400).send({ err: error.message });
    }
  }

  static async verifyTokenLogin(req, res) {
    try {
      const token = req.body.token;

      const verifyTk = await DecodJsonWebToken.decod(token);

      if (!verifyTk) {
        throw new Error("token invalid");
      }

      res.status(200).send({ loginIsTrue: true });
    } catch (error) {
      res.status(400).send({ msg: error.message });
    }
  }

  static async userLogin(req, res) {
    try {
      const { email, senha } = req.body;

      EmailValide.valideEmail(email);
      SenhaValide.validacoesSenha(senha);
      const token = await login.login(email, senha);

      return res
        .status(200)
        .send({ msg: "Login realizado com sucesso.", tk: token });
    } catch (error) {
      return res.status(400).send({ err: error.message });
    }
  }

  static async sendToChangePassword(req, res) {
    const { email } = req.body;
    try {
      EmailValide.valideEmail(email);

      const emailVaideExist = await UserExist.emailExist(email);

      if (!emailVaideExist) {
        throw new Error( "The email does not exist in our database, please try another email, thank you.");
      }

    } catch (error) {

      if (error.message === "The email already exists in our database.") {
        res.status(400).send({ err: true });
        return await Email.sendEmail(
          email,
          "Troque sua senha",
          `http://localhost:8080/viewResetPass.html?=${JwtAsign.jwt({
            emailUser: email,
          })}`
        ); 
      }

      return res.status(400).send({ err: error.message });
    }
  }



  static async resetPass(req, res){
    try {
      const {senha, confirmSenha, token} = req.body

    
      
      SenhaValide.validacoesSenha(senha)
      SenhaValide.validacoesSenha(confirmSenha)
      const tokenInEmail = await DecodJsonWebToken.decod(token)
      
      if (!tokenInEmail) {
        throw new Error("The expiration time to change the password has passed, redo the request."); 
      }
      
      const {emailUser} = tokenInEmail
      await ModelReset.resetPassModel(emailUser, senha, confirmSenha)
      return   res.status(200).send({passAltered: true})
    } catch (error) {
      
      res.status(400).send({err: error.message})
    }
  }

  static async getUsers(req, res){
    try {
      const gerUser = await GetUserModel.getUser()
      return res.status(200).send({users:  gerUser})
    } catch (error) {
      res.status(400).send({err: error.message})
    }
  }
}
