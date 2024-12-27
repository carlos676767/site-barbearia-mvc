import GetCortesModel from "../model/getCortesModel.js";
import InsertCabeloModel from "../model/modelInsertCabelo.js";

export default class Cortes {
  "use strict";
  static async insertCabelos(req, res) {
    try {
      const { nome, preco } = req.body;
      
      const img = req.file.filename
     
      
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

  static async updateCortes(req,res){

  }

  static async deleteCortes(req, res){

  }


};


