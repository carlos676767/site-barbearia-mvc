import api from "express";
import UserController from "../controller/UserController.js";
import GetUserModel from "../model/modelGetUser.js";
import Cortes from "../controller/cabelosController.js";
import Multer from "../cache/service/multerService.js";
import Payments from "../controller/pagamentosController.js";
import WebHook from "../controller/webHooksController.js";

const app = api.Router();

app.post(`/login`, UserController.userLogin);
app.post(`/verifyLoginToken`, UserController.verifyTokenLogin);
app.post(`/verifyEmailResetPass`, UserController.sendToChangePassword);
app.post(`/resetPass`, UserController.resetPass);
app.get(`/getUser`, UserController.getUsers);
app.post(`/users/activate`, UserController.validateAndStoreUserForActivation);
app.post(`/user/valideRegister`, UserController.insertUser);
app.get(`/getCabelos`, Cortes.getAllCortes)
app.delete(`/deleteCabelos`, Cortes.deleteAllCortes)
app.post(`/pagamentos`, Payments.routerPayMent)
app.post(`/webhookStripe`, WebHook.weHookStripe)
app.get(`/getAgendamentos`, Cortes.getAgedamentos)
const single = Multer.multerConfig().single(`file`);

app.post(`/insertCortes`,(req, res, next) => {
    single(req, res, (err) => {
      return err ? next(err.message) : next();
    });
  },
  
  Cortes.insertCabelos
);


/**
 * @swagger
 * /users/activate:
 *   post:
 *     summary: Valida e armazena um usuário para ativação.
 *     description: Valida os dados do usuário, armazena temporariamente e envia um e-mail de ativação.
 *     tags:
 *       - Usuários
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: string
 *                 description: Nome do usuário.
 *                 example: "JohnDoe"
 *               email:
 *                 type: string
 *                 description: Endereço de e-mail do usuário.
 *                 example: "johndoe@example.com"
 *               senha:
 *                 type: string
 *                 description: Senha do usuário.
 *                 example: "SenhaForte123!"
 *     responses:
 *       200:
 *         description: Solicitação bem-sucedida. O e-mail foi enviado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "please check your email"
 *       400:
 *         description: Erro na validação ou armazenamento dos dados.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 err:
 *                   type: string
 *                   example: "O e-mail já está em uso."
 */



export default app;
