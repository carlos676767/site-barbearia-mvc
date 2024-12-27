import DeleteItem from "../utils/deleteItem.js";
import Sql from "./db/db.js";

export default class InsertCabeloModel {
  static async insertCabelo(nome, preco, imgFile) {
    const Cabelos = await Sql.db();
    
    try {
     await Cabelos.exec(`BEGIN TRANSACTION`)

     const query = `INSERT INTO CABELOS(NOME_IMAGE, PRECO,IMAGEM_URL) VALUES(?, ?, ?)`;

     await Cabelos.run(query, [nome, preco, imgFile]);
     await Cabelos.exec(`COMMIT`)
    } catch (error) {
      DeleteItem.deleteItem( `C://Users//Administrator//Desktop//SITE BARBEARIA MVC//image${imgFile}`);
      await Cabelos.exec(`ROLLBACK`);
    } finally {
      await Cabelos.close();
    }
  }
}
