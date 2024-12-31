import DeleteAllCortes from "../model/deleteAllCortesModel.js";
import GetCortesModel from "../model/getCortesModel.js";
import InsertCabeloModel from "../model/modelInsertCabelo.js";
import ValidateFields from "../utils/ValidateFields.js";

export default class Cortes {
  "use strict";
  static async insertCabelos(req, res) {
    try {
      ValidateFields.validateFields(req.body)
      const { nome, preco } = req.body;
      const img = req.file.filename

      if (preco <= 0) {
        throw new Error("the price is a negative value, enter a positive value");
      }

      await InsertCabeloModel.insertCabelo(nome, preco, img);
      return res.status(200).send({msg: `caelo successfully registered.`})
    } catch (error) {
      return res.status(400).send({ error: error.message });
    };
  };


  static async getAllCortes(req, res){
    try {
      const cortes = await GetCortesModel.getCorteModel()
      return res.status(200).send({cortes: cortes})
    } catch (error) {
      return res.status(400).send({err: error.message})
    }
  }


  static async deleteAllCortes(req, res){
    try {
      await DeleteAllCortes.delete()
      return res.status(200).send({cortesDelete: true})
    } catch (error) {
      return res.status(400).send({err: error.message})
    }
  }
  static async updateCortes(req,res){
    
  }

  static async deleteCortes(req, res){

  }


};


