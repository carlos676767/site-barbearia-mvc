import DeleteAllCortes from "../model/deleteAllCortesModel.js";
import GetHistoryAgendamento from "../model/getAgendamentosModel.js";
import GetCortesModel from "../model/getCortesModel.js";
import ModelGetHistory from "../model/modelGetHistic.js";
import InsertCabeloModel from "../model/modelInsertCabelo.js";
import DecodJsonWebToken from "../utils/auth/jwtDecode.js";
import ValidateFields from "../utils/ValidateFields.js";

export default class Cortes {
  "use strict";
  static async insertCabelos(req, res) {
    try {
      ValidateFields.validateFields(req.body);
      const { nome, preco } = req.body;
      const img = req.file.filename;
      ValidateFields.valideNum(preco)

      await InsertCabeloModel.insertCabelo(nome, preco, img);
      return res.status(200).send({ msg: `caelo successfully registered.` });
    } catch (error) {
      return res.status(400).send({ error: error.message });
    }
  }

  static async getAllCortes(req, res) {
    try {
      const cortes = await GetCortesModel.getCorteModel();
      return res.status(200).send({ cortes: cortes });
    } catch (error) {
      return res.status(400).send({ err: error.message });
    }
  }

  static async deleteAllCortes(req, res) {
    try {
      await DeleteAllCortes.delete();
      return res.status(200).send({ cortesDelete: true });
    } catch (error) {
      return res.status(400).send({ err: error.message });
    }
  }


  static async historyCabelos(req, res) {
    try {
      const { userCode } = req.params;
      
      
      const decodeUser = await DecodJsonWebToken.decod(userCode);
      const { EMAIL } = decodeUser;
      const historcUser = await ModelGetHistory.getHistory(EMAIL);

      return res.status(200).send({ historcUser: historcUser });
    } catch (error) {
      return res.status(400).send({ err: error.message });
    }
  }


  static async getAgedamentos(req, res){
    try {
      const getAgedamentos = await GetHistoryAgendamento.getHistory()
      return res.status(200).send({ agedamentos: getAgedamentos });
    } catch (error) {
      res.status(400).send({ err: error.message });
    }
  }
}
